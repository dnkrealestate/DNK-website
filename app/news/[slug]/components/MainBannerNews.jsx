"use client";
import React from "react";
import bannerImgPlaceholder from "@/public/assets/banner-img/news_banner.webp";
import Link from "next/link";
import Image from "next/image";

export default function MainBannerNews({newsId}){

  return (
    <div
      className="relative w-full bg-[#040406] flex items-center justify-center bg-cover bg-no-repeat"
    >
      <Image
        src={bannerImgPlaceholder}
        alt={`${newsId.newstitle || "News"}`}
        quality={90}
        fill
        sizes="100vw"
        priority
        style={{
          objectFit: "cover",
        }}
      />
      
      <div className="container max-w-[1240px] px-4 flex items-center justify-start z-10">
        <div className="py-[20px] md:py-[50px] text-center w-[100%]">
          <h1 className=" text-center">{newsId.newstitle}</h1>
          <div className="flex text-[#fff] text-[0.8rem] mb-1 md:text-[0.9rem] justify-center">
            <Link href="/" className="text-[#fff] hover:text-[#CE8745] pr-1">
              Home
            </Link>
            /
            <Link
              href="/news"
              className="text-[#fff] hover:text-[#CE8745] pr-1"
            >
              News
            </Link>
            /
            <Link
              href="#"
              className="text-[#979797] hover:text-[#fff] pr-1 hidden md:block text-left pl-1"
            >
              {newsId.newstitle}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
