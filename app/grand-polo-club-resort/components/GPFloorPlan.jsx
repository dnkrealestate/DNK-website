"use client";

import React, { useState } from "react";
import Image from "next/image";
import gr from "@/public/assets/pojects/addressVilla/floorPlan01.webp";
import ff from "@/public/assets/pojects/addressVilla/floorPlan02.webp";
import rf from "@/public/assets/pojects/addressVilla/floorPlan03.webp";
import GPmodel from "./GPmodel";


const GPFloorPlan = () => {
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
          className="w-full h-full absolute backdrop-blur-sm cursor-pointer flex items-center justify-center z-20"
        >
          <div className="relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <button className="px-9 py-2 bg-sky-400 rounded-full text-black text-sm md:text-base relative z-30">
              View Floor Plan
            </button>
          </div>
        </div>
      )}
      <div className="w-full bg-white text-center">
        <Image
          src={imgSrc}
          alt="floor plan"
          className="w-full h-auto"
          placeholder="blur"
        />
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden">
      <div className="tabs1 flex gap-2 mb-2">
        <button
          className={`tab-btn hover:!bg-[#CFA028] !ml-0 z-30 ${
            activeTab === "Tab1" ? "!bg-[#CFA028]" : ""
          }`}
          onClick={() => handleTabClick("Tab1")}
        >
          GF
        </button>
        <button
          className={`tab-btn hover:!bg-[#CFA028] z-20 ${
            activeTab === "Tab2" ? "!bg-[#CFA028]" : ""
          }`}
          onClick={() => handleTabClick("Tab2")}
        >
          FF
        </button>
        <button
          className={`tab-btn hover:!bg-[#CFA028] z-10 ${
            activeTab === "Tab3" ? "!bg-[#CFA028]" : ""
          }`}
          onClick={() => handleTabClick("Tab3")}
        >
          RF
        </button>
      </div>

      <div className="tab-content bg-[#D9D9D9] p-1 md:p-3">
        {activeTab === "Tab1" && renderTabContent(gr)}
        {activeTab === "Tab2" && renderTabContent(ff)}
        {activeTab === "Tab3" && renderTabContent(rf)}
      </div>

      {showPopup && (
        <GPmodel
          onClose={() => setShowPopup(false)}
          onFormSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default GPFloorPlan;
