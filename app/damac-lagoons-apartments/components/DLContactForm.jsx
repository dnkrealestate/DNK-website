"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { userUserServices } from "@/services/userServices";
import Swal from "sweetalert2";
import { track } from "@vercel/analytics";
import { isValidPhoneNumber, getPhoneValidationMessage } from "@/utils/validatePhone";

const WHATSAPP_TEXT =
  "Hello,%20I%20am%20interested%20in%20Damac%20Lagoons%20-%20Lagoon%20Views%20Apartments";

export default function DLContactForm({ onFormSubmit, compact = false }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(true);
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
    if (!phoneNumber) {
      formErrors.phoneNumber = "Phone Number is required.";
    } else if (!isValidPhoneNumber(phoneNumber)) {
      formErrors.phoneNumber = "Please enter a valid phone number.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChangePhone = (value) => {
    setPhoneNumber(value);
    setValid(isValidPhoneNumber(value));
  };

  const addLeadToBitrix = async (name, email, phone) => {
    try {
      await fetch(
        "https://crm.dnkre.com/rest/1/tu18jyuvffebb7mc/crm.lead.add.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: {
              TITLE: "Damac Lagoons - Lagoon Views Website Lead",
              NAME: name,
              PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }],
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

    track("Damac Lagoons Lead Submitted", {
      name: fullName,
      phone: phoneNumber,
      email,
    });

    try {
      await contactData({ fullName, email, phoneNumber, city: "" });

      if (typeof window !== "undefined" && window.snaptr) {
        window.snaptr("track", "SIGN_UP", {
          user_email: email,
          user_phone_number: phoneNumber,
          firstname: fullName,
        });
      }

      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "contact_form_submitted",
          form_name: "Damac Lagoons Lead Form",
          user_name: fullName,
        });
      }

      await addLeadToBitrix(fullName, email, phoneNumber);

      Swal.fire({
        title: `Thank you, ${fullName}!`,
        html: "<p>A DNK Real Estate advisor will contact you shortly about Lagoon Views at Damac Lagoons.</p>",
        icon: "success",
        confirmButtonColor: "#B68A2E",
      });

      onFormSubmit?.({ fullName, email, phoneNumber });
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setErrors({});
    } catch (err) {
      Swal.fire("Error", "Check your internet connection", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-white/5 border border-white/15 p-3 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#B68A2E] transition-colors text-sm";

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
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
          enableSearch
          placeholder="Mobile Number *"
          country="ae"
          value={phoneNumber}
          onChange={handleChangePhone}
          enableAreaCodeStretch
          inputProps={{ required: true }}
          className="w-full bg-transparent border border-white/15 p-[5px] pl-0 rounded-xl text-white"
        />
        {errors.phoneNumber ? (
          <p className="text-red-400 text-xs mt-1">{errors.phoneNumber}</p>
        ) : phoneNumber ? (
          valid ? (
            <p className="text-green-400 text-xs mt-1">Looks good</p>
          ) : (
            <p className="text-red-400 text-xs mt-1">{getPhoneValidationMessage(phoneNumber)}</p>
          )
        ) : null}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#B68A2E] to-[#D4AF6A] hover:from-[#D4AF6A] hover:to-[#B68A2E] text-black font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center text-sm tracking-wide"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-black/40 border-t-transparent rounded-full animate-spin" />
        ) : (
          "Get Latest Price & Floor Plans"
        )}
      </button>

      <div className="flex items-center justify-center gap-2 pt-1">
        <span className="text-white/40 text-xs">Or reach us via</span>
        <a
          href={`https://wa.me/+971555769195?text=${WHATSAPP_TEXT}`}
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
