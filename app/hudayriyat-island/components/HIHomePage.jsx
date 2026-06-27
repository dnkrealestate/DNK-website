"use client";

import HIHeader from "./HIHeader";
import HIHero from "./HIHero";
import HIHighlights from "./HIHighlights";
import HIAbout from "./HIAbout";
import HIAmenities from "./HIAmenities";
import HIPaymentPlan from "./HIPaymentPlan";
import HILocation from "./HILocation";
import HIContactBanner from "./HIContactBanner";
import HIFooter from "./HIFooter";

export default function HIHomePage() {
  return (
    <div>
      <HIHeader />
      <HIHero />
      <HIHighlights />
      <HIAbout />
      <HIAmenities />
      <HIPaymentPlan />
      <HILocation />
      <HIContactBanner />
      <HIFooter />
    </div>
  );
}
