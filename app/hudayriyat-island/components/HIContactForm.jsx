"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { userUserServices } from "@/services/userServices";
import Swal from "sweetalert2";
import { track } from "@vercel/analytics";

export default function HIContactForm({ onFormSubmit }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { contactData } = userUserServices();

  const validateForm = () => {
    const formErrors = {};
    if (!fullName) formErrors.fullName = "Full Name is required.";
    if (!email) {
      formErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formErrors.email = "Invalid email format.";
    }
    if (!phoneNumber) formErrors.phoneNumber = "Phone Number is required.";
    if (!city) formErrors.city = "City is required.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const addLeadtoBitrix = async (name, email, phone, city) => {
    try {
      await fetch(
        "https://crm.dnkre.com/rest/1/tu18jyuvffebb7mc/crm.lead.add.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: {
              TITLE: "Hudayriyat Island Abu Dhabi Website Lead",
              NAME: name,
              PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }],
              UF_CRM_LEAD_1724493296911: city,
              EMAIL: [{ VALUE: email, VALUE_TYPE: "WORK" }],
            },
          }),
        }
      );
    } catch (err) {
      console.error("Bitrix24 error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    track("Hudayriyat Island Lead Submitted", {
      name: fullName,
      phone: phoneNumber,
      email,
      city,
    });

    try {
      await contactData({ fullName, email, phoneNumber, city });

      if (typeof window !== "undefined" && window.snaptr) {
        window.snaptr("track", "SIGN_UP", {
          user_email: email,
          user_phone_number: phoneNumber,
          firstname: fullName,
          geo_city: city,
        });
      }

      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "contact_form_submitted",
          form_name: "Hudayriyat Island Lead Form",
          user_name: fullName,
          user_city: city,
        });
      }

      await addLeadtoBitrix(fullName, email, phoneNumber, city);

      Swal.fire({
        title: `Thank you, ${fullName}!`,
        html: "<p>Our property expert will contact you shortly.</p>",
        icon: "success",
        confirmButtonColor: "#C4973D",
      });

      onFormSubmit?.({ fullName, email, phoneNumber, city });
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setCity("");
    } catch (err) {
      Swal.fire("Error", "Check your internet connection", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-white/5 border border-white/20 p-3 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#C4973D] transition-colors text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          placeholder="Full Name *"
          type="text"
          className={inputCls}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        {errors.fullName && (
          <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
        )}
      </div>

      <div>
        <input
          placeholder="Email Address *"
          type="email"
          className={inputCls}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div className="phoneInput">
        <PhoneInput
          placeholder="Mobile Number *"
          country="ae"
          value={phoneNumber}
          onChange={(value) => setPhoneNumber(value)}
          enableAreaCodeStretch
          inputProps={{ required: true }}
          className="w-full bg-transparent border border-white/20 p-[5px] pl-0 rounded-xl text-white"
        />
        {errors.phoneNumber && (
          <p className="text-red-400 text-xs mt-1">{errors.phoneNumber}</p>
        )}
      </div>

      <div>
        <input
          placeholder="City *"
          type="text"
          className={inputCls}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {errors.city && (
          <p className="text-red-400 text-xs mt-1">{errors.city}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#C4973D] hover:bg-[#DEBA6B] text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center text-sm tracking-wider"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          "Get Exclusive Details"
        )}
      </button>

      <div className="flex items-center justify-center gap-2 pt-1">
        <span className="text-white/50 text-xs">Or reach us via</span>
        <a
          href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Hudayriyat%20Island%20Abu%20Dhabi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[#25D366] hover:text-[#1aad53] transition-colors text-xs font-semibold"
        >
          <FaWhatsapp className="text-sm" />
          WhatsApp
        </a>
      </div>
    </form>
  );
}
