"use client";

import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const WHATSAPP_TEXT =
  "Hello,%20I%20am%20interested%20in%20Damac%20Lagoons%20-%20Lagoon%20Views%20Apartments";

export default function DLStickyBar({ onEnquire }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-[#EBE8E2] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-3 py-2.5 flex items-center gap-2">
      <a
        href="tel:+971555769195"
        className="flex-1 flex items-center justify-center gap-2 border border-[#D8D4CC] text-[#151A19] font-semibold py-3 rounded-xl text-sm"
        aria-label="Call DNK Real Estate"
      >
        <FaPhoneAlt className="text-xs" /> Call
      </a>
      <a
        href={`https://wa.me/+971555769195?text=${WHATSAPP_TEXT}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3 rounded-xl text-sm"
        aria-label="WhatsApp DNK Real Estate"
      >
        <FaWhatsapp /> WhatsApp
      </a>
      <button
        onClick={onEnquire}
        className="flex-1 bg-gradient-to-r from-[#B68A2E] to-[#D4AF6A] text-white font-semibold py-3 rounded-xl text-sm"
      >
        Enquire Now
      </button>
    </div>
  );
}
