"use client";

import React, { useEffect, useState } from "react";
import bannerImg from "@/public/assets/dubaiApaetment/banner.webp"; // Adjust if needed
import { IoLogoWhatsapp } from "react-icons/io";
import PopupApatment from "./PopupApatment"; // Update path based on your project

export const BannerApt = () => {
  const [ShowPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 pt-0">
      <div
        className="banner bannerx w-full rounded-xl"
        style={{
          backgroundImage: `url(${bannerImg.src})`, // Use `.src` for imported image
          backgroundPosition: "60%",
        }}
      >
        <div className="px-4 md:pl-[4rem] items-center overflow-hidden relative">
          <div className="banner-content grid md:grid-cols-3">
            <div className="z-10 w-fit col-span-3">
              <h1 className="w-full">
                <span className="text-[2rem] md:text-[3rem]">Invest</span>
                <br />
                in Dubai Apartments: <br />
                High ROI Properties for Sale
              </h1>
              <p className="pb-4 w-[80%]">
                Secure High Returns with Prime Real Estate in Dubai’s Thriving
                Market.
              </p>
              <div className="flex gap-3 mt-2">
                <button onClick={() => setShowPopup(true)} className="site-btn">
                  Request callback
                </button>
                <a
                  href="https://wa.me/+971543049309?text=Hello, I’m interested in learning more about Dubai apartments. Please send me the details"
                  className="site-btn1 items-center flex"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoWhatsapp className="text-[1.4rem] m-auto" />
                </a>
              </div>
            </div>
            <div className="w-[50%] md:w-[70%] order-first md:order-last z-10"></div>
          </div>
          <div className="bg-[#00000066] w-full h-full absolute left-0 top-0 z-0 md:hidden"></div>
        </div>

        {/* Popup model */}
        {ShowPopup && <PopupApatment onClose={() => setShowPopup(false)} />}
      </div>
    </div>
  );
};

export default BannerApt;
