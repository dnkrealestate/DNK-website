"use client";

import React from "react";
import Lbanner from "./ADbanner";
import LFormBanner from "./ADFormBanner";
import LaboutSection from "./ADaboutSection";
import LimgSlider from "./ADimgSlider";
import LFloorPlanComponent from "./ADFloorPlanComponents";
import LpaymentPlan from "./ADpaymentPlan";
import LAmenitiesImg from "./ADAmenitiesImg";
import LDownloadSection from "./ADDownloadSection";
import LBanner360 from "./ADBanner360";
import ADMasterPlan from "./ADMasterPlan";
import FooterNad from "./FooterNad";
import TalkFooterNad from "./TalkFooterNad";

const HomeAddressHills = () => {
  return (
    <>
      <div className="bg-[#000]">
        <div className="overflow-hidden">
          <Lbanner />
          <LFormBanner />
          <LaboutSection />
          <LimgSlider />
          <LFloorPlanComponent />
          <ADMasterPlan />
          <LpaymentPlan />
          <LAmenitiesImg />
          <LDownloadSection />
          <LBanner360 />
          <FooterNad />
          <TalkFooterNad />
        </div>
      </div>
    </>
  );
};

export default HomeAddressHills;
