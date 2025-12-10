"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WWURL } from "@/url/axios";
import ADmodel from "./ADmodel";

const ADDownloadSection = ({promotionData}) => {
  const [ShowPopup, setShowPopup] = useState(false);
  const Brochureimage = promotionData?.brochureImage ? `${WWURL}${promotionData.brochureImage}` : null;
  const bgColor = promotionData?.brochureSectionBgColor || "#1E1E1E";

  return (
    <div style={{
        "--bgColor": bgColor, }} className="bg-[var(--bgColor)]">
      <div className="container max-w-[1240px] py-6 px-4 m-auto">
        <div className="grid sm:grid-cols-2">
          <div className="md:pr-3">
            {promotionData.brochureImage?(
            <Image
              src={Brochureimage}
              alt={promotionData.altBrochureImage? promotionData.altBrochureImage : promotionData.projectName}
              width={500}
              height={300}
              className="w-full h-auto"
            />):( 
              <div className="h-[300px] w-full bg-gray-600 animate-pulse"></div>
            )}
          </div>
          <div className="flex items-center">
            <div>
              <h1 className="banner-h1 text-white">{promotionData.brochureSectionTitle}</h1>
              <p className="mb-1 md:mb-4 text-white">
                {promotionData.brochureSectionSubTitle}
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

      {ShowPopup && <ADmodel promotionData={promotionData} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default ADDownloadSection;
