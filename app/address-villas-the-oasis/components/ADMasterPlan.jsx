"use client";

import React from "react";
import Image from "next/image";
import masterPlanImg from "@/public/assets/pojects/addressVilla/newphase.webp";

const ADMasterPlan = () => {
  return (
    <div className="container max-w-[1240px] py-6 px-4 m-auto">
      <h1 className="text-[#fff] m-auto w-fit mb-4 mt-3">Master Plan</h1>
      <Image
        src={masterPlanImg}
        alt="Master Plan"
        className="w-full h-auto"
        placeholder="blur"
      />
    </div>
  );
};

export default ADMasterPlan;
