"use client";

import React from "react";
import Image from "next/image";
import masterPlanImg from "@/public/assets/pojects/NadAlSheba/master-plan.webp";

export const MasterPlanNad = () => {
  return (
    <div className="container max-w-[1240px] py-6 px-4 m-auto">
      <h1 className="text-[#fff] m-auto w-fit mt-3 mb-0">Master Plan</h1>
      <h3 className="m-0 text-[#258493] text-center mb-2">
        Nad Al Sheba Gardens
      </h3>
      <Image
        src={masterPlanImg}
        alt="Master Plan - Nad Al Sheba"
        className="w-full h-auto rounded-lg"
        placeholder="blur"
      />
    </div>
  );
};

export default MasterPlanNad;
