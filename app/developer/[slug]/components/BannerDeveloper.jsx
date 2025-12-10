"use client";
import React from "react";
import bannerImgPlaceholder from "@/public/assets/banner-img/sub_banner.webp";
import Link from "next/link";
import Image from "next/image";
import partnerLogo from "@/public/assets/icons/addlogo.webp";
import { WWURL } from "@/url/axios";

const getPartenerUrl = (image) => (image ? `${WWURL}${image}` : partnerLogo);

export default function BannerDeveloper({ developerData }) {
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
          <div className="w-fit h-[30px] md:h-[50px] flex items-center justify-center relative m-auto">
            <Image
              src={getPartenerUrl(developerData.image)}
              alt={developerData.partnername}
              className="w-fit h-fit m-auto"
              width={200}
              height={100}
              quality={60}
              priority
              sizes="100vw"
              formats={["image/webp"]}
              style={{
                objectFit: "contain",
                display: "block",
                height: "100%",
              }}
            />
          </div>

          <p className="text-[0.8rem] mt-1 text-[#fff] px-0 md:px-4">
            {developerData.partnerdescription}
          </p>
        </div>
      </div>
    </div>
  );
};
