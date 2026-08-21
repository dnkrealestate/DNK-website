"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { userUserServices } from "@/services/userServices";
import Swal from "sweetalert2";
import { track } from "@vercel/analytics";

const WHATSAPP_TEXT =
  "Hello,%20I%20am%20interested%20in%20Palm%20Jebel%20Ali%20Beach%20Villas";

const formatDateUAE = (date) => {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}-${month}-${date.getFullYear()}`;
};

const formatTimeUAE = (date) =>
  date
    ? new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Dubai",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(date)
    : "";

export default function PJContactForm({ onFormSubmit, unitInterest = "Beach Villas" }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [meetingDate, setMeetingDate] = useState(null);
  const [meetingTime, setMeetingTime] = useState(null);
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
    if (!nationality) formErrors.nationality = "Nationality is required.";
    if (!meetingDate) formErrors.meetingDate = "Please select a date.";
    if (!meetingTime) formErrors.meetingTime = "Please select a time.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const addLeadtoBitrix = async (name, email, phone, city, dateStr, timeStr) => {
    try {
      await fetch(
        "https://crm.dnkre.com/rest/1/tu18jyuvffebb7mc/crm.lead.add.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: {
              TITLE: `Palm Jebel Ali ${unitInterest} Website Lead`,
              NAME: name,
              PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }],
              UF_CRM_LEAD_1724493296911: `${city} | Meeting: ${dateStr} at ${timeStr}`,
              EMAIL: [{ VALUE: email, VALUE_TYPE: "WORK" }],
              COMMENTS: `Preferred consultation: ${dateStr} at ${timeStr}`,
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

    const dateStr = formatDateUAE(meetingDate);
    const timeStr = formatTimeUAE(meetingTime);

    track("Palm Jebel Ali Lead Submitted", {
      name: fullName,
      phone: phoneNumber,
      email,
      nationality,
      meetingDate: dateStr,
      meetingTime: timeStr,
      unit: unitInterest,
    });

    try {
      await contactData({ fullName, email, phoneNumber, city: nationality });

      if (typeof window !== "undefined" && window.snaptr) {
        window.snaptr("track", "SIGN_UP", {
          user_email: email,
          user_phone_number: phoneNumber,
          firstname: fullName,
          geo_city: nationality,
        });
      }

      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "contact_form_submitted",
          form_name: "Palm Jebel Ali Lead Form",
          unit_interest: unitInterest,
          user_name: fullName,
          user_nationality: nationality,
          meeting_date: dateStr,
          meeting_time: timeStr,
        });
      }

      await addLeadtoBitrix(fullName, email, phoneNumber, nationality, dateStr, timeStr);

      Swal.fire({
        title: `Thank you, ${fullName}!`,
        html: `<p>A DNK Real Estate advisor will contact you shortly to confirm your consultation on <b>${dateStr}</b> at <b>${timeStr}</b>.</p>`,
        icon: "success",
        confirmButtonColor: "#79644A",
      });

      onFormSubmit?.({ fullName, email, phoneNumber, nationality, meetingDate: dateStr, meetingTime: timeStr });
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setNationality("");
      setMeetingDate(null);
      setMeetingTime(null);
    } catch (err) {
      Swal.fire("Error", "Check your internet connection", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-white/5 border border-white/15 p-3 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#79644A] transition-colors text-sm";

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
          className="w-full bg-transparent border border-white/15 p-[5px] pl-0 rounded-xl text-white"
        />
        {errors.phoneNumber && (
          <p className="text-red-400 text-xs mt-1">{errors.phoneNumber}</p>
        )}
      </div>

      <div>
        <input
          placeholder="Nationality *"
          type="text"
          className={inputCls}
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        />
        {errors.nationality && (
          <p className="text-red-400 text-xs mt-1">{errors.nationality}</p>
        )}
      </div>

      <div>
        <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
          Schedule Meeting
        </p>
        <div className="grid grid-cols-2 gap-3">
        <div className="pj-datepicker">
          <DatePicker
            selected={meetingDate}
            onChange={(date) => setMeetingDate(date)}
            dateFormat="dd MMM yyyy"
            minDate={new Date()}
            placeholderText="Select Date"
            className={inputCls}
            wrapperClassName="w-full"
          />
          {errors.meetingDate && (
            <p className="text-red-400 text-xs mt-1">{errors.meetingDate}</p>
          )}
        </div>
        <div className="pj-datepicker">
          <DatePicker
            selected={meetingTime}
            onChange={(time) => setMeetingTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="hh:mm aa"
            placeholderText="Select Time"
            className={inputCls}
            wrapperClassName="w-full"
          />
          {errors.meetingTime && (
            <p className="text-red-400 text-xs mt-1">{errors.meetingTime}</p>
          )}
        </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#79644A] to-[#9C8564] hover:from-[#9C8564] hover:to-[#79644A] text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center text-sm tracking-wider"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          "Register My Interest"
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
