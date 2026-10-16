"use client";

import React, { useState } from "react";
import DLHeader from "./DLHeader";
import DLHero from "./DLHero";
import DLAbout from "./DLAbout";
import DLDeveloper from "./DLDeveloper";
import DLUnitTypes from "./DLUnitTypes";
import DLAmenities from "./DLAmenities";
import DLWhyInvest from "./DLWhyInvest";
import DLGallery from "./DLGallery";
import DLVideoSection from "./DLVideoSection";
import DLLocation from "./DLLocation";
import DLFAQ from "./DLFAQ";
import DLFinalCTA from "./DLFinalCTA";
import DLFooter from "./DLFooter";
import DLStickyBar from "./DLStickyBar";
import DLPopupModal from "./DLPopupModal";

export default function HomeDamacLagoons() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="bg-white">
      <DLHeader />
      <div className="overflow-hidden pb-20 lg:pb-0">
        <DLHero />
        <DLAbout />
        <DLDeveloper />
        <DLUnitTypes />
        <DLAmenities />
        <DLWhyInvest />
        <DLGallery />
        <DLVideoSection />
        <DLLocation />
        <DLFAQ />
        <DLFinalCTA />
        <DLFooter />
      </div>
      <DLStickyBar onEnquire={() => setShowPopup(true)} />
      {showPopup && <DLPopupModal onClose={() => setShowPopup(false)} />}
    </div>
  );
}
