"use client";

import { WWURL } from "@/url/axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const BannerMasterPlan = ({ promotionData }) => {
  const imageUrl = promotionData?.subBanner ? `${WWURL}${promotionData.subBanner}` : null;

  return (
   <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
      {/* Background - Video OR Image OR Fallback */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={promotionData?.altSubBanner || "Amenities Banner"}
          quality={100}
          fill
          priority
          className="z-0"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div className="absolute inset-0 bg-gray-600 animate-pulse z-0"></div>
      )}

      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Text Content */}  
      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{promotionData.masterPlanBannerTitle}</h1>
           <div className="flex justify-center text-[#fff] text-[0.8rem] mb-1 md:text-[0.9rem]"
           style={{ "--themeColor": promotionData.themeColor }}>
            <Link href="/promotion/sobha-skyparks" 
              className="text-[#fff] hover:text-[var(--themeColor)] pr-1">
              Home
            </Link>
            /
            <Link
              href="/promotion/sobha-skyparks/msterPlan"
              className={`text-[#fff] hover:text-[var(--themeColor)] pr-1`}
            >
              Master Plan
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-[50px] md:h-[100px] bg-gradient-to-t from-black z-20" />
    </div>
  );
};

export default BannerMasterPlan;
