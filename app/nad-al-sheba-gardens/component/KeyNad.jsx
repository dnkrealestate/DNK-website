"use client";

import React, { useState } from "react";
import Image from "next/image";
import PopupNad from "./PopupNad";
import image01 from "@/public/assets/pojects/NadAlSheba/image01.webp";
import image01M from "@/public/assets/pojects/NadAlSheba/image01M.webp";

const KeyNad = () => {
  const [ShowPopup, setShowPopup] = useState(false);

  return (
    <div
      className="w-full bg-[#040406] flex items-center justify-center px-4 pt-0 xl:px-0"
      id="keyFeatures"
    >
      <div className="container max-w-[1240px] py-5 !pt-0 px-4 md:py-9">
        <div className="bg-[#EFEBE2] rounded-xl overflow-hidden">
          {/* Mobile Image */}
          <div className="block md:hidden w-full h-[200px] relative">
            <Image
              src={image01M}
              alt="Nad Al Sheba Mobile"
              layout="fill"
              objectFit="cover"
              objectPosition="bottom"
              priority
            />
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-3 md:col-span-2 pl-5 md:pl-[3rem] pr-5 md:pr-0 py-[2rem]">
              <h2 className="text-[#258493]">Key Features</h2>
              <p className="m-0 text-[#000] text-[0.8rem] md:text-[0.9rem] xl:text-[1rem]">
                Choose from beautiful 3-bedroom townhouses and 4 to 7-bedroom
                villas, starting at AED 5.1M. Homes come with modern designs,
                big windows, open layouts, and private outdoor spaces.
              </p>
              <ul className="pl-2 list-disc list-outside">
                {[
                  "G+1 and G+2 townhouses",
                  "Different villa styles with a modern look",
                  "Floor-to-ceiling windows",
                  "Private gardens and rooftop spaces",
                  "Options with family rooms, study areas, and maid’s rooms.",
                  "Lifestyle Perks: Iconic landmarks, shopping, dining, and pristine beaches.",
                ].map((feature, idx) => (
                  <li
                    key={idx}
                    className="m-0 text-[#000] text-[0.8rem] md:text-[0.9rem] xl:text-[1rem]"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <div>
                <button
                  onClick={() => setShowPopup(true)}
                  className="bg-[#258493] hover:bg-[#000] hover:text-[#258493] text-[#fff] w-fit px-[1.5rem] py-[10px] mt-[25px] rounded duration-100 flex justify-center mb-3 capitalize"
                >
                  Inquire more about
                </button>
              </div>
            </div>

            {/* Desktop Image */}
            <div className="w-full h-full hidden md:block relative">
              <Image
                src={image01}
                alt="Nad Al Sheba"
                fill
                style={{ objectFit: "cover", objectPosition: "left" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* Popup Component */}
        {ShowPopup && <PopupNad onClose={() => setShowPopup(false)} />}
      </div>
    </div>
  );
};

export default KeyNad;
