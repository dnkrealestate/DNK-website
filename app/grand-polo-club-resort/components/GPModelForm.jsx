"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import { userUserServices } from "@/services/userServices";
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";

export const GPModelForm = ({ onFormSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const { contactData } = userUserServices();
  const [errors, setErrors] = useState({});
  const pathname = usePathname();

  const pageTitle = `Website Lead from ${ pathname }`;

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
    const pattern = /^\+?[1-9]\d{1,14}$/;
    return pattern.test(phoneNumber);
  };

  const addLeadtobitrix = async (name, email, phone, city) => {
    const apiUrl =
      "https://crm.dnkre.com/rest/1/tu18jyuvffebb7mc/crm.lead.add.json";

    const leadData = {
      fields: {
        TITLE: `${pageTitle}`,
        NAME: name,
        PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }],
        UF_CRM_LEAD_1724493296911: city,
        EMAIL: [{ VALUE: email, VALUE_TYPE: "WORK" }],
      },
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) throw new Error(`Status: ${response.status}`);
      await response.json();
    } catch (error) {
      console.error("Error adding lead to Bitrix:", error);
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

      onFormSubmit?.({ fullName, email, phoneNumber, city });

      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setCity("");
    } catch (err) {
      console.error("Error submitting form:", err);
      Swal.fire({
        title: "Error",
        text: "Failed to send the form. Please try again later.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
    track("Contact form submitted", { location: pathname });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col justify-between mx-0 md:mx-[10px] mt-3 md:mt-0">
        <input
          placeholder="Full Name*"
          type="text"
          className="w-full bg-transparent border border-white p-[10px] rounded text-white"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
        )}

        <input
          placeholder="Email Address*"
          type="email"
          className="w-full bg-transparent border border-white p-[10px] rounded mt-[25px] text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}

        <div className="mt-[25px] phoneInput">
          <PhoneInput
            placeholder="Mobile Number*"
            country="ae"
            value={phoneNumber}
            onChange={handleChange}
            inputProps={{ required: true }}
            className="!text-[#fff] bg-transparent border border-white rounded w-full"
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>
          )}
          {!valid && (
            <p className="text-sm text-red-500 mt-1">Invalid phone number.</p>
          )}
        </div>

        <input
          placeholder="City"
          type="text"
          className="w-full bg-transparent border border-white p-[10px] rounded mt-[25px] text-white"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {errors.city && (
          <p className="text-sm text-red-500 mt-1">{errors.city}</p>
        )}

        <button
          className="bg-white hover:bg-[#CFA028] text-black hover:text-white w-full p-[10px] mt-[25px] rounded duration-100 flex justify-center"
          disabled={loading}
        >
          {loading ? (
            <div className="loader w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Submit"
          )}
        </button>

        <div className="flex items-center justify-center mt-4">
          <p className="text-white mb-0">Or contact us right now via</p>
          <a
            href="https://wa.me/+971543049309?text=Hey, Please share details of grand polo club resort"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Chat"
            className="flex items-center ml-2 group"
          >
            <FaWhatsapp className="text-[#CFA028] text-[1.3rem] group-hover:text-[#6B9B2D]" />
            <span className="text-[#CFA028] ml-1 group-hover:text-[#6B9B2D] mb-0">
              WhatsApp
            </span>
          </a>
        </div>
      </div>
    </form>
  );
};

export default GPModelForm;
