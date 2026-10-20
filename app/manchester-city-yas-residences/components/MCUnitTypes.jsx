"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import MCPopupModal from "./MCPopupModal";

const UNITS = [
  {
    type: "Townhouse",
    beds: "2 Bedrooms",
    price: "AED 3,750,000",
    bua: "1,938 sq ft",
    plot: "2,045 sq ft",
    image: "/assets/manchester-city-yas/units/unit-townhouse-2br-front.webp",
  },
  {
    type: "Townhouse",
    beds: "3 Bedrooms",
    price: "AED 4,600,000",
    bua: "2,228 sq ft",
    plot: "2,556 sq ft",
    image: "/assets/manchester-city-yas/units/unit-apartments-exterior.webp",
  },
  {
    type: "Duplex",
    beds: "3 Bedrooms",
    price: "AED 5,250,000",
    bua: "2,325 sq ft",
    plot: "2,691 sq ft",
    image: "/assets/manchester-city-yas/units/unit-duplex-front.webp",
  },
  {
    type: "Villa",
    beds: "4 Bedrooms",
    price: "AED 7,750,000",
    bua: "3,348 sq ft",
    plot: "4,306 sq ft",
    image: "/assets/manchester-city-yas/units/unit-4br-pool.webp",
  },
  {
    type: "Villa",
    beds: "5 Bedrooms",
    price: "AED 10,700,000",
    bua: "4,887 sq ft",
    plot: "6,458 sq ft",
    image: "/assets/manchester-city-yas/units/unit-5br-formal-living.webp",
  },
];

export default function MCUnitTypes() {
  const [activeUnit, setActiveUnit] = useState(null);

  return (
    <section className="bg-[#0A0F1C] pt-5 pb-12 lg:pb-20 px-4" id="residences">
      <div className="max-w-[1280px] mx-auto">
        <p className="text-[#6CABDD] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
          <span>02</span>
          <span className="w-8 h-px bg-[#6CABDD]" />
          <span>The Residences</span>
        </p>
        <h2 className="text-white text-3xl lg:text-4xl font-extrabold mb-4 max-w-[640px]">
          Luxury Waterfront Villas &amp; Townhouses
        </h2>
        <p className="text-white/60 max-w-[680px] mb-10 leading-relaxed">
          Five residence types across townhouses, duplexes and villas, each
          with private outdoor space on Yas Canal. Sizes and prices below
          are sourced from Ohana Development's official listing.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {UNITS.map((unit, i) => (
            <motion.div
              key={`${unit.type}-${unit.beds}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 * (i % 3) }}
              className="group rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-[#6CABDD]/40 transition-colors"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={unit.image}
                  alt={`${unit.beds} ${unit.type} at Manchester City Yas Residences`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white text-2xl font-extrabold mb-0">{unit.beds}</p>
                  <p className="text-[#6CABDD] text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-2">
                    {unit.type}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10">
                <div className="px-3 py-4">
                  <p className="text-white/40 text-[0.6rem] uppercase tracking-wider">Price</p>
                  <p className="text-white text-xs font-bold">{unit.price}</p>
                </div>
                <div className="px-3 py-4">
                  <p className="text-white/40 text-[0.6rem] uppercase tracking-wider">Sellable</p>
                  <p className="text-white text-xs font-bold">{unit.bua}</p>
                </div>
                <div className="px-3 py-4">
                  <p className="text-white/40 text-[0.6rem] uppercase tracking-wider">Plot</p>
                  <p className="text-white text-xs font-bold">{unit.plot}</p>
                </div>
              </div>

              <button
                onClick={() => setActiveUnit(unit)}
                className="w-full bg-white/[0.04] hover:bg-[#6CABDD]/10 text-white font-semibold py-3.5 text-sm transition-colors"
              >
                Register for this {unit.type.toLowerCase()} →
              </button>
            </motion.div>
          ))}
        </div>

        <p className="text-white/30 text-xs text-center mt-8">
          Prices and sizes per Ohana Development's official listing. Final
          unit allocation, floor plans and plot sizes are confirmed at SPA
          signing.
        </p>
      </div>

      {activeUnit && (
        <MCPopupModal
          onClose={() => setActiveUnit(null)}
          unitLabel={`${activeUnit.beds} ${activeUnit.type}`}
        />
      )}
    </section>
  );
}
