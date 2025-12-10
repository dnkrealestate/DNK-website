"use client"; // Required if using in the /app directory

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { IoLogoWhatsapp } from "react-icons/io";
import PopupApatment from "./PopupApatment";


// Images
import image02 from "@/public/assets/dubaiApaetment/image02.webp";
import logo01 from "@/public/assets/dubaiApaetment/logo01.webp";
import logo02 from "@/public/assets/dubaiApaetment/logo02.webp";
import logo03 from "@/public/assets/dubaiApaetment/logo03.webp";
import logo04 from "@/public/assets/dubaiApaetment/logo04.webp";
import logo05 from "@/public/assets/dubaiApaetment/logo05.webp";
import logo06 from "@/public/assets/dubaiApaetment/logo06.webp";

export const DeveloperStn = () => {
  const [ShowPopup, setShowPopup] = useState(false);

  const logos = [
    { src: logo01, alt: "Emaar" },
    { src: logo02, alt: "Sobha" },
    { src: logo03, alt: "Damac" },
    { src: logo04, alt: "Meraas" },
    { src: logo05, alt: "Binghatti" },
    { src: logo06, alt: "Aldar" },
  ];

  return (
    <div className="w-full bg-[#040406] flex items-center justify-center px-4 pt-0 xl:px-0">
      <div className="container max-w-[1240px] py-5 !pt-0 px-4 md:py-9">
        <div className="md:flex">
          {/* Left Side Box */}
          <div className="rounded-xl bg-cover bg-no-repeat bg-center px-5 md:px-7 py-[2rem] md:py-[3rem] md:max-w-[500px] relative min-h-[300px]">
            <Image
              src={image02}
              alt="Developer"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              className="rounded-xl z-0"
            />
            <div className="relative z-10 text-white">
              <h2>Top UAE Developer</h2>
              <p className="mb-10">
                Explore Leading Developers in Dubai and Beyond. Inquire Now to
                Find the Perfect Match for Your Dream Property!
              </p>
              <div className="flex gap-3 mt-2">
                <button onClick={() => setShowPopup(true)} className="site-btn">
                  Request callback
                </button>
                <a
                  href="https://wa.me/+971543049309?text=Hello, I’m interested in learning more about Dubai apartments. Please send me the details"
                  className="site-btn1 items-center flex"
                  target="_blank"
                >
                  <IoLogoWhatsapp className="text-[1.4rem] m-auto" />
                </a>
              </div>
            </div>
          </div>

          {/* Logos Grid */}
          <div className="grid grid-cols-3 md:pl-5 gap-3 pt-3 md:pt-0">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="bg-[#EFEBE2] rounded-lg md:rounded-xl p-3 md:p-6 flex items-center justify-center"
              >
                <div className="w-fit h-[30px] md:h-[50px] flex items-center justify-center relative">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    style={{ objectFit: "contain" }}
                    height={50}
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popup */}
        {ShowPopup && <PopupApatment onClose={() => setShowPopup(false)} />}
      </div>
    </div>
  );
};

export default DeveloperStn;
