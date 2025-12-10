"use client";

import React, { useState } from "react";
import { IoMdHelpCircle } from "react-icons/io";
import { IoChevronForwardCircle } from "react-icons/io5";
import ProjectConnect from "./ProjectConnect";

const MobileSliderInfo = ({ projectId, teamData }) => {
  const [navR, setNavR] = useState(true);

  const handleNavR = () => {
    setNavR(!navR);
  };

  return (
    <>
      {/* Toggle Button */}
      <div
        className="fixed right-[-17px] top-[15rem] bg-[#CE8745] rounded-bl-2xl rounded-tl-2xl lg:hidden z-30 bounce-left"
        onClick={handleNavR}
      >
        {!navR ? (
          <IoChevronForwardCircle className="text-[#000000] text-[2rem] mr-7" />
        ) : (
          <IoMdHelpCircle className="text-[#000000] text-[2rem] mr-7" />
        )}
      </div>

      {/* Slide-in Panel */}
      <div
        className={
          !navR
            ? "fixed right-0 top-[50px] w-[85%] bg-[#040406] h-full ease-in-out duration-500 slide-bar"
            : "fixed right-[-300%] slide-bar top-[50px] h-full"
        }
      >
        <div className="p-4">
          <div
            className="absolute left-[-44px] top-[10rem] bg-[#CE8745] rounded-bl-2xl rounded-tl-2xl"
            onClick={handleNavR}
          >
            <IoChevronForwardCircle className="text-[#000] text-[2rem] mr-3" />
          </div>
          <ProjectConnect projectId={projectId} teamData={teamData} />
        </div>
      </div>
    </>
  );
};

export default MobileSliderInfo;
