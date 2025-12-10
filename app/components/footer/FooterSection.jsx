"use client";

import React, { useEffect, useState } from "react";
import { GrFacebookOption } from "react-icons/gr";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { Ri24HoursLine } from "react-icons/ri";
import logo from "@/public/assets/logo/dnklogo_1.webp";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import Image from "next/image";
import { userUserServices } from "@/services/userServices";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";

export default function FooterSection() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [showButton, setShowButton] = useState();
  const [showCallForm, setShowCallForm] = useState(false);
  const [valid, setValid] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { callBackData } = userUserServices();
  const pathname = usePathname();
  

   const formatPath = (path) => {
     return path
       .replace(/\//g, " ") // replace slashes with space
       .replace(/-/g, " ") // replace dashes with space
       .replace(/\s+/g, " ") // remove multiple spaces
       .trim()
       .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize each word
   };


  const pageTitle = `Immediate Website Call Back Lead from ${formatPath(pathname)}`;

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
  
      track(`Call Back form submitted ${pathname}`, {
            track: `name: ${fullName},
            phone: ${phoneNumber},
            Page :${pathname}`,
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

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

  return (
    <footer>
      <div className="w-full bg-[#121218] flex items-center justify-center">
        <div className="footerSection container max-w-[1240px] py-5  px-4  md:py-9">
          <div className="flex items-center justify-between footer-head">
            <Link href="/">
              <Image
                className="w-[85px] py-2"
                src={logo}
                loading="lazy"
                alt="DNK logo, Real Estate"
                width={80}
                height={80}
                quality={80}
              />
            </Link>

            <div>
              <ul className="social-links grid grid-cols-5 gap-2">
                <li>
                  <Link
                    href="https://www.facebook.com/dnkrealestate1/"
                    target="_blank"
                    aria-label="Facebook"
                  >
                    <GrFacebookOption />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/dnk_re/"
                    target="_blank"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/channel/UCKH7d3Sx2dkfb4pEXXaMpFA"
                    target="_blank"
                    aria-label="Youtube"
                  >
                    <FaYoutube />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/company/dnkrealestate/"
                    target="_blank"
                    aria-label="Linkedin"
                  >
                    <FaLinkedin />
                  </Link>
                </li>
                <li
                  onClick={() => {
                    track("WhatsApp Button Click Footer", {
                      track: `${pathname},
                  button: "WhatsApp Button Footer",
                  whatsapp: "Msg to Dann"`,
                    });
                  }}
                >
                  <Link
                    href="https://wa.me/+971555769195?text=Hello%2C%20could%20you%20please%20provide%20more%20insights%20into%20the%20real%20estate%20market%3F"
                    target="_blank"
                    aria-label="Whats app"
                  >
                    <IoLogoWhatsapp />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-body grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7">
            <div>
              <ul>
                <li>
                  <h3 className="text-[#fff]">Popular Search</h3>
                </li>
                <li>
                  <Link
                    className="cursor-pointer py-1"
                    href="/off-plan-project"
                  >
                    Off Plan Properties
                  </Link>
                </li>
                <li>
                  <Link className="cursor-pointer py-1" href="/buy-project">
                    Buy a Property
                  </Link>
                </li>
                <li>
                  <Link className="cursor-pointer py-1" href="/sell-project">
                    Sell a Property
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <h3 className="text-[#fff]">Quick Links</h3>
                </li>
                <li>
                  <Link className="cursor-pointer py-1" href="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="cursor-pointer py-1">
                    Services
                  </Link>
                </li>
                <li>
                  <Link className="cursor-pointer py-1" href="/team">
                    Meet The Team
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="cursor-pointer py-1">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <h3></h3>
                </li>
                <li>
                  <Link className="cursor-pointer py-1" href="/news">
                    News
                  </Link>
                </li>
                <li>
                  <Link className="cursor-pointer py-1" href="/gallery">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link className="cursor-pointer py-1" href="/podcast">
                    Podcast
                  </Link>
                </li>
                <li>
                  <Link className="cursor-pointer py-1" href="/privacy-policy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="cursor-pointer py-1" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-[100%]">
              <ul className="footer-connects">
                <li>
                  <h3 className="text-[#fff]">Connect with us</h3>
                </li>
                <li
                  onClick={() => {
                    track("Call Button Clicked Footer", {
                      page: pathname,
                      button: "Call Button Footer",
                      name: "24/7 Call",
                      phone: "+97145546904",
                    });
                  }}
                >
                  <Link
                    href="tel:+97145546904"
                    className="py-1 flex items-center"
                    aria-label="phone number"
                  >
                    <IoIosCall className="text-[1.4rem] my-auto" />
                    +971 4 554 6904
                  </Link>
                </li>
                <li>
                  <div className="flex gap-1">
                    <Ri24HoursLine className="text-[1.4rem]" />
                    <div>
                      <div
                        onClick={() => {
                          track("Call Button Clicked Footer", {
                            track: `page: ${pathname},
                        button: Call Button Footer,
                        name: Call to Dann,
                        phone: +971555769195`,
                          });
                        }}
                      >
                        <Link href="tel:+971555769195" className="py-1">
                          +971 55 576 9195
                        </Link>
                      </div>
                      <div
                        onClick={() => {
                          track("Call Button Clicked Footer", {
                            track: `page: ${pathname},
                        button: Call Button Footer,
                        name: Call to Waseem,
                        phone: +971543049309,`,
                          });
                        }}
                      >
                        <Link href="tel:+971543049309" className="py-1">
                          +971 54 304 9309
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    href="mailto:info@dnkre.com"
                    className="py-1"
                    aria-label="Mail"
                  >
                    <MdEmail className="text-[1.2rem] mr-[3px]" />
                    info@dnkre.com
                  </Link>
                </li>
                <li>
                  <Link href="#" aria-label="address">
                    <MdLocationOn className="text-[1.6rem] mr-[3px]" />
                    <div>
                      <div>Suite No: 603, Sama Building,</div>
                      <div>Al Barsha 1 - Al Barsha,</div>
                      <div>Dubai, United Arab Emirates.</div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#000000] w-full relative flex items-center justify-center">
        <p className="text-[#ffffff] text-[0.6rem] md:text-[0.7rem]  p-3 m-0 tracking-wider text-center">
          © Copyright {year}. All Rights Reserved | Designed by{" "}
          <Link href="/">DNK Real Estate</Link>
        </p>
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
                className="w-full bg-[#CE8745] text-[#fff] py-2 rounded hover:bg-[#ffb066] transition"
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
