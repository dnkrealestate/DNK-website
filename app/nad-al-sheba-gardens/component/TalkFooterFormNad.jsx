"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import { userUserServices } from "@/services/userServices"; 
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";

export const TalkFooterFormNad = ({ onFormSubmit }) => {
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
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const addLeadtobitrix = async (name, email, phone, city) => {
    const apiUrl =
      "https://crm.dnkre.com/rest/1/tu18jyuvffebb7mc/crm.lead.add.json";

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
      await contactData({
        fullName,
        email,
        phoneNumber,
        city,
      });

      Swal.fire({
        title: "Thank you",
        html: "<p>Our expert will contact you shortly</p>",
        icon: "success",
      });

      await addLeadtobitrix(fullName, email, phoneNumber, city);

      // Clear form
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setCity("");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to send email");
    } finally {
      setLoading(false);
    }
     track(`Contact form submitted ${pathname}`, {
           track: `name: ${fullName},
           phone: ${phoneNumber},
           email: ${email},
           city: ${city},
           Page :${pathname}`,
         });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col justify-between mx-[0px] md:mx-[10px] mt-3 md:mt-0">
        <div>
          <input
            placeholder="Full Name*"
            type="text"
            className="w-full bg-transparent border border-[#ffffff] p-[10px] rounded text-[#ffffff]"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && (
            <p className="error text-[0.9rem] m-0 text-[#FF0202]">
              {errors.fullName}
            </p>
          )}

          <input
            placeholder="Email Address*"
            type="text"
            className="w-full bg-transparent border border-[#ffffff] p-[10px] rounded mt-[25px] text-[#ffffff]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="error text-[0.9rem] m-0 text-[#FF0202]">
              {errors.email}
            </p>
          )}

          <div className="phoneInput ">
            <PhoneInput
              placeholder="Mobile Number*"
              country={"ae"}
              value={phoneNumber}
              onChange={handleChange}
              enableAreaCodeStretch
              inputProps={{ required: true }}
              className="w-full bg-transparent border border-[#ffffff] pl-0 p-[5px] mt-[25px] rounded text-[#ffffff]"
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
            className="w-full bg-transparent border border-[#ffffff] p-[10px] rounded mt-[25px] text-[#ffffff]"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {errors.city && (
            <p className="error text-[0.9rem] m-0 text-[#FF0202]">
              {errors.city}
            </p>
          )}
        </div>

        <div>
          <button
            className="bg-[#ffffff] hover:bg-[#258493] text-[#000000] hover:text-[#ffffff] w-full p-[10px] mt-[25px] rounded duration-100 flex justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="loader !w-[24px] !h-[24px]"></div>
            ) : (
              "Submit"
            )}
          </button>

          <div onClick={() => {track("WhatsApp Button Click Footer Form", {
            track: `Nad Al Sheba,
                     page: ${pathname},
                     button: WhatsApp Button Nad Al Sheba,
                     whatsapp: Msg to Waseem`
          });}} className="flex items-center justify-center mt-4">
            <p className="mb-0 text-[#ffffff]">Or contact us right now via</p>
            <a
              href="https://wa.me/+971543049309?text=Hey, Please share details of Bahria Town at Dubai South"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center group"
            >
              <FaWhatsapp className="text-[#258493] text-[1.3rem] ml-2 group-hover:text-[#6B9B2D]" />
              <p className="mb-0 text-[#258493] group-hover:text-[#6B9B2D] ml-1">
                WhatsApp
              </p>
            </a>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TalkFooterFormNad;
