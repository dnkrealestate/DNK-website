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

const PROPERTY_OPTIONS = ["Townhouse", "Villa", "Not decided"];
const CONTACT_OPTIONS = ["WhatsApp", "Phone", "Email"];
const BUDGET_OPTIONS = [
  "AED 2.8M – 3.5M",
  "AED 3.5M – 4.5M",
  "AED 4.5M+",
  "Not sure yet",
];

const WHATSAPP_BASE =
  "Hello, I am interested in the new Aldar residential launch in Dubai. Please share the latest project details, pricing, floor plans and payment plan.";

export default function AEnquiryForm({
  defaultDocument = "",
  defaultProperty = "Not decided",
  heading = "Request Information",
  compact = false,
  onSuccess,
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const [property, setProperty] = useState(defaultProperty);
  const [budget, setBudget] = useState("");
  const [contactMethod, setContactMethod] = useState("WhatsApp");
  const [documentRequested, setDocumentRequested] = useState(defaultDocument);
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

  // Only the extra fields the client actually filled in (non-default,
  // non-empty) are included, each as "Field Name: value".
  const buildExtraFieldsSummary = () => {
    const parts = [];
    if (property && property !== "Not decided") parts.push(`Preferred Property: ${property}`);
    if (budget) parts.push(`Budget Range: ${budget}`);
    if (contactMethod) parts.push(`Preferred Contact Method: ${contactMethod}`);
    if (documentRequested) parts.push(`Document Requested: ${documentRequested}`);
    if (message) parts.push(`Message: ${message}`);
    return parts;
  };

  const addLeadToBitrix = async (extraFields) => {
    try {
      const commentParts = [
        ...extraFields,
        "Source: Aldar new launch Dubai landing page (project name unconfirmed)",
        ...(gclid ? [`GCLID: ${gclid}`] : []),
      ];

      await fetch(
        "https://crm.dnkre.com/rest/1/tu18jyuvffebb7mc/crm.lead.add.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: {
              TITLE: "Aldar Dubai New Launch - Website Lead",
              NAME: fullName,
              PHONE: [{ VALUE: phoneNumber, VALUE_TYPE: "WORK" }],
              EMAIL: [{ VALUE: email, VALUE_TYPE: "WORK" }],
              ADDRESS_CITY: extraFields.length ? extraFields.join(" | ") : "General Enquiry",
              COMMENTS: commentParts.join(" | "),
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

    track("Aldar Dubai New Launch Lead Submitted", {
      name: fullName,
      phone: phoneNumber,
      email,
      property,
      documentRequested,
    });

    const extraFields = buildExtraFieldsSummary();

    // Fired independently of our own backend call below, so a Bitrix24 lead
    // is still created even if contactData() fails.
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
          form_name: "Aldar Dubai New Launch Lead Form",
          user_name: fullName,
          user_email: email,
          property_preference: property,
          document_requested: documentRequested || "none",
        });
      }

      Swal.fire({
        title: `Thank you, ${fullName}!`,
        html: `<p>Your request has been received.${
          documentRequested
            ? ` A DNK Real Estate advisor will send you the ${documentRequested.toLowerCase()} shortly.`
            : " A DNK Real Estate advisor will contact you shortly with the latest available project information."
        } This is an enquiry, not a payment or a reservation.</p>`,
        icon: "success",
        confirmButtonColor: "#C6A46A",
      });

      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setProperty(defaultProperty);
      setBudget("");
      setContactMethod("WhatsApp");
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
    "w-full bg-white/5 border border-white/15 p-3 rounded-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C6A46A] transition-colors text-sm";
  const selectCls =
    "w-full bg-[#0D1520] border border-white/15 p-3 rounded-sm text-white focus:outline-none focus:border-[#C6A46A] transition-colors text-sm";

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      <input type="hidden" name="gclid" value={gclid} />
      <div>
        <label className="text-white/60 text-xs font-medium mb-1.5 block">Full Name *</label>
        <input
          placeholder="Full name"
          type="text"
          className={inputCls}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-white/60 text-xs font-medium mb-1.5 block">Email *</label>
          <input
            placeholder="Email address"
            type="email"
            className={inputCls}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="text-white/60 text-xs font-medium mb-1.5 block">Mobile Number *</label>
          <div className="phoneInput">
            <PhoneInput
              enableSearch
              placeholder="Mobile number"
              country="ae"
              value={phoneNumber}
              onChange={handleChangePhone}
              enableAreaCodeStretch
              inputProps={{ required: true }}
              className="w-full bg-transparent border border-white/15 p-[5px] pl-0 rounded-sm text-white"
            />
          </div>
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-white/60 text-xs font-medium mb-1.5 block">Preferred Property</label>
          <select className={selectCls} value={property} onChange={(e) => setProperty(e.target.value)}>
            {PROPERTY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-white/60 text-xs font-medium mb-1.5 block">Budget Range</label>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-white/60 text-xs font-medium mb-1.5 block">Preferred Contact Method</label>
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
        <div>
          <label className="text-white/60 text-xs font-medium mb-1.5 block">Document Requested</label>
          <select
            className={selectCls}
            value={documentRequested}
            onChange={(e) => setDocumentRequested(e.target.value)}
          >
            <option value="">None</option>
            <option value="Brochure">Brochure</option>
            <option value="Floor Plans">Floor Plans</option>
            <option value="Master Plan">Master Plan</option>
            <option value="Payment Plan">Payment Plan</option>
          </select>
        </div>
      </div>

      {!compact && (
        <div>
          <label className="text-white/60 text-xs font-medium mb-1.5 block">Message (optional)</label>
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
        className="w-full bg-gradient-to-r from-[#C6A46A] to-[#A9874F] hover:brightness-110 text-[#071321] font-bold py-3.5 rounded-sm transition-all duration-300 flex items-center justify-center text-sm tracking-wide"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-[#071321]/40 border-t-transparent rounded-full animate-spin" />
        ) : (
          heading
        )}
      </button>

      <div className="flex items-center justify-center gap-2 pt-1">
        <span className="text-white/40 text-xs">Or reach us via</span>
        <a
          href={`https://wa.me/+971555769195?text=${encodeURIComponent(WHATSAPP_BASE)}`}
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
