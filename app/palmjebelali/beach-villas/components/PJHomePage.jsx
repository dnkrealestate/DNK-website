"use client";

import { Cormorant_Garamond } from "next/font/google";
import PJHeader from "./PJHeader";
import PJHero from "./PJHero";
import PJHighlights from "./PJHighlights";
import PJVillaTypes from "./PJVillaTypes";
import PJGallery from "./PJGallery";
import PJLifestyle from "./PJLifestyle";
import PJMasterplan from "./PJMasterplan";
import PJEOIProcess from "./PJEOIProcess";
import PJLocation from "./PJLocation";
import PJDeveloper from "./PJDeveloper";
import PJContactBanner from "./PJContactBanner";
import PJFooter from "./PJFooter";
import PJStickyBar from "./PJStickyBar";

// A serif display face scoped to just this page — sets the "ultra luxury"
// headline tone apart from the rest of the (Poppins-only) site without
// touching the global font setup.
const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-pj-display",
});

export default function PJHomePage() {
  return (
    <div className={`${displayFont.variable} bg-white`}>
      <PJHeader />
      <PJHero />
      <PJHighlights />
      <PJVillaTypes />
      <PJGallery />
      <PJLifestyle />
      <PJMasterplan />
      <PJEOIProcess />
      <PJLocation />
      <PJDeveloper />
      <PJContactBanner />
      <PJFooter />
      <PJStickyBar />
    </div>
  );
}
