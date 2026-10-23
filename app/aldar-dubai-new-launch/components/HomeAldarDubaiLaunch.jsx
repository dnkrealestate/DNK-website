"use client";

import React, { useState } from "react";
import AHeader from "./AHeader";
import AHero from "./AHero";
import AQuickFacts from "./AQuickFacts";
import AIntro from "./AIntro";
import AResidences from "./AResidences";
import APaymentPlan from "./APaymentPlan";
import ADocuments from "./ADocuments";
import ALocation from "./ALocation";
import AGallery from "./AGallery";
import AFinalCTA from "./AFinalCTA";
import AFooter from "./AFooter";
import AWhatsAppFloat from "./AWhatsAppFloat";
import AStickyMobileBar from "./AStickyMobileBar";
import AEnquiryModal from "./AEnquiryModal";

export default function HomeAldarDubaiLaunch() {
  const [modalContext, setModalContext] = useState(null);

  const openEnquiry = (context) => setModalContext(context || {});
  const closeEnquiry = () => setModalContext(null);

  return (
    <div className="bg-[#071321]">
      <AHeader onOpenEnquiry={openEnquiry} />
      <AHero onOpenEnquiry={openEnquiry} />
      <AQuickFacts />
      <AIntro />
      <AResidences onOpenEnquiry={openEnquiry} />
      <APaymentPlan onOpenEnquiry={openEnquiry} />
      <ADocuments onOpenEnquiry={openEnquiry} />
      <ALocation onOpenEnquiry={openEnquiry} />
      <AGallery onOpenEnquiry={openEnquiry} />
      <AFinalCTA />
      <AFooter />

      <AWhatsAppFloat />
      <AStickyMobileBar onOpenEnquiry={openEnquiry} />
      <AEnquiryModal open={!!modalContext} onClose={closeEnquiry} context={modalContext} />
    </div>
  );
}
