'use client';
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
import { usePromotion } from "../PromotionContext"; // ✅ import context
import ADFloorPlan from "./ADFloorPlan";
import FaqSection from "./FaqSection";

const HomeAddressHills = () => {
  const promotionData = usePromotion(); // ✅ access promotion data

  if (!promotionData) return <div>Loading...</div>;

  return (
    <div className="bg-[#000]">
      <div className="overflow-hidden">
        {/* ✅ Example: pass the same data to each section */}
        <Lbanner promotionData={promotionData} />
        <LFormBanner promotionData={promotionData} />
        <LaboutSection promotionData={promotionData} />
        <ADFloorPlan promotionData={promotionData} />
        {/* <LimgSlider promotionData={promotionData} /> */}
        
        <ADMasterPlan promotionData={promotionData} />
        <LpaymentPlan promotionData={promotionData} />
        <LAmenitiesImg promotionData={promotionData} />
        <FaqSection promotionData={promotionData} /> 
        <LDownloadSection promotionData={promotionData} />
        <LBanner360 promotionData={promotionData} />
      </div>
    </div>
  );
};

export default HomeAddressHills;
