"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { userUserServices } from "@/services/userServices";

export default function FunnelContactForm({ answers = {}, projectData = null, onFormSubmit = () => {} }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { contactData } = userUserServices();
  const pathname = usePathname();
  

  const formatPath = (path) => {
    return path
      .replace(/\//g, " ")
      .replace(/-/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const pageTitle = `Website Lead from ${formatPath(pathname)}`;

  const validateForm = () => {
    let formErrors = {};
    if (!fullName) formErrors.fullName = "Full Name is required.";
    if (!email) formErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) formErrors.email = "Invalid email.";
    if (!phoneNumber) formErrors.phoneNumber = "Phone Number is required.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (value) => {
    setPhoneNumber(value);
  };

  const addLeadtobitrix = async (name, email, phone, note) => {
    const apiUrl = "https://crm.dnkre.com/rest/1/tu18jyuvffebb7mc/crm.lead.add.json";

    const leadData = {
      fields: {
        TITLE: pageTitle,
        NAME: name,
        PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }],
        UF_CRM_LEAD_1724493296911: note,
        EMAIL: [{ VALUE: email, VALUE_TYPE: "WORK" }],
      },
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      console.log("Bitrix lead added:", data);
    } catch (error) {
      console.error("Error adding lead:", error);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const developerName = (pathname.split("/")[1] || "-")
  .replace(/-/g, " ")
  .replace(/\b\w/g, (char) => char.toUpperCase());
  const projectName = projectData?.projectname || "-";
  const location = projectData?.locationname || "-";
   


  // ✅ Structured note
  const note = `
Developer: ${developerName}
Project: ${projectName}
Location: ${location}
Budget: ${answers.question_1 || ""}
Bedrooms: ${answers.question_2 || ""}
Purpose: ${answers.question_3 || ""}
Timeline: ${answers.question_4 || ""}
`;

  track(`Contact form submitted ${pathname}`, {
    track: `name: ${fullName},
            phone: ${phoneNumber},
            email: ${email},
            funnelData: ${note},
            Page: ${pathname}`,
  });

  setLoading(true);

  try {
    await contactData({
      fullName,
      email,
      phoneNumber,
      city: note, 
    });

    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "contact_form_submitted",
        form_name: "Funnel Contact Form",
        page_path: pathname,
        user_name: fullName,
        user_data: note,
      });
    }

    // ✅ Send to Bitrix
    addLeadtobitrix(fullName, email, phoneNumber, note);

    onFormSubmit({ fullName, email, phoneNumber, funnelData: note });

    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setErrors({});

  } catch (err) {
    console.error("Error submitting form:", err);
    Swal.fire("Failed", "Check your internet connection", "error");
  } finally {
    setLoading(false);
  }
};

  return (
    
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <input
        type="text"
        placeholder="Full Name*"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full bg-transparent border border-[#ffffff] p-3 rounded text-white"
      />
      {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

      <input
        type="email"
        placeholder="Email Address*"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-transparent border border-[#ffffff] p-3 rounded text-white"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <div className="!border !border-[#ffffff] rounded">
      <PhoneInput
        country="ae"
        placeholder="Mobile Number*"
        value={phoneNumber}
        onChange={handleChange}
        inputClass="w-full !bg-transparent !border-transparent  p-3  text-white"
      />
      </div>
      {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-[#CE8745] hover:bg-[#fff] hover:text-[#CE8745] w-full p-3 rounded text-black font-bold transition"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
