"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const FACTS = [
  { label: "Project", value: "Sorrento, Damac Lagoons" },
  { label: "Apartments", value: "Studio & 1-Bed" },
  { label: "From", value: "AED 680K*" },
  { label: "DLD Fee", value: "0% — waived" },
];

export default function DLStickyBar() {
  return (
    <div className="sticky bottom-0 left-0 right-0 z-40 bg-[#0D1210] border-t border-white/10 px-4 py-2.5">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-3">
        <div className="hidden sm:flex items-center gap-6 overflow-x-auto">
          {FACTS.map((fact) => (
            <div key={fact.label} className="flex-shrink-0">
              <p className="text-white/40 text-[0.6rem] uppercase tracking-wider">
                {fact.label}
              </p>
              <p className="text-white text-sm font-semibold whitespace-nowrap">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
        <p className="sm:hidden text-white text-xs font-semibold">
          From AED 680K* · 0% DLD fee
        </p>

        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Damac%20Lagoons%20-%20Sorrento%20Lagoon%20Views"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:brightness-110 text-white font-semibold px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm flex items-center gap-1.5 transition-all"
          >
            <FaWhatsapp /> <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <a
            href="#enquire-hero"
            className="bg-[#1C6B82] hover:bg-[#17596C] text-white font-semibold px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm transition-colors"
          >
            Register Interest
          </a>
        </div>
      </div>
    </div>
  );
}
