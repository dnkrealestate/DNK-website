"use client";

import React, { useState } from "react";
import ArHeader from "./ArHeader";
import ArHero from "./ArHero";
import ArQuickFacts from "./ArQuickFacts";
import ArIntro from "./ArIntro";
import ArResidences from "./ArResidences";
import ArPaymentPlan from "./ArPaymentPlan";
import ArDocuments from "./ArDocuments";
import ArLocation from "./ArLocation";
import ArGallery from "./ArGallery";
import ArFinalCTA from "./ArFinalCTA";
import ArFooter from "./ArFooter";
import ArWhatsAppFloat from "./ArWhatsAppFloat";
import ArStickyMobileBar from "./ArStickyMobileBar";
import ArEnquiryModal from "./ArEnquiryModal";

export default function HomeAldarDubaiLaunchAr() {
  const [modalContext, setModalContext] = useState(null);

  const openEnquiry = (context) => setModalContext(context || {});
  const closeEnquiry = () => setModalContext(null);

  return (
    <div className="bg-[#071321] font-[family-name:var(--font-body)]">
      <ArHeader onOpenEnquiry={openEnquiry} />
      <ArHero onOpenEnquiry={openEnquiry} />
      <ArQuickFacts />
      <ArIntro />
      <ArResidences onOpenEnquiry={openEnquiry} />
      <ArPaymentPlan onOpenEnquiry={openEnquiry} />
      <ArDocuments onOpenEnquiry={openEnquiry} />
      <ArLocation onOpenEnquiry={openEnquiry} />
      <ArGallery onOpenEnquiry={openEnquiry} />
      <ArFinalCTA />
      <ArFooter />

      <ArWhatsAppFloat />
      <ArStickyMobileBar onOpenEnquiry={openEnquiry} />
      <ArEnquiryModal open={!!modalContext} onClose={closeEnquiry} context={modalContext} />
    </div>
  );
}
