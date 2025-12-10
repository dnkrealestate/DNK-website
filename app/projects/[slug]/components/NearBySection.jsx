"use client";
import React from "react";

export const NearBySection = ({ projectData }) => {
  return (
    <div className="grid md:grid-cols-2">
      <div>
        <h3 className="text-[#ffffff] text-left text-[1rem] sm:text-[1.4rem] font-semibold">
          {projectData?.nearby1}
        </h3>
        <p>{projectData?.dec1}</p>
      </div>
      <div>
        <h3 className="text-[#ffffff] text-left text-[1rem] sm:text-[1.4rem] font-semibold">
          {projectData?.nearby2}
        </h3>
        <p>{projectData?.dec2}</p>
      </div>
      <div>
        <h3 className="text-[#ffffff] text-left text-[1rem] sm:text-[1.4rem] font-semibold">
          {projectData?.nearby3}
        </h3>
        <p>{projectData?.dec3}</p>
      </div>
      <div>
        <h3 className="text-[#ffffff] text-left text-[1rem] sm:text-[1.4rem] font-semibold">
          {projectData?.nearby4}
        </h3>
        <p>{projectData?.dec4}</p>
      </div>
    </div>
  );
};

export default NearBySection;
