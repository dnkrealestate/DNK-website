"use client"; 

import React, { useState } from "react";

import bannerImg from "@/public/assets/dubaiApaetment/banner01.webp";
import { IoLogoWhatsapp } from "react-icons/io";
import PopupApatment from "./PopupApatment";

export const BestSaleStn = () => {
  const [ShowPopup, setShowPopup] = useState(false);

  return (
    <div className="p-4 pt-0">
      <div
        className="w-full rounded-xl bg-cover bg-no-repeat relative"
        style={{
          backgroundImage: `url(${bannerImg.src})`,
          backgroundPosition: "20%",
        }}
      >
        {/* Overlay for small screens */}
        <div className="bg-[#00000066] w-full h-full absolute left-0 top-0 z-0 md:hidden rounded-xl"></div>

        <div className="px-4 md:pl-[4rem] relative py-[2rem] md:py-[3rem]">
          <div className="grid md:grid-cols-3 z-10 relative">
            <div className="col-span-3">
              <h1 className="w-full text-white font-bold">
                <span className="text-[2rem] md:text-[3rem] block">
                  Don’t Miss Out!
                </span>
                Damac River Side Apartment
                <br />
                Starting From: AED 888K
              </h1>
              <p className="pb-4 sm:w-[70%] md:w-[60%] text-[#fff]">
                Enjoy waterfront views, luxury amenities, infinity pools,
                fitness centers, and 24/7 security. Elevate your lifestyle
                today!
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
          </div>
        </div>

        {/* Popup */}
        {ShowPopup && <PopupApatment onClose={() => setShowPopup(false)} />}
      </div>
    </div>
  );
};

export default BestSaleStn;
