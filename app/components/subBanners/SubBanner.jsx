"use client";
import React, { useState } from "react";
import buyProject from "@/public/assets/banner-img/sub_banner.webp";
import PopupModel from "../model/PopupModel";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function SubBanner({ ad }) {
  const pathname = usePathname();
  const [ShowPopup, setShowPopup] = useState(false);

  const getHeading = () => {
    switch (pathname) {
      case "/buy-project":
        return "Ready to Move Property in Dubai";
      case "/off-plan-project":
        return "Off Plan Property in Dubai";
      case "/sell-project":
        return "Let’s sell your property profitably";
      case "/privacy-policy":
        return "Privacy Policy for DNK Real Estate";
      case "/services":
        return "Our Services";
    }
  };

  const getSubTitile = () => {
    switch (pathname) {
      case "/buy-project":
        return "Properties for sale in Dubai";
      case "/off-plan-project":
        return "New top-launched projects";
      case "/sell-project":
        return "Entire process is on us, from evaluation to a deal";
      case "/privacy-policy":
        return "Effective Date: 01 June 2022";
    }
  };

  const getBannerImg = () => {
    switch (pathname) {
      case "/buy-project":
        return buyProject;
      case "/off-plan-project":
        return buyProject;
      case "/sell-project":
        return buyProject;
      case "/privacy-policy":
        return buyProject;
    }
  };

  return (
    <div className="min-h-[350px] w-full bg-[#040406] flex items-center justify-center relative">
      <Image
        src={buyProject}
        alt={`Real Estate Market Dubai`}
        quality={90}
        fill
        sizes="100vw"
        priority
        style={{
          objectFit: "cover",
        }}
      />
      <div className="container max-w-[1240px] px-4 flex items-center justify-start z-10">
        <div className="py-1 text-center w-[100%]">
          <h1 className=" text-center">{getHeading()}</h1>
          <p className="pb-4 text-center">{getSubTitile()}</p>
          {pathname == "/sell-project" && (
            <button onClick={() => setShowPopup(true)} className="site-btn ">
              Request callback
            </button>
          )}
        </div>
      </div>
      <div>
        {ShowPopup && (
          <PopupModel adData={ad} onClose={() => setShowPopup(false)} />
        )}
      </div>
    </div>
  );
}
