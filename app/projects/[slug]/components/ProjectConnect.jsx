"use client";
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import { userUserServices } from "@/services/userServices";
import Swal from "sweetalert2";
import avatar from "@/public/assets/icons/avatar.webp";
import ModelProject from "./ModelProject";
import Link from "next/link";
import Image from "next/image";
import { WWURL } from "@/url/axios";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";

export const ProjectConnect = ({ projectId, teamData }) => {
  const [ShowPopup, setShowPopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(true);
  const { contactData } = userUserServices();
  const [errors, setErrors] = useState({});
  const [loading2, setLoading2] = useState(false);
  const pathname = usePathname();

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
    // if (!city) formErrors.city = "City is required.";

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
        TITLE: `${projectId.projectname} Website Lead`,
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

      const textResponse = await response.text(); // Get the raw text response
      console.log("Raw Response:", textResponse);

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
    if (!validateForm()) {
      return;
    }
    setLoading2(true);
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
      // Clear the form fields
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setCity("");
    } catch (err) {
      console.error("Error submitting form:", err);
      Swal.fire("Failed", "Check your internet connection", "error");
    } finally {
      setLoading2(false);
    }
    track(`Contact form submitted ${pathname}`, {
      track: `name: ${fullName},
      phone: ${phoneNumber},
      email: ${email},
      city: ${city},
      Page :${pathname}`,
    });
  };

  const imageUrl = teamData?.[0]?.image
    ? `${WWURL}${teamData?.[0]?.image}`
    : avatar;

  return (
    <div>
      <div className="border border-[#ffffff] border-spacing-1 rounded-md p-3">
        <div className="flex text-center">
          <Image
            className="h-[60px] w-[60px] sm:h-[95px] sm:w-[95px] border rounded"
            src={imageUrl}
            alt={`Top real estate agent`}
            quality={90}
            width={80}
            height={80}
            style={{
              objectFit: "cover",
              objectPosition: "top",
            }}
          />

          <div className="pl-2">
            <h2 className="m-0 text-[#ffffff] text-left text-[0.9rem] sm:text-[1rem] font-semibold">
              {teamData?.[0]?.name}
            </h2>
            <p className="text-[0.89rem] text-left">
              {teamData?.[0]?.position}
            </p>
          </div>
        </div>

        <div className="flex items-center pt-3">
          <div
            onClick={() => {
              track("Call Button Clicked", {
                page: pathname,
                button: "Call Button project Slide",
              });
            }}
            className="flex items-center justify-center w-full"
          >
            <a
              href="tel:+971543049309"
              className="site-sub-btn w-full mr-1 text-center"
            >
              Call
            </a>
          </div>
          <div className="w-full">
            <button
              onClick={() => setShowPopup(true)}
              className="site-sub-btn w-full ml-1"
            >
              Inquiry
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2">
          <p className="mb-0 text-[0.8rem] lg:text-[1rem]">
            Or get availability via
          </p>
          <div
            onClick={() => {
              track(
                `WhatsApp Button Click ${projectId.projectname}`,
                {
                  details: `Project name: ${projectId.projectname}, 
                  Page: ${pathname},
                  Button: WhatsApp Button  ${projectId.projectname},
                  Msg: Waseem`,
                }
              );
            }}
          >
            <Link
              href={`https://wa.me/+971543049309?text=Hello,%20Share%20more%20details%20${projectId.projectname}`}
              className="flex items-center justify-center group"
            >
              <FaWhatsapp className="text-[#CE8745] ml-2 group-hover:text-[#6B9B2D] text-[1rem] lg:text-[1.3rem]" />
              <p className="mb-0 text-[#CE8745] group-hover:text-[#6B9B2D] text-[0.8rem] lg:text-[1rem]">
                WhatsApp
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="border border-[#ffffff] border-spacing-1 rounded-md mt-3 overflow-hidden">
        <div className="bg-[#fff]">
          <h5 className="text-[#000] m-auto w-fit uppercase text-[0.9rem] md:text-[1rem] py-1">
            Get In Touch
          </h5>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-between mt-3 md:mt-0 p-3 ">
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
                className="w-full bg-transparent border border-[#ffffff] p-[10px] rounded mt-[10px] text-[#ffffff]"
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
                  className="w-full bg-transparent border border-[#ffffff] p-[5px] pl-0 mt-[10px] rounded text-[#ffffff]"
                />
                {errors.phoneNumber && (
                  <p className="error text-[0.9rem] m-0 text-[#FF0202]">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
              <textarea
                placeholder="Enter Message"
                type="text"
                className="w-full bg-transparent border border-[#ffffff] p-[10px] rounded mt-[10px] text-[#ffffff]"
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
                disabled={loading2}
              >
                {loading2 ? (
                  <div className="loader !w-[24px] !h-[24px]"></div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {ShowPopup && (
          <ModelProject
            projectId={projectId}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectConnect;
