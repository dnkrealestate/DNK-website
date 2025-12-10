"use client";

import React, { useEffect, useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import PopupNad from "./PopupNad";
import Image from "next/image";
import dnkLogo from "@/public/assets/pojects/NadAlSheba/meraas-logo.webp";
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";

const NadHeader = () => {
  const [nav, setNav] = useState(true);
  const [ShowPopup, setShowPopup] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (header) {
        header.classList.toggle("sticky", window.scrollY > 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNav = () => setNav(!nav);

  const goToSection = (id) => {
    scrollToSection(id);
    setNav(true);
  };

  return (
    <div>
      <header className="top-0 left-0 w-full">
        <div className="header flex container items-center justify-between h-15 max-w-[1240px] mx-auto px-4 top-0">
          <div className="left-block flex items-center justify-center gap-4 md:gap-0">
            <div onClick={handleNav}>
              {!nav ? (
                <IoClose className="menu-btn" />
              ) : (
                <IoMenu className="menu-btn" />
              )}
            </div>
            <a href="/bahriatown-dubai">
              <div className="w-[135px] md:w-[150px] h-[60px] flex items-center">
                <Image
                  src={dnkLogo}
                  alt="DNK Logo"
                  className="m-auto w-full py-1"
                  width={150}
                  height={60}
                />
              </div>
            </a>
          </div>

          <div className="right-block left-block flex items-center justify-center">
            <nav>
              <ul className="items-center justify-center gap-4 ">
                <li
                  className={`relative inline-flex items-center group m-2 `}
                  onClick={() => scrollToSection("about")}
                >
                  <p className="group-hover:text-[#258493] transition duration-200">
                    About
                  </p>
                  <span className="underline-hover"></span>
                </li>
                <li
                  className={`relative inline-flex items-center group m-2`}
                  onClick={() => scrollToSection("units")}
                >
                  <p className="group-hover:text-[#258493] transition duration-200">
                    Units
                  </p>
                  <span className="underline-hover"></span>
                </li>
                <li
                  className={`relative inline-flex items-center group m-2 `}
                  onClick={() => scrollToSection("keyFeatures")}
                >
                  <p className="group-hover:text-[#258493] transition duration-200">
                    Key Features
                  </p>
                  <span className="underline-hover"></span>
                </li>
                <li
                  onClick={() => scrollToSection("paymentPlan")}
                  className="relative inline-flex items-center group m-2"
                >
                  <p className="group-hover:text-[#258493] transition duration-200">
                    Payment Plan
                  </p>
                  <span className="underline-hover"></span>
                </li>
                <li
                  onClick={() => scrollToSection("contact")}
                  className="relative inline-flex items-center group m-2"
                >
                  <p className="group-hover:text-[#258493] transition duration-200">
                    Contact
                  </p>
                  <span className="underline-hover"></span>
                </li>
              </ul>
            </nav>

            <div className="socials flex items-center justify-center">
              <ul className="pl-2 flex items-center gap-4">
                <li>
                  <button
                    onClick={() => {setShowPopup(true); track("Download Brochure Clicked Header", {
                                    track: `project name: Nad Al Sheba,
                                                     page: ${pathname}
                                                     button: Download Brochure footer`,
                                    });}}
                    className="bg-white hover:bg-[#258493] text-black hover:text-white px-4 py-1 rounded duration-100 text-sm sm:text-base"
                  >
                    Download Brochure
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide Menu */}
      <div
        className={
          !nav
            ? "fixed left-0 top-[60px] w-[60%] bg-[#040406] h-full ease-in-out duration-500 slide-bar"
            : "fixed left-[-100%] slide-bar top-15 h-full"
        }
      >
        <ul className="uppercase p-4">
          <li onClick={() => goToSection("about")} className="nav-item">
            About
          </li>
          <li onClick={() => goToSection("units")} className="nav-item">
            Floor Plan
          </li>
          <li onClick={() => goToSection("keyFeatures")} className="nav-item">
            Payment Plan
          </li>
          <li onClick={() => goToSection("paymentPlan")} className="nav-item">
            Amenities
          </li>
          <li onClick={() => goToSection("contact")} className="nav-item">
            Contact
          </li>
        </ul>
      </div>

      {/* Brochure Popup */}
      {ShowPopup && <PopupNad onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default NadHeader;
