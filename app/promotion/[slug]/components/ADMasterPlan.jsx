"use client";

import React, { useState } from "react";
import Image from "next/image";
import ADmodel from "./ADmodel";
import { WWURL } from "@/url/axios";

const ADMasterPlan = ({promotionData}) => {
   const [showPopup, setShowPopup] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);

  const masterPlanImage = promotionData?.masterPlanImage? `${WWURL}${promotionData.masterPlanImage}` : null;

   const handleViewPlanClick = () => {
     setShowPopup(true);
  };

   const handleFormSubmit = () => {
     setIsOverlayVisible(false);
     setShowPopup(false);
  };

  
  
  return (
    <div className="container max-w-[1240px] py-6 px-4 m-auto">
      {promotionData?.masterPlanTitle && <h1 className="text-[#fff] m-auto w-fit mb-4 mt-3">{promotionData?.masterPlanTitle}</h1>}
      <p dangerouslySetInnerHTML={{ __html: promotionData?.masterPlanSubTitle }} className="w-[100%] md:w-[80%] text-center m-auto mb-[20px] md:mb-[30px]">
      </p>
      {promotionData?.masterPlanTitle && <div className="relative">
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
          alt="Master Plan"
          className="w-full h-auto"
            src={masterPlanImage}
            width={500}
            height={300}
        />
      </div>}
      {showPopup && (
              <ADmodel
                promotionData={promotionData}
                onClose={() => setShowPopup(false)}
                onFormSubmit={handleFormSubmit}
              />
            )}
    </div>
  );
};

export default ADMasterPlan;
