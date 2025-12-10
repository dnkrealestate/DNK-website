"use client";

import React, { useEffect, useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import Image from "next/image";
import dnkLogo from "@/public/assets/pojects/addressVilla/logo.webp";
import { usePathname } from "next/navigation";
import Link from "next/link";
import GPmodel from "./GPmodel";

const GPHeader = () => {
  const [nav, setNav] = useState(true);
  const [ShowPopup, setShowPopup] = useState(false);
  const pathname = usePathname();

  // Show popup after 20 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 20000);
    return () => clearTimeout(timer);
  }, []);

  // Sticky header
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

  // Scroll to section by ID
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <header className="top-0 left-0 w-full z-50">
        <div className="header flex container items-center justify-between h-15 max-w-[1240px] mx-auto px-4">
          <div className="left-block flex items-center gap-4 md:gap-0">
            <div onClick={() => setNav(!nav)}>
              {nav ? (
                <IoMenu className="menu-btn" />
              ) : (
                <IoClose className="menu-btn" />
              )}
            </div>
            <Link href="/address-villas-the-oasis">
              <div className="w-[135px] md:w-[150px] h-[60px] flex items-center">
                <Image
                  src={dnkLogo}
                  alt="DNK Logo"
                  className="m-auto h-[100%] py-1"
                />
              </div>
            </Link>
          </div>

          <div className="right-block flex items-center">
            <nav>
              <ul className="flex items-center gap-4">
                {[
                  { label: "About", id: "about" },
                  { label: "Floor Plan", id: "floorPlan" },
                  { label: "Payment Plan", id: "paymentPlan" },
                  { label: "Amenities", id: "Amenities" },
                  { label: "Contact", id: "contact" },
                ].map((item) => (
                  <li
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative inline-flex items-center justify-center group m-2 ${
                      pathname === "/" ? "activeHead" : ""
                    }`}
                  >
                    <p className="group-hover:text-[#CFA028] transition duration-200">
                      {item.label}
                    </p>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#CFA028] rounded origin-bottom-right transform transition duration-200 scale-x-0 group-hover:scale-x-100 group-hover:origin-bottom-left"></span>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="ml-4">
              <button
                onClick={() => setShowPopup(true)}
                className="bg-white hover:bg-[#CFA028] text-black hover:text-white px-4 py-1 rounded text-sm sm:text-base"
              >
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slidebar */}
      <div
        className={`fixed top-[60px] ${
          !nav ? "left-0 w-[60%]" : "-left-full"
        } bg-[#040406] h-full z-50 duration-500 ease-in-out`}
      >
        <ul className="uppercase p-4">
          {[
            { label: "About", id: "about" },
            { label: "Floor Plan", id: "floorPlan" },
            { label: "Payment Plan", id: "paymentPlan" },
            { label: "Amenities", id: "Amenities" },
            { label: "Contact", id: "contact" },
          ].map((item) => (
            <li
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                setNav(true);
              }}
              className="text-white border-b border-gray-100 p-3 cursor-pointer group hover:bg-[#0F0F1A]"
            >
              <p className="transform group-hover:translate-x-2 transition duration-200 text-sm font-semibold">
                {item.label}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Popup */}
      {ShowPopup && <GPmodel onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default GPHeader;