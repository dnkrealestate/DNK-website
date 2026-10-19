"use client";

import React, { useState } from "react";
import Image from "next/image";
import DLPopupModal from "./DLPopupModal";

const HIGHLIGHTS = [
  { value: "50/50", label: "Payment Plan" },
  { value: "AED 1,700", label: "Per Month" },
  { value: "4% DLD", label: "Fee Waiver" },
];

export default function DLUnitTypes() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section className="bg-[#F7F5F1] py-16 lg:py-24 px-4" id="units">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#0F766E] text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            Sorrento Lagoon Views
          </p>
          <h2 className="text-[#151A19] text-3xl lg:text-4xl font-semibold">
            Studio &amp; 1 Bedroom Luxury Apartments
          </h2>
        </div>

        <div className="rounded-3xl overflow-hidden border border-[#EBE8E2] bg-white shadow-xl shadow-black/5">
          <div className="relative aspect-[21/9]">
            <Image
              src="/assets/damac-lagoons/unit-1br.webp"
              alt="Studio and 1 Bedroom luxury apartments at Sorrento Lagoon Views, Damac Lagoons"
              fill
              sizes="(max-width: 1000px) 100vw, 1000px"
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-3 border-t border-[#EBE8E2]">
            {HIGHLIGHTS.map((item, i) => (
              <div
                key={item.label}
                className={`text-center py-6 px-3 ${i !== 0 ? "border-l border-[#EBE8E2]" : ""}`}
              >
                <p className="text-[#151A19] text-xl sm:text-2xl font-bold">
                  {item.value}
                </p>
                <p className="text-[#8A8F8B] text-xs uppercase tracking-wider mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 p-6 lg:p-8 bg-[#151A19]">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wider">
                Starting Price
              </p>
              <p className="text-[#D4AF6A] text-3xl font-bold">AED 680K</p>
            </div>
            <button
              onClick={() => setShowPopup(true)}
              className="bg-gradient-to-r from-[#B68A2E] to-[#D4AF6A] text-white font-semibold px-6 py-3 rounded-xl text-sm hover:brightness-110 transition-all duration-200 whitespace-nowrap"
            >
              Get Full Details
            </button>
          </div>
        </div>

        <p className="text-[#8A8F8B] text-xs text-center mt-8">
          Prices and availability correct as of publication and subject to
          change by the developer.
        </p>
      </div>

      {showPopup && <DLPopupModal onClose={() => setShowPopup(false)} />}
    </section>
  );
}
