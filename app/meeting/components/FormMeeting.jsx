'use client'
import React, { useEffect, useState, useRef } from 'react';
import { postMeetingResgister, userRoadshowServices } from "@/services/roadshowService";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import MeetingAgreement from "./MeetingAgreement";

/* ================= UAE TIMEZONE HELPERS ================= */
const UAE_TZ = "Asia/Dubai";

const formatDateUAE = (date) => {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`; // DD-MM-YYYY
};

const formatTimeUAE = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: UAE_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date); // hh:mm AM/PM
};

/* ================= WAIT FOR NEXT PAINT ================= */
const waitForNextPaint = () => new Promise((resolve) => requestAnimationFrame(() => resolve()));

export default function FormMeeting() {
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);

  const modalRef = useRef(null); // for modal display
  const pdfRef = useRef(null);   // for PDF generation

  const { getSourceRM } = userRoadshowServices();

  const initialState = {
    fullName: "",
    email: "",
    phone: "+91",
    attendDate: null,
    attendTime: null,
    sourcedRm: "",
    sourcedRmEmail: "", 
    projectLocation: "",
  };

  const [addRegister, setAddRegister] = useState(initialState);
  const [rmOptions, setRmOptions] = useState([]);

  const validateForm = () => {
    const formErrors = {};
    if (!addRegister.fullName) formErrors.fullName = "Full Name is required.";
    if (!addRegister.email) {
      formErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addRegister.email)) {
      formErrors.email = "Invalid email.";
    }
    if (!addRegister.phone) formErrors.phone = "Phone Number is required.";
    if (!addRegister.attendDate)
      formErrors.attendDate = "Event attend date is required.";
    if (!addRegister.attendTime)
      formErrors.attendTime = "Event attend time is required.";
    if (!addRegister.sourcedRm)
      formErrors.sourcedRm = "Sourced RM name is required.";
    if (!addRegister.projectLocation)
      formErrors.projectLocation = "Project Location is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  useEffect(() => {
  return () => setLoading(false);
}, []);

  useEffect(() => {
    fetchSourceRMData();
  }, []);

  const fetchSourceRMData = async () => {
    try {
      const response = await getSourceRM();
      if (response.success) {
        const formatted = response.data.map((rm) => ({
          label: rm.name,
          value: rm.name,
          email: rm.email, 
        }));
        setRmOptions(formatted);
      } else {
        console.error("Failed to fetch RM list");
      }
    } catch (err) {
      console.error("Error loading RM list", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddRegister((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePhone = (value) => {
    setAddRegister((prev) => ({ ...prev, phone: value }));
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const pattern = /^\+?[1-9]\d{1,14}$/;
    return pattern.test(phoneNumber);
  };

  /* ================= PDF GENERATION ================= */
  const generateAgreementPDF = async () => {
    if (!pdfRef.current) throw new Error("PDF element not found");

    // Wait for next paint for proper rendering
    await waitForNextPaint();
    await new Promise((resolve) => setTimeout(resolve, 100));

    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.9);
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

    return pdf.output("blob"); // Return PDF blob
  };

  /* ================= FORM SUBMIT ================= */
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return; // 🔒 prevent double submit
  if (!validateForm()) return;

  setLoading(true);

  try {
    // 1️⃣ Generate PDF
    const pdfBlob = await generateAgreementPDF();

    if (!pdfBlob) {
      Swal.fire("Error", "PDF generation failed", "error");
      return;
    }

    // 2️⃣ Prepare FormData (MUST match backend)
    const formData = new FormData();
    formData.append("fullName", addRegister.fullName);
    formData.append("email", addRegister.email);
    formData.append("phone", `+${addRegister.phone}`);
    formData.append("projectLocation", addRegister.projectLocation);
    formData.append("sourcedRm", addRegister.sourcedRm);
    formData.append("rmEmail", addRegister.sourcedRmEmail);
    formData.append("attendDate", formatDateUAE(addRegister.attendDate));
    formData.append("attendTime", formatTimeUAE(addRegister.attendTime));
    formData.append("pdf", pdfBlob, "Appointment-Agreement.pdf");

    // 3️⃣ Submit API
    const response = await postMeetingResgister(formData);

    // ✅ OPEN MODAL HERE
    setShowAgreement(true);

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Meeting Scheduled",
        text: "Meeting Scheduled successfully",
      });
    } else {
      throw new Error("API returned failure");
    }
  } catch (error) {
    console.error("SUBMIT ERROR:", error);
    Swal.fire("Error", "Something went wrong. Please try again.", "error");
  } finally {
    setLoading(false);
  }
};


  const handleReset = () => {
    setAddRegister(initialState);
  };

  const handleDownloadAgreement = async () => {
    if (!pdfRef.current) return;

    try {
      pdfRef.current.style.position = "static";
      pdfRef.current.style.top = "auto";
      pdfRef.current.style.left = "auto";
      pdfRef.current.style.visibility = "visible";

      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        scrollY: -window.scrollY,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      if (pdfHeight <= pdf.internal.pageSize.getHeight()) {
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      } else {
        let heightLeft = pdfHeight;
        let position = 0;

        while (heightLeft > 0) {
          pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
          heightLeft -= pdf.internal.pageSize.getHeight();
          if (heightLeft > 0) {
            pdf.addPage();
            position = -pdf.internal.pageSize.getHeight();
          }
        }
      }

      pdf.save("Appointment-Agreement.pdf");

      pdfRef.current.style.position = "absolute";
      pdfRef.current.style.top = "-9999px";
      pdfRef.current.style.left = "-9999px";
      pdfRef.current.style.visibility = "hidden";
    } catch (err) {
      console.error("PDF generation failed:", err);
      Swal.fire("Error", "Failed to generate PDF. Try again.", "error");
    }
  };

  /* ================= JSX ================= */
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2">
          {/* Full Name */}
          <div className="mx-2 mb-4">
            <label className="text-white">Full Name</label>
            <input
              placeholder="Full Name*"
              name="fullName"
              type="text"
              className="w-full bg-transparent border border-white p-2 rounded text-white"
              value={addRegister.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="mx-2 mb-4">
            <label className="text-white">Email</label>
            <input
              placeholder="Email*"
              name="email"
              type="email"
              className="w-full bg-transparent border border-white p-2 rounded text-white"
              value={addRegister.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="mx-2 mb-4 phoneInput">
            <label className="text-white">Phone</label>
            <PhoneInput
              placeholder="Mobile Number*"
              type="text"
              name="phone"
              country={"in"}
              preferredCountries={["ae", "qa", "in", "sa"]}
              value={addRegister.phone || ""}
              onChange={handleChangePhone}
              enableAreaCodeStretch
              inputProps={{ name: "phone", required: true }}
              className="w-full bg-transparent border border-[#ffffff] p-[5px] pl-0 rounded text-[#ffffff]"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
            {!valid && (
              <p className="text-red-500 text-sm">Invalid phone number.</p>
            )}
          </div>

          {/* Sourced RM */}
          <div className="mb-4 mx-2">
            <label className="block text-white mb-0">Sourced RM</label>
            <Select
              instanceId="sourced-rm-select"
              options={rmOptions}
              placeholder="Select RM"
              value={rmOptions.find((opt) => opt.value === addRegister.sourcedRm) || null}
              onChange={(selected) =>
                setAddRegister((prev) => ({ ...prev, sourcedRm: selected?.value, sourcedRmEmail: selected?.email,  }))
              }
              styles={{
                control: (base) => ({ ...base, backgroundColor: "transparent", borderColor: "white" }),
                singleValue: (base) => ({ ...base, color: "white" }),
                input: (base) => ({ ...base, color: "white" }),
                menu: (base) => ({ ...base, zIndex: 999 }),
                option: (base, state) => ({
                  ...base,
                  color: "#000",
                  backgroundColor: state.isFocused ? "#f5f5f5" : "white",
                  cursor: "pointer",
                }),
              }}
            />
          </div>

          {/* Attend Date */}
          <div className="mx-2 mb-4">
            <label className="text-white">Attend Date</label>
            <DatePicker
              selected={addRegister.attendDate}
              onChange={(date) => setAddRegister((prev) => ({ ...prev, attendDate: date }))}
              dateFormat="dd MMM yyyy"
              minDate={new Date()}
              placeholderText="Select Date"
              className="!w-full bg-transparent border border-white p-2 rounded text-white"
            />
            {errors.attendDate && <p className="text-red-500 text-sm">{errors.attendDate}</p>}
          </div>

          {/* Attend Time */}
          <div className="mx-2 mb-4">
            <label className="text-white">Attend Time</label>
            <DatePicker
              selected={addRegister.attendTime}
              onChange={(time) => setAddRegister((prev) => ({ ...prev, attendTime: time }))}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="hh:mm aa"
              placeholderText="Select Time"
              className="w-full bg-transparent border border-white p-2 rounded text-white"
            />
            {errors.attendTime && <p className="text-red-500 text-sm">{errors.attendTime}</p>}
          </div>

          {/* Project Location */}
          <div className="mx-2 mb-4">
            <label className="text-white">Project Location</label>
            <input
              placeholder="Project Location*"
              name="projectLocation"
              type="text"
              className="w-full bg-transparent border border-white p-2 rounded text-white"
              value={addRegister.projectLocation}
              onChange={handleChange}
            />
            {errors.projectLocation && (
              <p className="text-red-500 text-sm">{errors.projectLocation}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#CE8745] text-white hover:bg-white hover:text-[#CE8745] w-full p-2 mt-6 rounded transition-all"
          disabled={loading}
        >
         {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* ================= AGREEMENT MODAL ================= */}
      {showAgreement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white w-fit rounded-lg shadow-lg p-6 relative">
            <button onClick={() => setShowAgreement(false)} className="absolute top-3 right-3 text-xl text-gray-600 hover:text-black">✕</button>

            <div ref={modalRef} className="max-h-[80vh] overflow-y-auto border p-4">
              <MeetingAgreement
                data={{
                  ...addRegister,
                  attendDate: formatDateUAE(addRegister.attendDate),
                  attendTime: formatTimeUAE(addRegister.attendTime),
                }}
              />
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button type="button" onClick={() => setShowAgreement(false)} className="px-4 py-2 border rounded bg-[#000] text-white">Close</button>
              <button type="button" onClick={handleDownloadAgreement} className="px-4 py-2 bg-[#CE8745] text-white rounded hover:opacity-90">Download PDF</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= HIDDEN PDF ELEMENT ================= */}
      <div style={{ position: "absolute", top: "-9999px", left: "-9999px", visibility: "hidden" }}>
        <div ref={pdfRef}>
          <MeetingAgreement
            data={{
              ...addRegister,
              attendDate: formatDateUAE(addRegister.attendDate),
              attendTime: formatTimeUAE(addRegister.attendTime),
            }}
          />
        </div>
      </div>
    </>
  )
}
