"use client";

import React, { useState } from "react";
import Image from "next/image";
import Brochureimg from "@/public/assets/lavioleta/brochureimg.webp";
import GPmodel from "./GPmodel";


const GPDownloadSection = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="bg-[#1E1E1E]">
      <div className="container max-w-[1240px] py-6 px-4 m-auto">
        <div className="grid sm:grid-cols-2 gap-4 items-center">
          <div className="md:pr-3">
            <Image
              src={Brochureimg}
              alt="Download Brochure"
              className="w-full h-auto"
              placeholder="blur"
            />
          </div>
          <div className="flex items-center">
            <div>
              <h1 className="banner-h1 text-white">Download Brochure</h1>
              <p className="mb-4 text-white">
                And Learn More About Grand Polo Club and Resort
              </p>
              <button
                onClick={() => setShowPopup(true)}
                className="site-btn1 bg-white hover:text-black hover:bg-white"
              >
                Request Here
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPopup && <GPmodel onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default GPDownloadSection;