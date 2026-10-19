"use client";

import React, { useState } from "react";
import DIHeader from "./DIHeader";
import DIHero from "./DIHero";
import DIAbout from "./DIAbout";
import DIDeveloper from "./DIDeveloper";
import DIAmenities from "./DIAmenities";
import DIWhyInvest from "./DIWhyInvest";
import DIGallery from "./DIGallery";
import DIVideoSection from "./DIVideoSection";
import DILocation from "./DILocation";
import DIFAQ from "./DIFAQ";
import DIFinalCTA from "./DIFinalCTA";
import DIFooter from "./DIFooter";
import DIStickyBar from "./DIStickyBar";
import DIPopupModal from "./DIPopupModal";

export default function HomeDamacIslands() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="bg-white">
      <DIHeader />
      <div className="overflow-hidden pb-20 lg:pb-0">
        <DIHero />
        <DIAbout />
        <DIDeveloper />
        <DIAmenities />
        <DIWhyInvest />
        <DIGallery />
        <DIVideoSection />
        <DILocation />
        <DIFAQ />
        <DIFinalCTA />
        <DIFooter />
      </div>
      <DIStickyBar onEnquire={() => setShowPopup(true)} />
      {showPopup && <DIPopupModal onClose={() => setShowPopup(false)} />}
    </div>
  );
}
