"use client";

import React, { useState } from "react";
import Image from "next/image";
import image01 from "@/public/assets/dubaiApaetment/image01.webp";
import image01M from "@/public/assets/dubaiApaetment/image01Mb.webp";
import PopupApatment from "./PopupApatment";

export const WhyChoose = () => {
  const [ShowPopup, setShowPopup] = useState(false);

  return (
    <div className="w-full bg-[#040406] flex items-center justify-center px-4 pt-0 xl:px-0">
      <div className="container max-w-[1240px] py-5 !pt-0  px-4  md:py-9">
        <div className="bg-[#EFEBE2] rounded-xl overflow-hidden">
          {/* Mobile Banner */}
          <div className="block md:hidden w-full h-[200px] relative">
            <Image
              src={image01M}
              alt="Mobile Banner"
              fill
              style={{ objectFit: "cover", objectPosition: "bottom" }}
              priority
            />
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-3">
            <div className="col-span-3 md:col-span-2 pl-5 md:pl-[3rem] pr-5 md:pr-0 py-[2rem]">
              <h2 className="text-[#A4815C]">
                Why Choose Apartments in Dubai?
              </h2>
              <ul className="pl-2 list-disc list-outside">
                {[
                  "High ROI: Dubai offers exceptional rental yields and strong capital growth.",
                  "Luxury Living: World-class amenities, stunning views, and modern designs.",
                  "Tax-Free Benefits: No income or capital gains tax, maximizing your returns.",
                  "Prime Location: Strategic global hub with vibrant neighborhoods.",
                  "Secure Investment: Safe city with a well-regulated real estate market.",
                  "Lifestyle Perks: Iconic landmarks, shopping, dining, and pristine beaches.",
                  "Residency Options: Own property and enjoy long-term visa benefits.",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="m-0 text-[#000] text-[0.8rem] md:text-[0.9rem] xl:text-[1rem]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div>
                <button
                  onClick={() => setShowPopup(true)}
                  className="bg-[#997A5D] hover:bg-[#000] hover:text-[#997A5D] text-[#fff] w-fit px-[1.5rem] py-[10px] mt-[25px] rounded duration-100 flex justify-center mb-3 capitalize"
                >
                  Inquire more about
                </button>
              </div>
            </div>

            {/* Desktop Banner */}
            <div className="hidden md:block relative w-full h-full min-h-[300px]">
              <Image
                src={image01}
                alt="Desktop Banner"
                fill
                style={{ objectFit: "cover", objectPosition: "left" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* Popup */}
        {ShowPopup && <PopupApatment onClose={() => setShowPopup(false)} />}
      </div>
    </div>
  );
};

export default WhyChoose;
