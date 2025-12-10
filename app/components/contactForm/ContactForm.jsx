"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { userUserServices } from "@/services/userServices";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { track } from "@vercel/analytics";


export default function ContactForm({ onFormSubmit = () => {} }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const { contactData } = userUserServices();
  const [errors, setErrors] = useState({});
  const pathname = usePathname();

  const formatPath = (path) => {
    return path
      .replace(/\//g, " ") // replace slashes with space
      .replace(/-/g, " ") // replace dashes with space
      .replace(/\s+/g, " ") // remove multiple spaces
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize each word
  };

  const pageTitle = `Website Lead from ${formatPath(pathname)}`;

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
        TITLE: pageTitle,
        NAME: name,
        PHONE: [
          {
            VALUE: phone,
            VALUE_TYPE: "WORK",
          },
        ],
        UF_CRM_LEAD_1724493296911: city,
        EMAIL: [{ VALUE: email, VALUE_TYPE: "WORK" }],
      },
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include any necessary headers like authentication tokens here
          // 'Authorization': `Bearer ${yourToken}`
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        // Check if the response status is OK
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // Parse the JSON response
    } catch (error) {
      console.error("Error adding lead:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    track(`Contact form submitted ${pathname}`, {
          track: `name: ${fullName},
          phone: ${phoneNumber},
          email: ${email},
          city: ${city},
          Page :${pathname}`,
        });

    // Identify the user in PostHog
    posthog.identify(phoneNumber, {
      name: fullName,
      phone: phoneNumber,
      email: email,
      city: city,
      page: window.location.pathname,
    });

    // Capture form submission event
    posthog.capture("contact_form_submitted", {
      name: fullName,
      phone: phoneNumber,
      email: email,
      city: city,
    });
    
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      await contactData({
        fullName,
        email,
        phoneNumber,
        city,
      });

      Swal.fire({
        title: `Thank you <br>${fullName}`,
        html: "<p>Our expert will contact you shortly</p>",
        icon: "success",
      });
      addLeadtobitrix(fullName, email, phoneNumber, city);
      onFormSubmit({ fullName, email, phoneNumber, city });
      // Clear the form fields
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
    
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col justify-between mx-[0px] md:mx-[10px] mt-3 md:mt-0">
        <div>
          <input
            placeholder="Full Name*"
            type="text"
            className="w-full bg-transparent border border-[#ffffff] p-[10px] rounded  text-[#ffffff]"
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
              className="w-full bg-transparent border border-[#ffffff] p-[5px] pl-0 mt-[25px] rounded text-[#ffffff]"
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
            className="bg-[#CE8745] hover:bg-[#ffffff] hover:text-[#CE8745] w-full p-[10px] mt-[25px] rounded duration-100 flex justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="loader !w-[24px] !h-[24px] FormSubmitButton"></div>
            ) : (
              "Submit"
            )}
          </button>
          <div className="flex items-center justify-center mt-4">
            <p className="mb-0">Or contact us right now via</p>
            <div
              onClick={() => {
                track("WhatsApp Button Click Contact Form", {
                  page: pathname,
                  button: "WhatsApp Button Contact Form",
                  whatsapp: "Msg to Waseem",
                  message:
                    "Hello, could you please provide more insights into the project?",
                });
              }}
            >
              <a
                href="https://wa.me/+971555769195?text=Hello,%20could%20you%20please%20provide%20more%20insights%20into%20the%20project?"
                target="_blank"
                className="flex items-center justify-center group"
              >
                <FaWhatsapp className="text-[#CE8745] text-[1.3rem] ml-2 group-hover:text-[#6B9B2D]" />
                <p className="mb-0 !text-[#CE8745] group-hover:!text-[#6B9B2D]">
                  WhatsApp
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
