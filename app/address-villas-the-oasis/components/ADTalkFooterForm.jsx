"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import { userUserServices } from "@/services/userServices";

const ADTalkFooterForm = ({ onFormSubmit }) => {
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
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(number);
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
        UF_CRM_LEAD_1724493296911: city,
        EMAIL: [{ VALUE: email, VALUE_TYPE: "WORK" }],
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
      if (onFormSubmit) onFormSubmit();

      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setCity("");
    } catch (err) {
      console.error("Form submission failed:", err);
      alert("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col justify-between mx-0 md:mx-[10px] mt-3 md:mt-0">
        <div>
          <input
            placeholder="Full Name*"
            type="text"
            className="w-full bg-transparent border border-white p-[10px] rounded text-white"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && (
            <p className="text-sm text-[#FF0202]">{errors.fullName}</p>
          )}

          <input
            placeholder="Email Address*"
            type="text"
            className="w-full bg-transparent border border-white p-[10px] rounded mt-[25px] text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-sm text-[#FF0202]">{errors.email}</p>
          )}

          <div className="mt-[25px]">
            <PhoneInput
              placeholder="Mobile Number*"
              country={"ae"}
              value={phoneNumber}
              onChange={handleChange}
              enableAreaCodeStretch
              inputProps={{ required: true }}
              inputClass="!w-full !bg-transparent !text-white"
              buttonClass="!bg-transparent"
              containerClass="!text-white"
            />
            {errors.phoneNumber && (
              <p className="text-sm text-[#FF0202]">{errors.phoneNumber}</p>
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
            <p className="text-sm text-[#FF0202]">{errors.city}</p>
          )}
        </div>

        <div>
          <button
            className="bg-white hover:bg-[#0D84C8] text-black hover:text-white w-full p-[10px] mt-[25px] rounded flex justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="loader !w-[24px] !h-[24px]"></div>
            ) : (
              "Submit"
            )}
          </button>

          <div className="flex items-center justify-center mt-4">
            <p className="mb-0 text-white">Or contact us right now via</p>
            <a
              href="https://wa.me/+971543049309?text=Hey, Please share details of Address Villas at The Oasis"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center ml-2 group"
            >
              <FaWhatsapp className="text-[#0D84C8] text-xl group-hover:text-[#6B9B2D]" />
              <p className="ml-1 mb-0 text-[#0D84C8] group-hover:text-[#6B9B2D]">
                WhatsApp
              </p>
            </a>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ADTalkFooterForm;
