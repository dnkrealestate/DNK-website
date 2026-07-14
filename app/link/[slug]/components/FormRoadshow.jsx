"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";
import Select from "react-select";
import { MdLock } from "react-icons/md";
import { userRoadshowServices } from "@/services/roadshowService";
import "react-phone-input-2/lib/style.css";
import { track } from "@vercel/analytics";

const FormRoadshow = () => {
  const params = useParams();
  const slug = params?.slug;

  const [RoadshowLink, setRoadshowLinkData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);

  const {
    postClientResgister,
    getRoadshowLinkById,
    checkDuplicateClient,
    getActiveRM,
  } = userRoadshowServices();

  const initialState = {
    fullName: "",
    email: "",
    phone: "91",
    event: "",
    attendDate: "",
    attendTime: "",
    sourcedRm: "",
    budget: "",
    hotelName: "",
    eventplace: params?.slug,
    address: "",
    place: "",
  };

  const [addRegister, setAddRegister] = useState(initialState);
  const [rmOptions, setRmOptions] = useState([]);

  useEffect(() => {
    if (slug) {
      fetchRoadshowLinkData(slug);
    }
  }, [slug]);

  const fetchRoadshowLinkData = async (slug) => {
    try {
      const response = await getRoadshowLinkById(slug);
      if (response.success && response.data) {
        const RoadshowLink = response.data;
        setRoadshowLinkData(RoadshowLink);
        setAddRegister((prev) => ({
          ...prev,
          event: RoadshowLink.name || "",
          hotelName: RoadshowLink.hotelName || "",
          place: RoadshowLink.place || "",
          address: RoadshowLink.address || "",
          eventplace: RoadshowLink.place || "",
        }));
      }
    } catch (error) {
      console.error("Error fetching roadshow link data:", error);
    }
  };

 useEffect(() => {
   fetchSourceRMData();
 }, []);
  
   const fetchSourceRMData = async () => {
     try {
       const response = await getActiveRM();
       if (response.success) {
         const formatted = response.data.map((rm) => ({
           label: rm.name,
           value: rm.name,
         }));
         setRmOptions(formatted);
       } else {
         console.error("Failed to fetch RM list");
       }
     } catch (err) {
       console.error("Error loading RM list", err);
     }
   };

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
      formErrors.sourcedRm = "Sourced RM is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const duplicateCheck = await checkDuplicateClient({
        email: addRegister.email,
        eventName: addRegister.event,
      });

      if (duplicateCheck.duplicate) {
        Swal.fire(
          "Error",
          "You have already registered for this event.",
          "error"
        );
      } else {
        const response = await postClientResgister({
          ...addRegister,
          eventName: addRegister.event,
          eventplace: params?.slug,
        });

        // ✅ Push event to Google Tag Manager
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "roadshow_form_submit",
            event_location: slug,
            user_name: addRegister.fullName,
            attend_date: addRegister.attendDate,
            attend_time: addRegister.attendTime,
            sourced_rm: addRegister.sourcedRm,
            budget: addRegister.budget
          });
        }

        if (response.success) {
          Swal.fire("Success", "Thank you for getting in touch!", "success");
          handleReset();
        } else {
          Swal.fire("Failed", "Registration failed", "error");
        }
      }
       track(`Roadshow form submitted ${slug}`, {
         track: `page: ${slug},
        name: ${addRegister.fullName},
         phone: ${addRegister.phone},
         email: ${addRegister.email},`,
       });
    } catch (err) {
      console.error(err);
      Swal.fire("Failed", "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAddRegister((prev) => ({
      ...initialState,
      event: prev.event,
      phone: prev.phone.slice(0, 2),
    }));
  };

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 p-3 text-white placeholder:text-white/40 transition-colors focus:border-[#CE8745] focus:outline-none focus:ring-1 focus:ring-[#CE8745]";
  const labelClass = "mb-1.5 block text-sm font-medium text-white/80";
  const errorClass = "mt-1 text-xs text-red-400";

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "rgba(255,255,255,0.05)",
      borderColor: state.isFocused ? "#CE8745" : "rgba(255,255,255,0.15)",
      borderRadius: "0.75rem",
      padding: "2px",
      boxShadow: "none",
      "&:hover": { borderColor: "#CE8745" },
    }),
    singleValue: (base) => ({ ...base, color: "white" }),
    input: (base) => ({ ...base, color: "white" }),
    placeholder: (base) => ({ ...base, color: "rgba(255,255,255,0.4)" }),
    menu: (base) => ({ ...base, zIndex: 999, borderRadius: "0.75rem", overflow: "hidden" }),
    option: (base, state) => ({
      ...base,
      color: "#000",
      backgroundColor: state.isFocused ? "#F3E4D3" : "white",
      cursor: "pointer",
    }),
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            placeholder="Enter your full name"
            name="fullName"
            type="text"
            className={inputClass}
            value={addRegister.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email</label>
          <input
            placeholder="you@example.com"
            name="email"
            type="email"
            className={inputClass}
            value={addRegister.email}
            onChange={handleChange}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div className="phoneInput phoneInputBordered">
          <label className={labelClass}>Phone</label>
          <PhoneInput
            placeholder="Mobile Number"
            type="text"
            name="phone"
            country={"in"}
            preferredCountries={["ae", "qa", "in", "sa"]}
            value={addRegister.phone || ""}
            onChange={handleChangePhone}
            enableAreaCodeStretch
            inputProps={{ name: "phone", required: true }}
            containerClass="w-full"
          />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
          {!valid && <p className={errorClass}>Invalid phone number.</p>}
        </div>

        {/* Attend Date */}
        <div>
          <label className={labelClass}>Attend Date</label>
          <Select
            placeholder="Select Date"
            options={[
              RoadshowLink?.date && {
                label: RoadshowLink.date,
                value: RoadshowLink.date,
              },
              RoadshowLink?.date2 && {
                label: RoadshowLink.date2,
                value: RoadshowLink.date2,
              },
            ].filter(Boolean)}
            value={
              [
                { label: RoadshowLink?.date, value: RoadshowLink?.date },
                { label: RoadshowLink?.date2, value: RoadshowLink?.date2 },
              ].find((opt) => opt.value === addRegister.attendDate) || null
            }
            onChange={(selected) =>
              setAddRegister((prev) => ({
                ...prev,
                attendDate: selected?.value || "",
              }))
            }
            styles={selectStyles}
          />
          {errors.attendDate && <p className={errorClass}>{errors.attendDate}</p>}
        </div>

        {/* Attend Time */}
        <div>
          <label className={labelClass}>Attend Time</label>
          <Select
            placeholder="Select Time"
            options={[
              "10am-11am",
              "11am-12pm",
              "12pm-1pm",
              "1pm-2pm",
              "2pm-3pm",
              "3pm-4pm",
              "4pm-5pm",
              "5pm-6pm",
              "6pm-7pm",
              "7pm-8pm",
              "8pm-9pm",
            ].map((time) => ({ label: time, value: time }))}
            value={
              addRegister.attendTime
                ? { label: addRegister.attendTime, value: addRegister.attendTime }
                : null
            }
            onChange={(selected) =>
              setAddRegister((prev) => ({
                ...prev,
                attendTime: selected?.value || "",
              }))
            }
            styles={selectStyles}
          />
          {errors.attendTime && <p className={errorClass}>{errors.attendTime}</p>}
        </div>

        {/* Your Budget */}
        <div>
          <label className={labelClass}>Your Budget</label>
          <input
            placeholder="Enter your budget"
            name="budget"
            type="text"
            className={inputClass}
            value={addRegister.budget}
            onChange={handleChange}
          />
        </div>

        {/* Sourced RM */}
        <div className="sm:col-span-2">
          <label className={labelClass}>Sourced RM</label>
          <Select
            options={rmOptions}
            placeholder="Select RM"
            value={rmOptions.find((opt) => opt.value === addRegister.sourcedRm) || null}
            onChange={(selected) =>
              setAddRegister((prev) => ({ ...prev, sourcedRm: selected?.value }))
            }
            styles={selectStyles}
          />
          {errors.sourcedRm && <p className={errorClass}>{errors.sourcedRm}</p>}
        </div>
      </div>

      {/* Hidden Event Input */}
      <input type="hidden" name="event" value={addRegister.event} />

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-2 flex w-full items-center justify-center rounded-xl bg-[#CE8745] p-3 font-medium text-white transition-all hover:bg-[#b8763b] disabled:opacity-70"
        disabled={loading}
      >
        {loading ? (
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        ) : (
          "Submit Registration"
        )}
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-white/40">
        <MdLock className="shrink-0" />
        Your information is kept private and secure, in line with our Privacy Policy.
      </p>
    </form>
  );
};

export default FormRoadshow;
