"use client";

import React, { useState } from "react";
import Image from "next/image";
import masterPlanImg from "@/public/assets/other/masterplan.webp";
import ADmodel from "./ADmodel";

const ADMasterPlan = () => {
   const [showPopup, setShowPopup] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);

   const handleViewPlanClick = () => {
     setShowPopup(true);
  };

   const handleFormSubmit = () => {
     setIsOverlayVisible(false);
     setShowPopup(false);
  };

  
  
  return (
    <div className="container max-w-[1240px] py-6 px-4 m-auto">
      <h1 className="text-[#fff] m-auto w-fit mb-4 mt-3">Master Plan</h1>
      <div className="relative">
        {isOverlayVisible && (
          <div
            onClick={handleViewPlanClick}
            className="w-full h-full absolute backdrop-blur-sm cursor-pointer flex items-center justify-center z-10"
          >
            <div className="relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <button className="px-9 py-2 bg-sky-400 rounded-full text-[#000] text-[0.8rem] md:text-[1rem] relative z-20">
                View Master Plan
              </button>
            </div>
          </div>
        )}
        <Image
          src={masterPlanImg}
          alt="Master Plan"
          className="w-full h-auto"
          placeholder="blur"
        />
      </div>
      {showPopup && (
              <ADmodel
                onClose={() => setShowPopup(false)}
                onFormSubmit={handleFormSubmit}
              />
            )}
    </div>
  );
};

export default ADMasterPlan;
