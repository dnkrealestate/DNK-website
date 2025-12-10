"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import { userUserServices } from "@/services/userServices";

export const ADContactForm = ({ onFormSubmit }) => {
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

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      await response.json(); // parse for confirmation
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

      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setCity("");
    } catch (err) {
      console.error("Error submitting form:", err);
      Swal.fire("Error", "Failed to send email", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col justify-between mx-0 md:mx-2 mt-3 md:mt-0">
        <div>
          <input
            placeholder="Full Name*"
            type="text"
            className="w-full bg-transparent border border-black p-2.5 rounded text-black"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && (
            <p className="text-sm text-red-600">{errors.fullName}</p>
          )}

          <input
            placeholder="Email Address*"
            type="email"
            className="w-full bg-transparent border border-black p-2.5 rounded mt-6 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}

          <div className=" phoneInput">
            <PhoneInput
              placeholder="Mobile Number*"
              type="text"
              country={"ae"}
              value={phoneNumber}
              onChange={handleChange}
              enableAreaCodeStretch
              inputProps={{
                required: true,
              }}
              className="w-full bg-transparent border border-[#000000] p-[5px] pl-0 mt-[25px] rounded text-[#000000]"
            />
            {errors.phoneNumber && (
              <p className="error text-[0.9rem] m-0 text-[#FF0202]">
                {errors.phoneNumber}
              </p>
            )}
          </div>

          <input
            placeholder="City"
            type="text"
            className="w-full bg-transparent border border-black p-2.5 rounded mt-6 text-black"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}

          {!valid && (
            <p className="text-sm text-red-600">Invalid phone number.</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="bg-black hover:bg-[#0D84C8] text-white w-full p-2.5 mt-6 rounded flex justify-center items-center"
          >
            {loading ? <div className="loader w-6 h-6" /> : "Submit"}
          </button>

          <div className="flex items-center justify-center mt-4">
            <p className="text-black mb-0">Or contact us right now via</p>
            <a
              href="https://wa.me/+971543049309?text=Hey, Please share details of Bahria Town at Dubai South"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center group"
            >
              <FaWhatsapp className="text-[#0072B2] text-lg ml-2 group-hover:text-[#6B9B2D]" />
              <p className="ml-1 text-[#0072B2] group-hover:text-[#6B9B2D] mb-0">
                WhatsApp
              </p>
            </a>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ADContactForm;
