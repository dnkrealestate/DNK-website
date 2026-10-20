import React from "react";
import MCHeader from "./MCHeader";
import MCHero from "./MCHero";
import MCAbout from "./MCAbout";
import MCUnitTypes from "./MCUnitTypes";
import MCPartnership from "./MCPartnership";
import MCAmenities from "./MCAmenities";
import MCGallery from "./MCGallery";
import MCLocation from "./MCLocation";
import MCPaymentPlan from "./MCPaymentPlan";
import MCDeveloper from "./MCDeveloper";
import MCFAQ from "./MCFAQ";
import MCFinalCTA from "./MCFinalCTA";
import MCFooter from "./MCFooter";
import MCStickyBar from "./MCStickyBar";

export default function HomeManchesterCityYas() {
  return (
    <div className="bg-[#050810]">
      <MCHeader />
      <div className="overflow-hidden">
        <MCHero />
        <MCAbout />
        <MCUnitTypes />
        <MCPartnership />
        <MCPaymentPlan />
        <MCAmenities />
        <MCGallery />
        <MCLocation />
        <MCDeveloper />
        <MCFAQ />
        <MCFinalCTA />
        <MCFooter />
      </div>
      <MCStickyBar />
    </div>
  );
}
