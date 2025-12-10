"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import { userUserServices } from "@/services/userServices";

export const ADModelForm = ({ onFormSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { contactData } = userUserServices();

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

  const validatePhoneNumber = (number) => {
    const pattern = /^\+?[1-9]\d{1,14}$/;
    return pattern.test(number);
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
        TITLE: "Emaar Address Villas at The Oasis Website Lead",
        NAME: name,
        PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }],
        EMAIL: [{ VALUE: email, VALUE_TYPE: "WORK" }],
        UF_CRM_LEAD_1724493296911: city,
      },
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

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

      // Clear form
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
          <p className="text-sm text-red-500">{errors.fullName}</p>
        )}

        <input
          placeholder="Email Address*"
          type="email"
          className="w-full bg-transparent border border-white p-[10px] mt-6 rounded text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

        <div className="mt-6">
          <PhoneInput
            placeholder="Mobile Number*"
            country={"ae"}
            value={phoneNumber}
            onChange={handleChange}
            inputStyle={{
              width: "100%",
              backgroundColor: "transparent",
              color: "#fff",
              borderColor: "#fff",
              borderRadius: "6px",
              height: "40px",
            }}
            buttonStyle={{
              backgroundColor: "transparent",
              borderColor: "#fff",
            }}
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber}</p>
          )}
          {!valid && (
            <p className="text-sm text-red-500">Invalid phone number</p>
          )}
        </div>

        <input
          placeholder="City*"
          type="text"
          className="w-full bg-transparent border border-white p-[10px] mt-6 rounded text-white"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black hover:bg-blue-600 hover:text-white w-full p-[10px] mt-6 rounded flex justify-center"
        >
          {loading ? (
            <div className="loader w-6 h-6 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin" />
          ) : (
            "Submit"
          )}
        </button>

        <div className="flex items-center justify-center mt-4">
          <p className="text-white mb-0">Or contact us via</p>
          <a
            href="https://wa.me/+971543049309?text=Hey, Please share details of Address Villas at The Oasis"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <FaWhatsapp className="text-[#0D84C8] text-[1.3rem] ml-2 group-hover:!text-[#6B9B2D]" />
            <p className="mb-0 text-[#0D84C8] group-hover:!text-[#6B9B2D]">
              WhatsApp
            </p>
          </a>
        </div>
      </div>
    </form>
  );
};

export default ADModelForm;
