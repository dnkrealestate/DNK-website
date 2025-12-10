"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoMenu, IoClose } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import ADmodel from "./ADmodel";
import { WWURL } from "@/url/axios";

const ADHeader = ({ promotionData }) => {
  const [nav, setNav] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

   const themeColor = promotionData?.themeColor;

  const logoImg = promotionData?.developerlogo ? `${WWURL}${promotionData.developerlogo}` : null;
  const slug = promotionData?.promoUrl?.replace(/\s+/g, "-").toLowerCase();
  const baseSlug = `/promotion/${slug}`;

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 20000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (header) header.classList.toggle("sticky", window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = () => setNav(!nav);

  // ✅ Navigate to subpages (e.g. /promotion/damac-islands/about)
  const handleNavigate = (page) => {
    router.push(`${baseSlug}/${page}`);
  };

  const navItems = [
    { name: "About", path: "about" },
    { name: "Floor Plan", path: "floorPlan" },
    { name: "Payment Plan", path: "paymentPlan" },
    { name: "Amenities", path: "amenities" },
    { name: "Master Plan", path: "masterPlan" },
    { name: "Contact", path: "contact" },
  ];

  return (
    <div style={{
        "--themeColor": themeColor, 
      }}>
      <header className="top-0 left-0 w-full z-50">
        <div className="header flex container items-center justify-between h-15 max-w-[1240px] mx-auto px-4 top-0">
          <div className="left-block flex items-center justify-center gap-4 md:gap-0">
            <div onClick={handleNav}>
              {!nav ? <IoClose className="menu-btn" /> : <IoMenu className="menu-btn" />}
            </div>

            <Link href={baseSlug}>
              <div className="w-[135px] md:w-[150px] h-[60px] flex items-center my-1">
                {logoImg ? (
                  <Image
                    src={logoImg}
                    alt="Developer Logo"
                    width={150}
                    height={60}
                    className="m-auto h-full py-1"
                    priority
                  />
                ) : (
                  <div className="h-[60px] w-[150px] bg-gray-600 animate-pulse"></div>
                )}
              </div>
            </Link>
          </div>

          <div className="right-block left-block flex items-center justify-center">
            <nav>
               <ul className="flex items-center justify-center gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === `${baseSlug}/${item.path}`;
                  return (
                    <li
                      key={item.path}
                      onClick={() => handleNavigate(item.path)}
                      className="relative inline-flex items-center justify-center group m-2 cursor-pointer"
                    >
                      <p
                        className={`transition duration-200 ease-out ${
                          isActive ? "!text-[var(--themeColor)] font-semibold" : "text-white"
                        } group-hover:text-[var(--themeColor)]`}
                      >
                        {item.name}
                      </p>

                      <span
                        className={`absolute bottom-0 left-0 h-0.5 bg-[var(--themeColor)] rounded transition duration-200 ease-out 
                        ${isActive ? "w-full" : "w-full scale-x-0 origin-bottom-right group-hover:scale-x-100 group-hover:origin-bottom-left"}`}
                      ></span>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="socials flex items-center justify-center">
              <ul className="pl-2 flex items-center gap-4">
                <li className="group">
                  <button
                    onClick={() => setShowPopup(true)}
                    className="bg-[#FFFF] hover:bg-[var(--themeColor)] text-[#000000] hover:text-[#FFFF] w-full px-4 py-1 rounded duration-100 flex justify-center text-[0.6rem] sm:text-[0.9rem]"
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
          {navItems.map((item) => (
            <li
              key={item.path}
              onClick={() => {
                handleNavigate(item.path);
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

      {showPopup && <ADmodel promotionData={promotionData} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default ADHeader;
