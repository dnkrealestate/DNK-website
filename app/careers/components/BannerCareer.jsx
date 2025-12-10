"use client";
import React from "react";
import buyProject from "@/public/assets/banner-img/sub_banner.webp";
import Image from "next/image";

export const BannerCareer = () => {
  return (
    <div className=" w-full bg-[#040406] flex items-center justify-center relative h-[150px] md:h-[200px]">
      <Image
        src={buyProject}
        alt="careers, dnk, dubai view, Real estate, off plan, ROI, investment"
        fill
        quality={100}
        sizes="100vw"
        priority
        style={{
          objectFit: "cover",
        }}
      />
      <div className="container max-w-[1240px] px-4 flex items-center justify-start relative z-10">
        <div className="py-2 text-center w-[100%]">
          <h1 className=" text-center">Careers</h1>
          {/* <p className="pb-4 text-center">New top-launched projects</p> */}
          {/* <button className="site-btn ">Request callback</button> */}
        </div>
      </div>
    </div>
  );
};

export default BannerCareer;
