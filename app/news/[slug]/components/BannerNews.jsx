"use client";
import React from "react";
import bannerImg from "@/public/assets/banner-img/news_banner.webp";
import Image from "next/image";

export default function BannerNews() {
  return (
    <div className="w-full relative bg-[#040406] flex items-center justify-center bg-cover bg-no-repeat ">
      <Image
        src={bannerImg}
        alt="News Report, dnk news,"
        quality={80}
        width="100%"
        height="500"
        sizes="100vw"
        priority
        style={{
          objectFit: "cover",
        }}
      />
      <div className="z-10 container max-w-[1240px] px-4 flex items-center justify-start">
        <div className="py-[20px] md:py-[50px] text-center w-[100%]">
          <h1 className=" text-center">News</h1>
          <p className="m-0 text-center text-[#fff]">
            Latest news of Dubai properties and investments
          </p>
        </div>
      </div>
    </div>
  );
}
