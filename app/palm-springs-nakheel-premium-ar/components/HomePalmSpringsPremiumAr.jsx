"use client";

import React, { useState } from "react";
import ArNav from "./ArNav";
import ArHero from "./ArHero";
import ArIntro from "./ArIntro";
import ArStats from "./ArStats";
import ArJourney from "./ArJourney";
import ArResidences from "./ArResidences";
import ArFloorPlans from "./ArFloorPlans";
import ArLifestyle from "./ArLifestyle";
import ArWhyChoose from "./ArWhyChoose";
import ArGallery from "./ArGallery";
import ArLocation from "./ArLocation";
import ArInvestment from "./ArInvestment";
import ArPaymentPlan from "./ArPaymentPlan";
import ArBrochure from "./ArBrochure";
import ArEnquiry from "./ArEnquiry";
import ArFooter from "./ArFooter";
import ArWhatsAppFloat from "./ArWhatsAppFloat";
import ArEnquiryModal from "./ArEnquiryModal";

export default function HomePalmSpringsPremiumAr() {
  const [enquiry, setEnquiry] = useState(null);

  const openEnquiry = (config = {}) => setEnquiry(config);
  const closeEnquiry = () => setEnquiry(null);

  return (
    <div className="bg-[#DCEAF4] min-h-screen font-[family-name:var(--font-body)]">
      <ArNav onOpenEnquiry={openEnquiry} />

      <div className="sm:p-6 lg:p-4">
        <div className="relative bg-white sm:rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(16,43,70,0.25)] max-w-[1440px] mx-auto">
          <main className="pt-20 sm:pt-4">
            <ArHero onOpenEnquiry={openEnquiry} />
            <ArIntro />
            <ArStats />
            <ArJourney onOpenEnquiry={openEnquiry} />
            <ArResidences onOpenEnquiry={openEnquiry} />
            <ArFloorPlans onOpenEnquiry={openEnquiry} />
            <ArLifestyle />
            <ArWhyChoose />
            <ArGallery />
            <ArLocation onOpenEnquiry={openEnquiry} />
            <ArInvestment onOpenEnquiry={openEnquiry} />
            <ArPaymentPlan onOpenEnquiry={openEnquiry} />
            <ArBrochure onOpenEnquiry={openEnquiry} />
            <ArEnquiry />
          </main>

          <ArFooter />
        </div>
      </div>

      <ArWhatsAppFloat />
      <ArEnquiryModal config={enquiry} onClose={closeEnquiry} />
    </div>
  );
}
