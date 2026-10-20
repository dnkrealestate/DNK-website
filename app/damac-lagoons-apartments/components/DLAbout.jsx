"use client";

import React, { useState } from "react";
import Image from "next/image";
import DLPopupModal from "./DLPopupModal";

const UNITS = [
  {
    type: "Studio",
    label: "Studio Apartments",
    badge: "EOI Open",
    price: "From AED 680,000*",
    image: "/assets/damac-lagoons/unit-2br.webp",
  },
  {
    type: "1 Bedroom",
    label: "1-Bedroom Apartments",
    badge: "EOI Open",
    price: "On request",
    image: "/assets/damac-lagoons/unit-1br.webp",
  },
];

export default function DLAbout() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section className="bg-[#F5F1E8] py-16 lg:py-24 px-4" id="units">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[#1C6B82] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
          <span>01</span>
          <span className="w-8 h-px bg-[#1C6B82]" />
          <span>The Collection</span>
        </p>
        <h2 className="text-[#151A19] text-3xl lg:text-4xl font-extrabold mb-4 max-w-[600px]">
          Studios &amp; 1-Bedroom Apartments at Sorrento
        </h2>
        <p className="text-[#5B6460] max-w-[680px] mb-10 leading-relaxed">
          Discover a new collection of studios and 1-bedroom apartments at
          Sorrento, Damac Lagoons. Choose one and your registration —
          expected pricing, payment plan and early access — is tailored to
          it.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {UNITS.map((unit) => (
            <div
              key={unit.type}
              className="rounded-3xl overflow-hidden border border-[#E5E0D5] bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={unit.image}
                  alt={`${unit.type} apartment at Sorrento Lagoon Views, Damac Lagoons`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 bg-[#0D1210]/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  {unit.badge}
                </span>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-[#7FC4D6] text-[0.65rem] font-bold tracking-[0.15em] uppercase">
                    {unit.label}
                  </p>
                  <p className="text-white text-3xl font-extrabold">{unit.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-[#E5E0D5] border-t border-[#E5E0D5]">
                <div className="px-3 py-4">
                  <p className="text-[#8A8F8B] text-[0.6rem] uppercase tracking-wider">Price</p>
                  <p className="text-[#151A19] text-sm font-bold">{unit.price}</p>
                </div>
                <div className="px-3 py-4">
                  <p className="text-[#8A8F8B] text-[0.6rem] uppercase tracking-wider">Plan</p>
                  <p className="text-[#151A19] text-sm font-bold">50/50*</p>
                </div>
                <div className="px-3 py-4">
                  <p className="text-[#8A8F8B] text-[0.6rem] uppercase tracking-wider">DLD Fee</p>
                  <p className="text-[#1C6B82] text-sm font-bold">4%</p>
                </div>
              </div>

              <button
                onClick={() => setShowPopup(true)}
                className="w-full bg-[#F5F1E8] hover:bg-[#EBE5D8] text-[#151A19] font-semibold py-3.5 text-sm transition-colors"
              >
                Register for a {unit.type.toLowerCase()} →
              </button>
            </div>
          ))}
        </div>

        <p className="text-[#8A8F8B] text-xs text-center mt-8">
          Square footage, views and parking are confirmed with Damac's
          official floor plans. Prices, EOI amounts and plan are
          indicative marketing figures awaiting Damac's official terms.
        </p>
      </div>

      {showPopup && <DLPopupModal onClose={() => setShowPopup(false)} />}
    </section>
  );
}
