"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { userUserServices } from "@/services/userServices";
import Swal from "sweetalert2";
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";

const GPTalkFooterForm = ({ onFormSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { contactData } = userUserServices();
  const pathname = usePathname();

    const pageTitle = `Website Lead from ${pathname}`;

  const validateForm = () => {
    let formErrors = {};
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

  const validatePhoneNumber = (phone) => {
    const pattern = /^\+?[1-9]\d{1,14}$/;
    return pattern.test(phone);
  };

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
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

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await response.json();
    } catch (error) {
      console.error("Error adding lead:", error);
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

      // Reset form
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setCity("");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to send email");
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
          <p className="text-red-500 text-sm">{errors.fullName}</p>
        )}

        <input
          placeholder="Email Address*"
          type="text"
          className="w-full bg-transparent border border-white p-[10px] rounded mt-[25px] text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <div className="phoneInput">
          <PhoneInput
            placeholder="Mobile Number*"
            country="ae"
            className="w-full bg-transparent border border-[#fff] p-[5px] pl-0 mt-[25px] rounded text-[#fff]"
            value={phoneNumber}
            onChange={handleChange}
            enableAreaCodeStretch
            inputProps={{
              required: true,
            }}
            containerClass="mt-[25px]"
          />
          {errors.phoneNumber && (
            <p className="text-[0.9rem] text-[#FF0202]">{errors.phoneNumber}</p>
          )}
          {!valid && (
            <p className="text-[0.9rem] text-[#FF0202]">
              Invalid phone number.
            </p>
          )}
        </div>

        <input
          placeholder="City"
          type="text"
          className="w-full bg-transparent border border-white p-[10px] rounded mt-[25px] text-white"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}

        <button
          type="submit"
          className="bg-white hover:bg-[#CFA028] text-black hover:text-white w-full p-[10px] mt-[25px] rounded flex justify-center"
          disabled={loading}
        >
          {loading ? (
            <div className="loader w-6 h-6 border-t-2 border-white rounded-full animate-spin"></div>
          ) : (
            "Submit"
          )}
        </button>

        <div className="flex items-center justify-center mt-4">
          <p className="text-white mb-0">Or contact us via</p>
          <a
            href="https://wa.me/+971543049309?text=Hey, Please share details of Grand Polo Club & Resort"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center ml-2 group"
          >
            <FaWhatsapp className="text-[#CFA028] text-xl group-hover:text-[#6B9B2D]" />
            <span className="ml-1 text-[#CFA028] group-hover:text-[#6B9B2D]">
              WhatsApp
            </span>
          </a>
        </div>
      </div>
    </form>
  );
};

export default GPTalkFooterForm;
