"use client";

import { WWURL } from "@/url/axios";
import Image from "next/image";
import React, { useState } from "react";
import ADmodel from "./ADmodel";

const ADFloorPlan = ({promotionData}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [ShowPopup, setShowPopup] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);

  const aboutImg1 = promotionData?.aboutImg1 ? `${WWURL}${promotionData.aboutImg1}` : null;

  const themeColor = promotionData?.themeColor || "#0D84C8";

  const handleViewPlanClick = () => {
    setShowPopup(true);
  };

    const handleFormSubmit = () => {
    setIsOverlayVisible(false);
    setShowPopup(false);
  };

  // 🧩 Dynamically build tabs based on available promotionData fields
  // 🧩 Use dynamic floorPlans array from backend
  const tabs = promotionData?.floorPlans?.map((plan, index) => ({
    id: index,
    title: plan.title || `Floor ${index + 1}`,
    heading: plan.heading || "",
    content: plan.content || "",
    image: plan.image ? `${WWURL}${plan.image}` : null,
    altText: plan.altText || "",
  })) || [];

  if (tabs.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        ...
      </div>
    );
  }



  return (
   <div style={{
        "--themeColor": themeColor, }} className="container max-w-[1240px] py-6 px-4 m-auto">
     <h1 className="text-[#fff] m-auto w-fit mb-4 mt-3 text-center">
          {promotionData?.floorPlanSectionTitle}
        </h1>
        {/* <p className="text-center w-full md:w-[70%] m-auto text-white">
          {promotionData?.floorPlanCommonDescription}
        </p> */}
       {/* 🟦 Dynamic Tab Buttons */}
      <div className="flex border-b mb-6 flex-wrap">
        
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(index)}
            className={`px-6 py-2 font-semibold transition-colors duration-300 ${
              activeTab === index
                ? "border-b-4 border-[var(--themeColor)] text-[var(--themeColor)]"
                : "text-gray-500 hover:text-[var(--themeColor)"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* 🟨 Dynamic Tab Content */}
      <div>
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            className={`${activeTab === index ? "block" : "hidden"}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h1 className="text-[var(--themeColor)] text-[1.1rem] sm:text-[1.3rem] md:text-[1.7rem] font-semibold">
                  {tab.heading}
                </h1>
                <p
                  className="mt-2 mb-4 text-[#fff]"
                  dangerouslySetInnerHTML={{ __html: tab.content }}
                ></p>
              </div>

              <div>
                {tab.image ? (
                  <div className="m-2 relative">
                    {isOverlayVisible && (
                      <div
                        onClick={handleViewPlanClick}
                        className="w-full h-full absolute backdrop-blur-sm cursor-pointer flex items-center justify-center z-10"
                      >
                        <div className="relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                          <button className="px-9 py-2 bg-sky-400 rounded-full text-[#000] text-[0.8rem] md:text-[1rem] relative z-20">
                            View Floor Plan
                          </button>
                        </div>
                      </div>
                    )}
                    <Image
                      src={tab.image}
                      alt={tab.altText || tab.heading || "Floor plan image"}
                      width={500}
                      height={300}
                      className="w-[80%] md:w-[80%] m-auto py-3 md:py-0 rounded-xl"
                    />
                  </div>
                ) : (
                  <div className="p-4 md:order-first">
                    <div className="h-full w-full bg-gray-600 animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🟩 Popup */}
      {ShowPopup && (
        <ADmodel
          promotionData={promotionData}
          onClose={() => setShowPopup(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
    
  );
};

export default ADFloorPlan;
