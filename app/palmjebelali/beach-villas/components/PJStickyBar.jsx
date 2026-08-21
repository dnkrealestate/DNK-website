"use client";

import React, { useEffect, useState } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import PJPopupModel from "./PJPopupModel";

export default function PJStickyBar() {
  const [visible, setVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-[#0A0C0E]/97 backdrop-blur-md border-t border-[#79644A]/20 px-3 py-2.5 flex items-center gap-2 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
          <a
            href="tel:+971555769195"
            className="flex-shrink-0 w-11 h-11 rounded-xl border border-white/15 flex items-center justify-center text-white/70"
            aria-label="Call us"
          >
            <FaPhoneAlt className="text-sm" />
          </a>
          <a
            href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Palm%20Jebel%20Ali%20Beach%20Villas"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-11 h-11 rounded-xl border border-[#25D366]/30 flex items-center justify-center text-[#25D366]"
            aria-label="WhatsApp us"
          >
            <FaWhatsapp className="text-lg" />
          </a>
          <button
            onClick={() => setShowPopup(true)}
            className="flex-1 bg-gradient-to-r from-[#79644A] to-[#9C8564] text-white font-semibold py-3 rounded-xl text-sm tracking-wide"
          >
            Register Interest
          </button>
        </div>
      </div>

      {/* Rendered outside the translated bar above — a CSS transform on an
          ancestor turns position:fixed descendants into positioned-relative-
          to-that-ancestor, which would trap this modal inside the thin
          bottom bar instead of covering the full viewport. */}
      {showPopup && (
        <PJPopupModel unitInterest="Beach Villas" onClose={() => setShowPopup(false)} />
      )}
    </>
  );
}
