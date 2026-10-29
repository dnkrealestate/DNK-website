"use client";

import React, { useState } from "react";
import PSHeader from "./PSHeader";
import PSHero from "./PSHero";
import PSQuickFacts from "./PSQuickFacts";
import PSIntro from "./PSIntro";
import PSHighlights from "./PSHighlights";
import PSResidences from "./PSResidences";
import PSLocation from "./PSLocation";
import PSDocuments from "./PSDocuments";
import PSGallery from "./PSGallery";
import PSFAQ from "./PSFAQ";
import PSFinalCTA from "./PSFinalCTA";
import PSFooter from "./PSFooter";
import PSWhatsAppFloat from "./PSWhatsAppFloat";
import PSStickyMobileBar from "./PSStickyMobileBar";
import PSEnquiryModal from "./PSEnquiryModal";

export default function HomePalmSprings() {
  const [modalContext, setModalContext] = useState(null);

  const openEnquiry = (context) => setModalContext(context || {});
  const closeEnquiry = () => setModalContext(null);

  return (
    <div className="bg-[#011945]">
      <PSHeader onOpenEnquiry={openEnquiry} />
      <PSHero onOpenEnquiry={openEnquiry} />
      <PSQuickFacts />
      <PSIntro />
      <PSHighlights />
      <PSResidences onOpenEnquiry={openEnquiry} />
      <PSLocation onOpenEnquiry={openEnquiry} />
      <PSDocuments onOpenEnquiry={openEnquiry} />
      <PSGallery onOpenEnquiry={openEnquiry} />
      <PSFAQ />
      <PSFinalCTA />
      <PSFooter />

      <PSWhatsAppFloat />
      <PSStickyMobileBar onOpenEnquiry={openEnquiry} />
      <PSEnquiryModal open={!!modalContext} onClose={closeEnquiry} context={modalContext} />
    </div>
  );
}
