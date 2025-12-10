"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2"; 
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";

// Images from public folder
import { userUserServices } from "@/services/userServices";
import { WWURL } from "@/url/axios";

const FooterNad = ({promotionData}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [showButton, setShowButton] = useState();
    const [showCallForm, setShowCallForm] = useState(false);
    const [valid, setValid] = useState(true);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { callBackData } = userUserServices();
    const pathname = usePathname();

    const logoImage = promotionData?.developerlogo ? `${WWURL}${promotionData.developerlogo}` : null;

    const bgImg = promotionData?.themeImage? `${WWURL}${promotionData.themeImage}` :  null;
  
  
  
    const pageTitle = `Immediate Website Call Back Lead from ${promotionData?.projectName}`;
  
     const validateForm = () => {
       let formErrors = {};
       if (!fullName) formErrors.fullName = "Full Name is required.";
       if (!phoneNumber) formErrors.phoneNumber = "Phone Number is required.";
  
       setErrors(formErrors);
       return Object.keys(formErrors).length === 0;
     };
  
    const today = new Date();
    const year = today.getFullYear();
  
    useEffect(() => {
      const handleScrollButtonVisiblity = () => {
        window.scrollY > 300 ? setShowButton(true) : setShowButton(false);
      };
      window.addEventListener("scroll", handleScrollButtonVisiblity);
  
      return () => {
        window.removeEventListener("scroll", handleScrollButtonVisiblity);
      };
    }, []);
  
     const handleChange = (value) => {
       setPhoneNumber(value);
       setValid(validatePhoneNumber(value));
     };
     const validatePhoneNumber = (phoneNumber) => {
       const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
       return phoneNumberPattern.test(phoneNumber);
     };
    
      const addLeadtobitrix = async (name, phone) => {
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
    
        track(`Call Back form submitted ${promotionData?.projectName}`, {
              track: `name: ${fullName},
              phone: ${phoneNumber},
              Page :${promotionData?.projectName}`,
            });
        
        if (!validateForm()) {
          return;
        }
        setLoading(true);
        try {
          await callBackData({
            fullName,
            phoneNumber,
          });
    
          Swal.fire({
            title: `Thank you <br>${fullName}`,
            html: "<p>Our expert will contact you shortly</p>",
            icon: "success",
          });
          addLeadtobitrix(fullName, phoneNumber);
  
          // Clear the form fields
          setFullName("");
          setPhoneNumber("");
        } catch (err) {
          console.error("Error submitting form:", err);
          Swal.fire("Failed", "Check your internet connection", "error");
        } finally {
          setLoading(false);
        }
        
      };
  
    const handleCallClick = () => {
      // Toggle call form
      setShowCallForm(!showCallForm);
  
      // Speech message
      const message = `Looking for your dream property in Dubai?    Fill it out and get a call back in few hours.   Your Dubai home journey starts now.`;
  
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
  
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = "en-US";
      utterance.rate = 0.85;
      utterance.pitch = 1;
  
      // Optional: choose a preferred voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) =>
          v.name.includes("Google UK English Female") ||
          v.name.includes("Microsoft Zira") ||
          v.name.includes("Samantha")
      );
      if (preferredVoice) utterance.voice = preferredVoice;
  
      window.speechSynthesis.speak(utterance);
    };

  useEffect(() => {
    const handleScrollButtonVisiblity = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScrollButtonVisiblity);
    return () =>
      window.removeEventListener("scroll", handleScrollButtonVisiblity);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer  className="relative"> 
      <div
        className="w-full flex items-center justify-center"
      
      >
        <Image
                  src={bgImg}
                  alt={promotionData?.altThemeImage || "footer background"}
                  fill
                  className="relative"
                  style={{
                    objectFit: "cover",
                    objectPosition: "60%",
                  }}
                />
        <div className="footerSection container max-w-[1240px]  px-3 py-8">
          <div className="w-[90px] md:w-[200px] m-auto  z-40 relative">
            {logoImage?(<Image
              src={logoImage}
              alt="logo"
              width={200}
              height={100}
              className="w-[200px] m-auto "
            />):( 
              <div className="h-[40px] w-full bg-gray-600 animate-pulse"></div>
            )}
          </div>
        </div>
        <div style={{ "--themeColor": promotionData.themeColor }} className="bg-[var(--themeColor)] w-full h-full absolute opacity-40 z-10"></div>
      </div>
      

      {showButton && (
        <div className="scrollTop-widget">
          <div className="scrollTop bounce-top z-40" onClick={handleScrollTop}>
            <IoIosArrowUp className="arrow-top " aria-label="Go top" />
          </div>
        </div>
      )}
      {/* <div className="whatsapp-widget">
        <div
          onClick={() => {
            track("WhatsApp Button Click Footer", {
              track: `page: ${pathname},
          button: WhatsApp Button Footer Sticky,
          whatsapp: Msg to Waseem`,
            });
          }}
          className="bg-[#18A436] rounded-full p-2"
        >
          <Link
            href="https://wa.me/+971543049309?text=Hello%2C%20could%20you%20please%20provide%20more%20insights%20into%20the%20real%20estate%20market%3F"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Whats app Chat"
          >
            <IoLogoWhatsapp className="text-[#fff] text-[2.5rem]" />
          </Link>
        </div>
      </div> */}
      <div className="call-widget fixed bottom-5 right-5 z-50">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="animate-ping border border-[#18A436] rounded-full w-[50px] h-[50px]"></div>
        </div>
        {/* Pulse Animation Circle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="animate-ping bg-[#18A436] rounded-full w-[50px] h-[50px]"></div>
        </div>

        {/* Call Button */}
        <div
          onClick={handleCallClick}
          className="relative z-10 bg-[#18A436] rounded-full p-3 shadow-lg cursor-pointer group hover:bg-[#54ff79] transition"
        >
          <IoIosCall className="text-[#fff] group-hover:text-[#000]  text-[2rem]" />
        </div>

        {/* Call Form Popup */}
        {showCallForm && (
          <div className="absolute bottom-16 right-0 bg-white text-black p-4 rounded-lg shadow-lg w-64 animate-slideIn">
            <button
              type="button"
              onClick={() => setShowCallForm(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
              aria-label="Close"
            >
              ✕
            </button>
            <h3 className="font-semibold mb-2">Request a Call</h3>
            <p className="text-[0.8rem] text-gray-800">
              Let’s talk! Leave your number and we’ll reach out immediately.
            </p>
            <form onSubmit={handleSubmit}>
              {errors.fullName && (
                <p className="error text-[0.9rem] m-0 text-[#FF0202]">
                  {errors.fullName}
                </p>
              )}
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-[#000] px-2 p-2 mb-3 rounded text-[0.9rem]"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <div className="phoneInput ">
                {errors.phoneNumber && (
                  <p className="error text-[0.9rem] m-0 text-[#FF0202]">
                    {errors.phoneNumber}
                  </p>
                )}
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
                  className="w-full bg-transparent border border-[#000] p-[1px] pl-0 mb-6 rounded text-[#000] text-[0.9rem]"
                />
              </div>
              <button
              style={{ "--themeColor": promotionData.themeColor }}
                className="w-full bg-[var(--themeColor)] text-[#fff] py-2 rounded hover:bg-[#7A8E12] transition"
                disabled={loading}
              >
                {loading ? (
                  <div className="loader !w-[24px] !h-[24px] FormSubmitButton m-auto"></div>
                ) : (
                  "Call Me!"
                )}
              </button>
            </form>
          </div>
        )}
      </div>
      
    </footer>
  );
};

export default FooterNad;
