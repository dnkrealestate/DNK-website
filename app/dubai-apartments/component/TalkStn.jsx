"use client";

import { useState } from "react";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import { userUserServices } from "@/services/userServices";

import Assist from "@/public/assets/dubaiApaetment/icon01.webp";
import Consultation from "@/public/assets/dubaiApaetment/icon02.webp";
import Estimation from "@/public/assets/dubaiApaetment/icon03.webp";
import Shedule from "@/public/assets/dubaiApaetment/icon04.webp";

export const TalkStn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const { contactData } = userUserServices();
  const [errors, setErrors] = useState({});

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
        TITLE: "Dubai Apartments Website Lead",
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
      await contactData({ fullName, email, phoneNumber, city });

      Swal.fire({
        title: "Thank you",
        html: "<p>Our expert will contact you shortly</p>",
        icon: "success",
      });
      addLeadtobitrix(fullName, email, phoneNumber, city);

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
    <div>
      <div className="w-full bg-[#040406] flex items-center justify-center">
        <div className="container max-w-[1240px] py-5 px-4 md:py-9 talkSection">
          <h2 className="m-auto w-fit">Let's Talk Together</h2>
          <p className="text-center m-auto w-full md:w-[80%] pb-4">
            We love talk with new people. Please take a moment to tell us about
            your Dream. Your messages will be responded to within ONE BUSINESS
            DAY.
          </p>

          <div className="grid md:grid-cols-2 relative pt-8">
            <div className="grid grid-cols-2">
              {[Assist, Consultation, Estimation, Shedule].map((icon, idx) => (
                <div key={idx} className="p-2">
                  <Image
                    src={icon}
                    alt="icon"
                    className="pb-4 m-auto md:m-0 w-[48px]"
                  />
                  <h3 className="text-center md:text-left">
                    {
                      [
                        "Call Enquiry Assistance",
                        "Project Consultation",
                        "Project Estimation",
                        "Scheduling Appointments",
                      ][idx]
                    }
                  </h3>
                  <p className="text-center md:text-left">
                    {
                      [
                        "We are always available on call to assist you with any questions you may have.",
                        "We provide you with all investment consultations for your goal.",
                        "You come to us with your dream, and we do all of the planning and costing for you.",
                        "We assist you in scheduling appointments whenever you wish to meet us.",
                      ][idx]
                    }
                  </p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-3 md:mt-0 md:ml-4">
              <input
                placeholder="Full Name*"
                type="text"
                className="w-full bg-transparent border border-white p-2.5 rounded text-white"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName}</p>
              )}

              <input
                placeholder="Email Address*"
                type="text"
                className="w-full bg-transparent border border-white p-2.5 rounded mt-6 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}

              <div className="phoneInput mt-6">
                <PhoneInput
                  placeholder="Mobile Number*"
                  country="ae"
                  value={phoneNumber}
                  onChange={handleChange}
                  enableAreaCodeStretch
                  inputProps={{ required: true }}
                  className="text-black"
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-500">{errors.phoneNumber}</p>
                )}
                {!valid && (
                  <p className="text-sm text-red-500">Invalid phone number.</p>
                )}
              </div>

              <input
                placeholder="City"
                type="text"
                className="w-full bg-transparent border border-white p-2.5 rounded mt-6 text-white"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              {errors.city && (
                <p className="text-sm text-red-500">{errors.city}</p>
              )}

              <button
                className="bg-[#997A5D] hover:bg-white hover:text-[#997A5D] text-white w-full p-2.5 mt-6 rounded transition"
                disabled={loading}
              >
                {loading ? (
                  <div className="loader w-6 h-6 FormSubmitButton"></div>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-custom-gradient h-2 md:h-4 w-full"></div>
    </div>
  );
};

export default TalkStn;
