"use client"; 

import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import { userUserServices } from "@/services/userServices";
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";

const PopupClick = ({ data, onFormSubmit, onClose, imageUrl }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const { contactData } = userUserServices();
  const [errors, setErrors] = useState({});
  const pathname = usePathname();

  const pageTitle = `Website Lead from ${data.projectname}`;


  const validateForm = () => {
    const formErrors = {};
    if (!fullName) formErrors.fullName = "Full Name is required.";
    if (!email) {
      formErrors.email = "Email is required.";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) formErrors.email = "Invalid email.";
    }
    if (!phoneNumber) formErrors.phoneNumber = "Phone Number is required.";
    if (!city) formErrors.city = "City is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    return phonePattern.test(phoneNumber);
  };

  const addLeadtobitrix = async (name, email, phone, city) => {
    const apiUrl =
      "https://crm.dnkre.com/rest/1/tu18jyuvffebb7mc/crm.lead.add.json";

    const leadData = {
      fields: {
        TITLE: `${data.projectname} - Apartment Website Lead`,
        NAME: name,
        PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }],
        UF_CRM_LEAD_1724493296911: city,
        EMAIL: [{ VALUE: email, VALUE_TYPE: "WORK" }],
      },
    };

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      await res.json();
    } catch (error) {
      console.error("Bitrix lead error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await contactData({ fullName, email, phoneNumber, city });
      Swal.fire({
        title: "Thank you",
        html: "<p>Our expert will contact you shortly</p>",
        icon: "success",
      });

      await addLeadtobitrix(fullName, email, phoneNumber, city);
      onFormSubmit();
      onClose();

      // Clear fields
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setCity("");
      setErrors({});
    } catch (err) {
      console.error("Form submission error:", err);
      Swal.fire("Failed", "Check your internet connection", "error");
    } finally {
      setLoading(false);
    }
    track("Contact form submitted", { location: `${pageTitle}` });
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-2xl md:max-w-5xl max-h-full rounded-lg shadow bg-[#2D2D2D] grid md:grid-cols-2 m-3 overflow-hidden">
        <div className="hidden md:block">
          <div
            className="bg-cover w-full h-full"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
        </div>
        <div>
          <div className="flex items-center justify-end p-4 md:p-5">
            <button
              onClick={onClose}
              className="text-gray-400 hover:bg-gray-600 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            >
              <IoClose className="text-[1.5rem]" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="pt-0 p-4 md:p-5 space-y-4">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col justify-between mx-0 md:mx-[10px] mt-3 md:mt-0">
                <div>
                  <p className="text-[#A4815C]">More About</p>
                  <h2 className="text-white text-[1.4rem]">
                    {data.projectname}
                  </h2>

                  <input
                    placeholder="Full Name*"
                    type="text"
                    className="w-full bg-transparent border border-white p-2.5 rounded text-white"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {errors.fullName && (
                    <p className="text-[#FF0202]">{errors.fullName}</p>
                  )}

                  <input
                    placeholder="Email Address*"
                    type="text"
                    className="w-full bg-transparent border border-white p-2.5 mt-6 rounded text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-[#FF0202]">{errors.email}</p>
                  )}

                  <div className="phoneInput mt-6">
                    <PhoneInput
                      placeholder="Mobile Number*"
                      country={"ae"}
                      value={phoneNumber}
                      onChange={handleChange}
                      enableAreaCodeStretch
                      inputProps={{ required: true }}
                      containerClass="w-full"
                      className="w-full bg-transparent border border-white rounded text-white"
                    />
                    {errors.phoneNumber && (
                      <p className="text-[#FF0202]">{errors.phoneNumber}</p>
                    )}
                    {!valid && (
                      <p className="text-[#FF0202]">Invalid phone number.</p>
                    )}
                  </div>

                  <input
                    placeholder="City"
                    type="text"
                    className="w-full bg-transparent border border-white p-2.5 mt-6 rounded text-white"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {errors.city && (
                    <p className="text-[#FF0202]">{errors.city}</p>
                  )}
                </div>
                <button
                  className="bg-[#A4815C] hover:bg-white hover:text-[#A4815C] w-full p-2.5 mt-6 rounded flex justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="loader !w-6 !h-6 FormSubmitButton"></div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupClick;
