"use client";

import React, { useState } from "react";
import Image from "next/image";
import Brochureimg from "@/public/assets/pojects/NadAlSheba/brochure-nad.webp";
import PopupNad from "./PopupNad";
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";

const DownloadNad = () => {
  const [ShowPopup, setShowPopup] = useState(false);
   const pathname = usePathname();

  return (
    <div className="bg-[#1E1E1E]">
      <div className="container max-w-[1240px] py-6 px-4 m-auto">
        <div className="grid sm:grid-cols-2">
          <div className="md:pr-3 h-[400px] flex items-center justify-center">
            <Image
              src={Brochureimg}
              alt="Nad Al Sheba Brochure"
              className="h-full w-auto"
              style={{ maxHeight: "100%" }}
              priority
            />
          </div>
          <div className="flex items-center">
            <div>
              <h1 className="banner-h1 text-[#ffffff]">Download Brochure</h1>
              <p className="mb-1 md:mb-4 text-[#ffffff]">
                And Learn More About Nad Al Sheba Gardens
              </p>
              <button
                onClick={() => {setShowPopup(true); track("Download Brochure Clicked footer", {
                  track: `project name: Nad Al Sheba,
                  page: ${pathname}
                  button: Download Brochure footer`,
                });}}
                className="site-btn1 bg-[#ffffff] hover:!text-[#000] hover:bg-[#fff]"
              >
                Request Here
              </button>
            </div>
          </div>
        </div>
      </div>

      {ShowPopup && <PopupNad onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default DownloadNad;
