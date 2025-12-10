"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IoMenu, IoClose } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import dnkLogo from "@/public/assets/pojects/addressVilla/logo.webp";
import ADmodel from "./ADmodel";

const ADHeader = () => {
  const [nav, setNav] = useState(true);
  const [ShowPopup, setShowPopup] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 20000);
    return () => clearTimeout(timer);
  }, []);

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

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div>
      <header className="top-0 left-0 w-full z-50">
        <div className="header flex container items-center justify-between h-15 max-w-[1240px] mx-auto px-4 top-0">
          <div className="left-block flex items-center justify-center gap-4 md:gap-0">
            <div onClick={handleNav}>
              {!nav ? (
                <IoClose className="menu-btn" />
              ) : (
                <IoMenu className="menu-btn" />
              )}
            </div>
            <Link href="/address-villas-the-oasis">
              <div className="w-[135px] md:w-[150px] h-[60px] flex items-center">
                <Image
                  src={dnkLogo}
                  alt="DNK Logo"
                  className="m-auto h-full py-1"
                  priority
                />
              </div>
            </Link>
          </div>

          <div className="right-block left-block flex items-center justify-center">
            <nav>
              <ul className="items-center justify-center gap-4">
                {[
                  { name: "About", id: "about" },
                  { name: "Floor Plan", id: "floorPlan" },
                  { name: "Payment Plan", id: "paymentPlan" },
                  { name: "Amenities", id: "Amenities" },
                  { name: "Contact", id: "contact" },
                ].map((item) => (
                  <li
                    key={item.id}
                    className={`relative inline-flex items-center justify-center group m-2 ${
                      pathname.includes(item.id) ? "activeHead" : ""
                    }`}
                    onClick={() => scrollToSection(item.id)}
                  >
                    <p className="group-hover:text-[#0D84C8] transition duration-200 ease-out">
                      {item.name}
                    </p>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0D84C8] rounded origin-bottom-right transform transition duration-200 ease-out scale-x-0 group-hover:scale-x-100 group-hover:origin-bottom-left"></span>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="socials flex items-center justify-center">
              <ul className="pl-2 flex items-center gap-4">
                <li className="group">
                  <button
                    onClick={() => setShowPopup(true)}
                    className="bg-[#FFFF] hover:bg-[#0D84C8] text-[#000000] hover:text-[#FFFF] w-full px-4 py-1 rounded duration-100 flex justify-center text-[0.6rem] sm:text-[0.9rem]"
                  >
                    Download Brochure
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={
          !nav
            ? "fixed left-0 top-[60px] w-[60%] bg-[#040406] h-full ease-in-out duration-500 slide-bar z-50"
            : "fixed left-[-100%] slide-bar top-15 h-full"
        }
      >
        <ul className="uppercase p-4">
          {[
            { name: "About", id: "about" },
            { name: "Floor Plan", id: "floorPlan" },
            { name: "Payment Plan", id: "paymentPlan" },
            { name: "Amenities", id: "Amenities" },
            { name: "Contact", id: "contact" },
          ].map((item) => (
            <li
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                handleNav();
              }}
              className="text-white border-b border-gray-100 p-3 cursor-pointer group hover:bg-[#0F0F1A]"
            >
              <p className="transform group-hover:translate-x-2 transition-transform ease-in duration-200 text-sm font-semibold">
                {item.name}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {ShowPopup && <ADmodel onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default ADHeader;
