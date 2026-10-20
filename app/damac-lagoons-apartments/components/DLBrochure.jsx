"use client";

import React, { useState } from "react";
import Image from "next/image";
import DLPopupModal from "./DLPopupModal";

const POINTS = [
  "Architecture & Interiors",
  "Studio & 1-Bedroom Residences",
  "Cluster Plan & Location",
];

export default function DLBrochure() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section className="bg-[#F5F1E8] pb-16 lg:pb-24 px-4">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p className="text-[#1C6B82] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
            <span>04</span>
            <span className="w-8 h-px bg-[#1C6B82]" />
            <span>Brochure</span>
          </p>
          <h2 className="text-[#151A19] text-3xl lg:text-4xl font-extrabold mb-4">
            The Sorrento Brochure
          </h2>
          <p className="text-[#5B6460] mb-6 leading-relaxed">
            Discover the architecture, residences, surroundings and launch
            details.
          </p>
          <ul className="space-y-2 mb-8">
            {POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-[#151A19] text-sm font-semibold">
                <span className="text-[#1C6B82]">✓</span> {point.toUpperCase()}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-[#1C6B82] hover:bg-[#17596C] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-colors"
          >
            Request the Brochure
          </button>
          <p className="text-[#8A8F8B] text-xs mt-3">
            The official brochure is shared with you right after your
            request.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative w-[260px] aspect-[3/4] [transform:perspective(1000px)_rotateY(-18deg)_rotateX(4deg)] shadow-2xl shadow-black/30 rounded-lg overflow-hidden border border-black/10">
            <Image
              src="/assets/damac-lagoons/hero-poster.webp"
              alt="Sorrento Lagoon Views brochure cover"
              fill
              sizes="260px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-6 text-center px-4">
              <p className="text-white text-xl font-serif italic">Welcome to</p>
              <p className="text-white text-2xl font-extrabold">Bellissimo</p>
              <p className="text-white text-xl font-serif italic">living</p>
            </div>
          </div>
        </div>
      </div>

      {showPopup && <DLPopupModal onClose={() => setShowPopup(false)} />}
    </section>
  );
}
