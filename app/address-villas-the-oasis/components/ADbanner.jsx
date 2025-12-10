"use client";

import React from "react";
import Image from "next/image";
import projectCover from "@/public/assets/pojects/addressVilla/cover.webp";

export const ADbanner = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[500px] lg:h-[700px]">
      {/* Background Image using Next.js Image */}
      <Image
        src={projectCover}
        alt="Project Cover"
        fill
        priority
        className="object-cover object-center z-0"
      />

      {/* Overlay container */}
      <div className="relative z-10 container max-w-[1240px] px-4 flex items-center h-full">
        <div className="banner-content"></div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-[50px] md:h-[100px] bg-gradient-to-t from-black z-20" />
    </div>
  );
};

export default ADbanner;
