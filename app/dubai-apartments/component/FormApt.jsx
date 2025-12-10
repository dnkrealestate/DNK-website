"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import { userUserServices } from "@/services/userServices";
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";

export const FormApt = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const { contactData } = userUserServices();
  const [errors, setErrors] = useState({});
  const pathname = usePathname();

  const pageTitle = `Website Lead from ${pathname}`;
  
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
    const pattern = /^\+?[1-9]\d{1,14}$/;
    return pattern.test(phoneNumber);
  };

  const addLeadtobitrix = async (name, email, phone, city) => {
    const apiUrl =
      "https://crm.dnkre.com/rest/1/tu18jyuvffebb7mc/crm.lead.add.json"; // Changed for Next.js

    const leadData = {
      fields: {
        TITLE: `${pageTitle}`,
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

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
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

      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setCity("");
    } catch (err) {
      console.error("Error submitting form:", err);
      Swal.fire("Failed", "Check your internet connection", "error");
    } finally {
      setLoading(false);
    }
    track("Contact form submitted", { location: pathname });
  };

  return (
    <div className="md:mt-[-7rem]">
      <div className="w-full flex items-center justify-center">
        <div className="container max-w-[1240px] px-4 md:flex gap-3 order-last md:order-first">
          <div className="w-full">
            <div className="bg-white px-7 py-5 rounded-xl">
              <h2 className="text-black text-center">
                Unlock Exclusive Access
              </h2>
              <p className="text-center mb-6">
                Register Today to Find Your Dream Property!
              </p>

              <form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-between mx-0 md:mx-[10px] mt-3 md:mt-0">
                  <input
                    placeholder="Full Name*"
                    type="text"
                    className="w-full border border-black p-[10px] rounded text-black"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-sm">{errors.fullName}</p>
                  )}

                  <input
                    placeholder="Email Address*"
                    type="email"
                    className="w-full border border-black p-[10px] rounded mt-[25px] text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm">{errors.email}</p>
                  )}
                  <div className="phoneInput ">
                    <PhoneInput
                      placeholder="Mobile Number*"
                      country={"ae"}
                      value={phoneNumber}
                      onChange={handleChange}
                      inputProps={{ required: true }}
                      className="w-full mt-[25px] border border-black rounded text-[#000]"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-600 text-sm">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  <input
                    placeholder="City*"
                    type="text"
                    className="w-full border border-black p-[10px] rounded mt-[25px] text-black"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {errors.city && (
                    <p className="text-red-600 text-sm">{errors.city}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#997A5D] hover:bg-black hover:text-[#997A5D] text-white w-full p-[10px] mt-[25px] rounded duration-100 flex justify-center mb-3"
                  >
                    {loading ? (
                      <div className="loader w-[24px] h-[24px] FormSubmitButton" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side News Box */}
          <div className="order-last md:order-first flex items-end">
            <div className="h-full relative grid">
              <div className="h-[1rem] md:h-[2.5rem] w-full" />
              <div className="bg-gradient-to-br from-[#BCA68B] to-[#997A5D] px-8 py-5 rounded-xl md:max-w-[800px]">
                <div className="flex justify-end">
                  <div className="flex gap-1 items-center mb-4">
                    <div className="h-2.5 w-2.5 bg-red-600 rounded-full animate-blink" />
                    <p className="text-white m-0">NEWS</p>
                  </div>
                </div>
                <h2 className="text-lg md:text-xl text-white">
                  Dubai real estate sales top Dh40 billion in November
                </h2>
                <p className="text-white">
                  Dubai’s real estate market has enjoyed another busy month,
                  recording a total of 13,502 property sales with an overall
                  value of Dh40 billion in November.
                </p>
                <p className="text-white m-0">
                  Published: Thu 5 Dec 2024, khaleejtimes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormApt;
