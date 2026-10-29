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

const WHATSAPP_TEXT =
  "Hello,%20I%20am%20interested%20in%20Damac%20Lagoons%20-%20Sorrento%20Lagoon%20Views";

const UNIT_OPTIONS = [
  { value: "Studio", label: "Studio" },
  { value: "1 Bedroom", label: "1 Bedroom" },
];

export default function DLContactForm({ onFormSubmit, compact = false, heading = "Register My Interest" }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [unitType, setUnitType] = useState("Both");
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { contactData } = userUserServices();
  const gclid = useGclid();

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

  const addLeadToBitrix = async (name, email, phone, unit) => {
    try {
      await fetch(
        "https://crm.dnkre.com/rest/1/tu18jyuvffebb7mc/crm.lead.add.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: {
              TITLE: "Damac Lagoons - Sorrento Lagoon Views Website Lead",
              NAME: name,
              PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }],
              EMAIL: [{ VALUE: email, VALUE_TYPE: "WORK" }],
              ADDRESS_CITY: unit,
              COMMENTS: `Preferred unit type: ${unit}${gclid ? ` | GCLID: ${gclid}` : ""}`,
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
      unitType,
    });

    // Fired independently of our own backend call below, so a Bitrix24 lead
    // is still created even if contactData() fails.
    addLeadToBitrix(fullName, email, phoneNumber, unitType);

    try {
      await contactData({ fullName, email, phoneNumber, city: unitType, gclid });

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
          user_email: email,
          unit_type: unitType,
        });
      }

      Swal.fire({
        title: `Thank you, ${fullName}!`,
        html: "<p>A DNK Real Estate advisor will contact you shortly about Sorrento Lagoon Views at Damac Lagoons. This is an enquiry, not a payment or a reservation.</p>",
        icon: "success",
        confirmButtonColor: "#1C6B82",
      });

      onFormSubmit?.({ fullName, email, phoneNumber, unitType });
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setUnitType("Both");
      setErrors({});
    } catch (err) {
      Swal.fire("Error", "Check your internet connection", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-white/5 border border-white/15 p-3 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#3D8FA6] transition-colors text-sm";

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      <input type="hidden" name="gclid" value={gclid} />
      <div>
        <label className="text-white/60 text-xs font-medium mb-1.5 block">Full Name</label>
        <input
          placeholder="Full name *"
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
        <label className="text-white/60 text-xs font-medium mb-1.5 block">WhatsApp Number</label>
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
      </div>

      <div>
        <label className="text-white/60 text-xs font-medium mb-1.5 block">Preferred Property Type</label>
        <div className="grid grid-cols-2 gap-2">
          {UNIT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setUnitType(opt.value)}
              className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${
                unitType === opt.value
                  ? "border-[#3D8FA6] bg-[#3D8FA6]/15"
                  : "border-white/15 bg-white/5 hover:border-white/30"
              }`}
            >
              <span className="block text-white text-sm font-semibold">{opt.label}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setUnitType("Both")}
          className={`w-full mt-2 rounded-xl border px-3 py-2.5 text-left transition-colors ${
            unitType === "Both"
              ? "border-[#3D8FA6] bg-[#3D8FA6]/15"
              : "border-white/15 bg-white/5 hover:border-white/30"
          }`}
        >
          <span className="block text-white text-sm font-semibold">Both — Studio &amp; 1 Bedroom</span>
        </button>
      </div>

      <div>
        <label className="text-white/60 text-xs font-medium mb-1.5 block">Email</label>
        <input
          placeholder="Email address"
          type="email"
          className={inputCls}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#1C6B82] hover:bg-[#17596C] text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center text-sm tracking-wide"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/40 border-t-transparent rounded-full animate-spin" />
        ) : (
          heading
        )}
      </button>

      {/* <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-white/45 text-[0.7rem]">
        <p>✓ No obligation to purchase</p>
        <p>✓ Direct advisor assistance</p>
        <p>✓ Launch updates</p>
        <p>✓ Official details when released</p>
      </div> */}

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
