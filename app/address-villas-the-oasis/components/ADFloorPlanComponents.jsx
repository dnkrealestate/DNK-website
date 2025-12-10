"use client";

import React from "react";
import Image from "next/image";
import FloorPlan from "./ADFloorPlan";

import FloorCover1 from "@/public/assets/pojects/addressVilla/sideCover.webp";
import ImgText from "@/public/assets/lavioleta/personally_visited_approved.webp";

const ADFloorPlanComponent = () => {
  return (
    <div id="floorPlan" className="container max-w-[1240px] py-6 px-4 m-auto">
      <h1 className="text-[#fff] text-center mt-3 mb-0">Villa Floor Plan</h1>
      <p className="w-full md:w-[70%] text-center m-auto mb-4 text-[#ccc]">
        Discover luxurious 4, 5 & 6-bedroom villas, offering spacious layouts,
        premium finishes, and world-class amenities for an unparalleled living
        experience.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* FloorPlan Component */}
        <div className="md:col-span-3">
          <FloorPlan />
        </div>

        {/* Right Image Side Panel */}
        <div
          className="w-full bg-no-repeat bg-cover bg-center rounded-lg flex items-start justify-end p-4 md:p-6"
          style={{
            backgroundImage: `url(${FloorCover1.src})`,
          }}
        >
          <Image
            src={ImgText}
            alt="Personally Visited Approved"
            width={120}
            height={120}
            className="w-[50%] md:w-[40%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ADFloorPlanComponent;