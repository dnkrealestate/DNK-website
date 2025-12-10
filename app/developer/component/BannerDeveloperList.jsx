"use client";
import React from "react";
import bannerImgPlaceholder from "@/public/assets/banner-img/sub_banner.webp";
import Link from "next/link";
import Image from "next/image";


export default function BannerDeveloperList() {
  return (
    <div className="relative w-full bg-[#040406] flex items-center justify-center bg-cover bg-no-repeat">
      <Image
        src={bannerImgPlaceholder}
        alt="Podcast Banner"
        quality={90}
        fill
        sizes="100vw"
        priority
        className="opacity-50 md:opacity-80"
        style={{
          objectFit: "cover",
        }}
      />

      <div className="container max-w-[1240px] px-4 flex items-center justify-start z-10">
        <div className="py-[20px] md:py-[55px] text-center w-[100%]">
          <h1 className=" text-center">Leading Developers</h1>
          <div className="px-4 flex text-[#fff] text-[0.8rem] mb-1 md:text-[0.9rem] justify-center">
            <Link href="/" className="text-[#fff] hover:text-[#CE8745] pr-1">
              Home
            </Link>
            /
            <Link
              href="#"
              className="text-[#979797] hover:text-[#fff] pr-1 text-left pl-1"
            >
              Developer List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
