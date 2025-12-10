"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import { userUserServices } from "@/services/userServices";
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";

const GPContactForm = ({ onFormSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const { contactData } = userUserServices();
  const [errors, setErrors] = useState({});
  const pathname = usePathname();

    const pageTitle = `Website Lead from ${ pathname }`;


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
        headers: {
          "Content-Type": "application/json",
        },
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

      addLeadtobitrix(fullName, email, phoneNumber, city);
      // onFormSubmit?.({ fullName, email, phoneNumber, city }); // enable if needed

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
     track("Contact form submitted", { location: pathname });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col justify-between mx-0 md:mx-[10px] mt-3 md:mt-0">
        <div>
          <input
            placeholder="Full Name*"
            type="text"
            className="w-full bg-transparent border border-[#000] p-[10px] rounded text-[#000]"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && (
            <p className="text-[0.9rem] text-[#FF0202]">{errors.fullName}</p>
          )}

          <input
            placeholder="Email Address*"
            type="text"
            className="w-full bg-transparent border border-[#000] p-[10px] rounded mt-[25px] text-[#000]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-[0.9rem] text-[#FF0202]">{errors.email}</p>
          )}

          <div className="phoneInput">
            <PhoneInput
              placeholder="Mobile Number*"
              country="ae"
              className="w-full bg-transparent border border-[#000000] p-[5px] pl-0 mt-[25px] rounded text-[#000000]"
              value={phoneNumber}
              onChange={handleChange}
              enableAreaCodeStretch
              inputProps={{
                required: true,
              }}
              containerClass="mt-[25px]"
            />
            {errors.phoneNumber && (
              <p className="text-[0.9rem] text-[#FF0202]">
                {errors.phoneNumber}
              </p>
            )}
            {!valid && (
              <p className="text-[0.9rem] text-[#FF0202]">
                Invalid phone number.
              </p>
            )}
          </div>

          <input
            placeholder="City"
            type="text"
            className="w-full bg-transparent border border-[#000] p-[10px] rounded mt-[25px] text-[#000]"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {errors.city && (
            <p className="text-[0.9rem] text-[#FF0202]">{errors.city}</p>
          )}
        </div>

        <div>
          <button
            className="bg-[#000] hover:bg-[#CFA028] text-[#fff] hover:text-[#fff] w-full p-[10px] mt-[25px] rounded duration-100 flex justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="loader !w-[24px] !h-[24px]"></div>
            ) : (
              "Submit"
            )}
          </button>

          <div className="flex items-center justify-center mt-4">
            <p className="mb-0 text-[#000]">Or contact us right now via</p>
            <a
              href="https://wa.me/+971543049309?text=Hey, Please share details of Grand Polo Club & Resort"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center group ml-2"
            >
              <FaWhatsapp className="text-[#CFA028] text-[1.3rem] group-hover:text-[#6B9B2D]" />
              <p className="mb-0 ml-2 text-[#CFA028] group-hover:text-[#6B9B2D]">
                WhatsApp
              </p>
            </a>
          </div>
        </div>
      </div>
    </form>
  );
};

export default GPContactForm;
