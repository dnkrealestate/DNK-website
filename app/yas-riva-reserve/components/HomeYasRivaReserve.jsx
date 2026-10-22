"use client";

import React, { useState } from "react";
import YRHeader from "./YRHeader";
import YRHero from "./YRHero";
import YROverview from "./YROverview";
import YRUnitTypes from "./YRUnitTypes";
import YRBuyerProfile from "./YRBuyerProfile";
import YRAmenities from "./YRAmenities";
import YRGallery from "./YRGallery";
import YRLocation from "./YRLocation";
import YRDetails from "./YRDetails";
import YRFinalCTA from "./YRFinalCTA";
import YRFooter from "./YRFooter";
import YRStickyBar from "./YRStickyBar";
import YREnquiryDrawer from "./YREnquiryDrawer";

export default function HomeYasRivaReserve() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = () => setDrawerOpen(true);

  return (
    <div className="bg-[#15130F]">
      <YRHeader onOpenDrawer={openDrawer} />
      <YRHero onOpenDrawer={openDrawer} />
      <YROverview />
      <YRUnitTypes />
      <YRBuyerProfile />
      <YRAmenities />
      <YRGallery />
      <YRLocation />
      <YRDetails />
      <YRFinalCTA />
      <YRFooter />
      <YRStickyBar onOpenDrawer={openDrawer} />
      <YREnquiryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
