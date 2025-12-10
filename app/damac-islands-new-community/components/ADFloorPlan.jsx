"use client";

import React, { useState } from "react";
import Image from "next/image";
import gr from "@/public/assets/other/4br-islands2.webp";
import ff from "@/public/assets/other/5br-islands2.webp";
import rf from "@/public/assets/other/6br-islands2.webp";
import ADmodel from "./ADmodel";

const ADFloorPlan = () => {
  const [activeTab, setActiveTab] = useState("Tab1");
  const [showPopup, setShowPopup] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleViewPlanClick = () => {
    setShowPopup(true);
  };

  const handleFormSubmit = () => {
    setIsOverlayVisible(false);
    setShowPopup(false);
  };

  const renderTabContent = (imgSrc) => (
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
      <div className="w-full h-fit text-center bg-[#ffffff] relative z-0">
        <Image
          src={imgSrc}
          alt="floor plan"
          className="w-full h-auto m-auto"
          placeholder="blur"
        />
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden">
      <div className="tabs1">
        <button
          className={`tab-btn hover:!bg-[#0D84C8] !ml-0 z-30 ${
            activeTab === "Tab1" ? "!bg-[#0D84C8]" : ""
          }`}
          onClick={() => handleTabClick("Tab1")}
        >
          4BR
        </button>
        <button
          className={`tab-btn hover:!bg-[#0D84C8] z-20 ${
            activeTab === "Tab2" ? "!bg-[#0D84C8]" : ""
          }`}
          onClick={() => handleTabClick("Tab2")}
        >
          5BR
        </button>
        <button
          className={`tab-btn hover:!bg-[#0D84C8] z-10 ${
            activeTab === "Tab3" ? "!bg-[#0D84C8]" : ""
          }`}
          onClick={() => handleTabClick("Tab3")}
        >
          6BR
        </button>
      </div>

      <div className="tab-content bg-[#D9D9D9] p-1 md:p-3">
        {activeTab === "Tab1" && renderTabContent(gr)}
        {activeTab === "Tab2" && renderTabContent(ff)}
        {activeTab === "Tab3" && renderTabContent(rf)}
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

export default ADFloorPlan;
