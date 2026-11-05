"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { userUserServices } from "@/services/userServices";
import Swal from "sweetalert2";
import { track } from "@vercel/analytics";
import { isValidPhoneNumber, getPhoneValidationMessage } from "@/utils/validatePhone";
import { useGclid } from "@/app/hooks/useGclid";
import { BITRIX_LEAD_URL, WHATSAPP_NUMBER, WHATSAPP_TEXT } from "../constants";

const INTEREST_OPTIONS = ["Brochure", "Floor Plans", "Masterplan", "Pricing", "Payment Plan", "Private Consultation"];
const CONTACT_OPTIONS = ["WhatsApp", "Phone", "Email"];
const PROPERTY_TYPE_OPTIONS = ["Either", "Townhouses (3 & 4 BR)", "Villas (4 & 5 BR)"];
const BUDGET_OPTIONS = ["$1M - $1.5M", "$1.5M - $2M", "$2M - $2.5M+"];

export default function PPEnquiryForm({
  defaultInterest = "",
  heading = "Request a Private Consultation",
  compact = false,
  extended = false,
  onSuccess,
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const [interest, setInterest] = useState(defaultInterest);
  const [contactMethod, setContactMethod] = useState("WhatsApp");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { contactData } = userUserServices();
  const gclid = useGclid();

  const validateForm = () => {
    const formErrors = {};
    if (!fullName) formErrors.fullName = "Full name is required.";
    if (!email) {
      formErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formErrors.email = "Invalid email format.";
    }
    if (!phoneNumber) {
      formErrors.phoneNumber = "Phone number is required.";
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

  const buildExtraFieldsSummary = () => {
    const parts = [];
    if (interest) parts.push(`Interested In: ${interest}`);
    if (propertyType) parts.push(`Preferred Property Type: ${propertyType}`);
    if (budget) parts.push(`Budget: ${budget}`);
    if (contactMethod) parts.push(`Preferred Contact Method: ${contactMethod}`);
    if (message) parts.push(`Message: ${message}`);
    return parts;
  };

  const addLeadToBitrix = async (extraFields) => {
    try {
      const commentParts = [
        ...extraFields,
        "Source: Palm Springs by Nakheel premium presentation (project details unconfirmed)",
        ...(gclid ? [`GCLID: ${gclid}`] : []),
      ];

      await fetch(BITRIX_LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            TITLE: "Palm Springs by Nakheel (Premium) - Website Lead",
            NAME: fullName,
            PHONE: [{ VALUE: phoneNumber, VALUE_TYPE: "WORK" }],
            EMAIL: [{ VALUE: email, VALUE_TYPE: "WORK" }],
            ADDRESS_CITY: extraFields.length ? extraFields.join(" | ") : "General Enquiry",
            COMMENTS: commentParts.join(" | "),
          },
        }),
      });
    } catch (err) {
      console.error("Bitrix24 error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    track("Palm Springs Nakheel Premium Lead Submitted", {
      name: fullName,
      phone: phoneNumber,
      email,
      interest,
    });

    const extraFields = buildExtraFieldsSummary();
    addLeadToBitrix(extraFields);

    try {
      await contactData({
        fullName,
        email,
        phoneNumber,
        city: extraFields.length ? extraFields.join(" | ") : "General Enquiry",
        gclid,
      });

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
          form_name: "Palm Springs Nakheel Premium Lead Form",
          user_name: fullName,
          user_email: email,
          interest: interest || "none",
        });
      }

      Swal.fire({
        title: `Thank you, ${fullName}!`,
        html: `<p>Your request has been received.${
          interest
            ? ` A DNK Real Estate advisor will send you the ${interest.toLowerCase()} shortly.`
            : " A DNK Real Estate advisor will contact you shortly with the latest available project information."
        } This is an enquiry, not a payment or a reservation.</p>`,
        icon: "success",
        confirmButtonColor: "#343B32",
      });

      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setInterest(defaultInterest);
      setContactMethod("WhatsApp");
      setPropertyType("");
      setBudget("");
      setMessage("");
      setErrors({});
      onSuccess?.();
    } catch (err) {
      Swal.fire("Error", "Check your internet connection and try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-[#F5F8FB] border border-[#102B46]/15 p-3 rounded-xl text-[#102B46] placeholder:text-[#102B46]/35 focus:outline-none focus:border-[#367BA8] transition-colors text-sm";
  const selectCls =
    "w-full bg-[#F5F8FB] border border-[#102B46]/15 p-3 rounded-xl text-[#102B46] focus:outline-none focus:border-[#367BA8] transition-colors text-sm";

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      <input type="hidden" name="gclid" value={gclid} />
      <div>
        <label className="text-[#102B46]/60 text-xs font-medium mb-1.5 block">Full Name *</label>
        <input
          placeholder="Full name"
          type="text"
          className={inputCls}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[#102B46]/60 text-xs font-medium mb-1.5 block">Email *</label>
          <input
            placeholder="Email address"
            type="email"
            className={inputCls}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="text-[#102B46]/60 text-xs font-medium mb-1.5 block">Mobile Number *</label>
          <div className="phoneInput">
            <PhoneInput
              enableSearch
              placeholder="Mobile number"
              country="ae"
              value={phoneNumber}
              onChange={handleChangePhone}
              enableAreaCodeStretch
              inputProps={{ required: true }}
              className="w-full bg-transparent border border-[#102B46]/15 p-[5px] pl-0 rounded-xl text-[#102B46]"
            />
          </div>
          {errors.phoneNumber ? (
            <p className="text-red-600 text-xs mt-1">{errors.phoneNumber}</p>
          ) : phoneNumber ? (
            valid ? (
              <p className="text-green-700 text-xs mt-1">Looks good</p>
            ) : (
              <p className="text-red-600 text-xs mt-1">{getPhoneValidationMessage(phoneNumber)}</p>
            )
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[#102B46]/60 text-xs font-medium mb-1.5 block">Interested In</label>
          <select className={selectCls} value={interest} onChange={(e) => setInterest(e.target.value)}>
            <option value="">Select an option</option>
            {INTEREST_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[#102B46]/60 text-xs font-medium mb-1.5 block">Preferred Contact Method</label>
          <select
            className={selectCls}
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value)}
          >
            {CONTACT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {extended && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[#102B46]/60 text-xs font-medium mb-1.5 block">Preferred Property Type</label>
            <select className={selectCls} value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
              <option value="">Select an option</option>
              {PROPERTY_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[#102B46]/60 text-xs font-medium mb-1.5 block">Budget (USD)</label>
            <select className={selectCls} value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="">Select a range</option>
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {!compact && (
        <div>
          <label className="text-[#102B46]/60 text-xs font-medium mb-1.5 block">Message (optional)</label>
          <textarea
            placeholder="Tell us anything else we should know"
            rows={3}
            className={inputCls}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#102B46] hover:bg-[#174A73] text-white font-bold py-3.5 rounded-full transition-all duration-300 flex items-center justify-center text-sm tracking-wide"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/40 border-t-transparent rounded-full animate-spin" />
        ) : (
          heading
        )}
      </button>

      <div className="flex items-center justify-center gap-2 pt-1">
        <span className="text-[#102B46]/40 text-xs">Or reach us via</span>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[#1f7a4d] hover:text-[#15603b] transition-colors text-xs font-semibold"
        >
          <FaWhatsapp className="text-sm" />
          WhatsApp
        </a>
      </div>
    </form>
  );
}
