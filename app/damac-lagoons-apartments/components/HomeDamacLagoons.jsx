"use client";

import React from "react";
import DLHeader from "./DLHeader";
import DLHero from "./DLHero";
import DLAbout from "./DLAbout";
import DLInteriors from "./DLInteriors";
import DLProcessSteps from "./DLProcessSteps";
import DLBrochure from "./DLBrochure";
import DLWhyInvest from "./DLWhyInvest";
import DLAdvisor from "./DLAdvisor";
import DLPaymentPlan from "./DLPaymentPlan";
import DLAmenities from "./DLAmenities";
import DLVideoSection from "./DLVideoSection";
import DLGallery from "./DLGallery";
import DLLocation from "./DLLocation";
import DLDeveloper from "./DLDeveloper";
import DLFAQ from "./DLFAQ";
import DLFinalCTA from "./DLFinalCTA";
import DLFooter from "./DLFooter";
import DLStickyBar from "./DLStickyBar";

export default function HomeDamacLagoons() {
  return (
    <div className="bg-[#F5F1E8]">
      <DLHeader />
      <div className="overflow-hidden">
        <DLHero />
        <DLAbout />
        <DLInteriors />
        <DLProcessSteps />
        <DLBrochure />
        <DLWhyInvest />
        <DLAdvisor />
        <DLPaymentPlan />
        <DLAmenities />
        <DLVideoSection />
        <DLGallery />
        <DLLocation />
        <DLDeveloper />
        <DLFAQ />
        <DLFinalCTA />
        <DLFooter />
      </div>
      <DLStickyBar />
    </div>
  );
}
