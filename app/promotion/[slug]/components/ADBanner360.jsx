"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import bannerImg from "@/public/assets/other/islands-cover.webp";
import ADmodel from "./ADmodel";
import { WWURL } from "@/url/axios";

const ADBanner360 = ({promotionData}) => {
  const [ShowPopup, setShowPopup] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const bannerRef = useRef(null);

   const imageUrl = promotionData?.footerBannerImage ? `${WWURL}${promotionData.footerBannerImage}` : null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  return (
    <div ref={bannerRef} className="relative w-full bg-[#040406]">
      {/* Banner Image */}
      <div className="absolute inset-0 z-0">
        {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="dubai view, Real estate, off plan, ROI, investment"
                  quality={100}
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className="h-full w-full bg-gray-600 animate-pulse"></div>
        )}
      </div>

      {/* Overlay for mobile */}
      <div className="bg-[#00000066] w-full h-full absolute left-0 top-0 z-10 sm:hidden"></div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-[300px] sm:min-h-[500px]">
        <div className="container max-w-[1240px] px-4 flex items-center justify-between">
          <div className="banner-content text-white">
            <h1 className="text-[3rem] mb-0">{promotionData.footerBannerTitle}</h1>
            <h1 className="banner-h1">{promotionData.footerBannerSubTitle}</h1>
            <button
              onClick={() => setShowPopup(true)}
              className="site-btn1 bg-white text-black hover:text-black hover:bg-white"
            >
             {promotionData.footerBannerBtnName}
            </button>
          </div>
        </div>
      </div>

      {/* Popup */}
      {ShowPopup && <ADmodel promotionData={promotionData} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default ADBanner360;
