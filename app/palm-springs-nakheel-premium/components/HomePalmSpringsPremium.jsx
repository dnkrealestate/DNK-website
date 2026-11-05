"use client";

import React, { useState } from "react";
import PPNav from "./PPNav";
import PPHero from "./PPHero";
import PPIntro from "./PPIntro";
import PPStats from "./PPStats";
import PPJourney from "./PPJourney";
import PPResidences from "./PPResidences";
import PPFloorPlans from "./PPFloorPlans";
import PPLifestyle from "./PPLifestyle";
import PPWhyChoose from "./PPWhyChoose";
import PPGallery from "./PPGallery";
import PPLocation from "./PPLocation";
import PPInvestment from "./PPInvestment";
import PPPaymentPlan from "./PPPaymentPlan";
import PPBrochure from "./PPBrochure";
import PPEnquiry from "./PPEnquiry";
import PPFooter from "./PPFooter";
import PPWhatsAppFloat from "./PPWhatsAppFloat";
import PPEnquiryModal from "./PPEnquiryModal";

export default function HomePalmSpringsPremium() {
  const [enquiry, setEnquiry] = useState(null);

  const openEnquiry = (config = {}) => setEnquiry(config);
  const closeEnquiry = () => setEnquiry(null);

  return (
    <div className="bg-[#DCEAF4] min-h-screen font-[family-name:var(--font-body)]">
      <PPNav onOpenEnquiry={openEnquiry} />

      <div className="sm:p-6 lg:p-8">
        <div className="relative bg-white sm:rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(16,43,70,0.25)] max-w-[1440px] mx-auto">
          <main className="pt-24 sm:pt-28">
            <PPHero onOpenEnquiry={openEnquiry} />
            <PPIntro />
            <PPStats />
            <PPJourney onOpenEnquiry={openEnquiry} />
            <PPResidences onOpenEnquiry={openEnquiry} />
            <PPFloorPlans onOpenEnquiry={openEnquiry} />
            <PPLifestyle />
            <PPWhyChoose />
            <PPGallery />
            <PPLocation onOpenEnquiry={openEnquiry} />
            <PPInvestment onOpenEnquiry={openEnquiry} />
            <PPPaymentPlan onOpenEnquiry={openEnquiry} />
            <PPBrochure onOpenEnquiry={openEnquiry} />
            <PPEnquiry />
          </main>

          <PPFooter />
        </div>
      </div>

      <PPWhatsAppFloat />
      <PPEnquiryModal config={enquiry} onClose={closeEnquiry} />
    </div>
  );
}
