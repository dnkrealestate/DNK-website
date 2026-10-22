"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import YRPopupModal from "./YRPopupModal";

const UNITS = [
  {
    type: "Inland Villa",
    beds: "4 BR",
    price: "AED 7,900,000",
    bua: "437 sqm",
    plot: "711 sqm",
    units: "96 units",
    image: "/assets/yas-riva-reserve/units/unit-4br-inland.webp",
  },
  {
    type: "Inland Villa",
    beds: "5 BR",
    price: "AED 9,300,000",
    bua: "482 sqm",
    plot: "828 sqm",
    units: "116 units",
    image: "/assets/yas-riva-reserve/units/unit-5br-inland.webp",
  },
  {
    type: "Inland Villa",
    beds: "6 BR",
    price: "AED 10,500,000",
    bua: "538 sqm",
    plot: "936 sqm",
    units: "35 units",
    image: "/assets/yas-riva-reserve/units/unit-6br-inland.webp",
  },
  {
    type: "Waterfront Villa",
    beds: "5 BR",
    price: "AED 13,300,000",
    bua: "552 sqm",
    plot: "802 sqm",
    units: "17 units",
    image: "/assets/yas-riva-reserve/units/villa-5br-rear.webp",
  },
  {
    type: "Waterfront Villa",
    beds: "6 BR",
    price: "AED 14,500,000",
    bua: "609 sqm",
    plot: "1,294 sqm",
    units: "28 units",
    image: "/assets/yas-riva-reserve/units/villa-6br-rear.webp",
  },
];

export default function YRUnitTypes() {
  const [activeUnit, setActiveUnit] = useState(null);
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);

  const updateCurrent = () => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    if (!card) return;
    const cardWidth = card.offsetWidth + 24;
    setCurrent(Math.round(el.scrollLeft / cardWidth));
  };

  useEffect(() => {
    updateCurrent();
  }, []);

  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const cardWidth = card ? card.offsetWidth + 24 : 400;
    el.scrollTo({ left: i * cardWidth, behavior: "smooth" });
  };

  return (
    <section className="bg-[#0E0C09] py-16 lg:py-28" id="villas">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-[#D9C098] text-xs font-bold tracking-[0.2em] uppercase mb-3">
            02 &mdash; The Villas
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-white text-3xl sm:text-5xl font-semibold max-w-[560px] leading-tight">
            Five ways to live on the canal
          </h2>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => goTo(Math.max(current - 1, 0))}
            aria-label="Previous villa"
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#B08D57] transition-colors"
          >
            <IoArrowBack />
          </button>
          <button
            onClick={() => goTo(Math.min(current + 1, UNITS.length - 1))}
            aria-label="Next villa"
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#B08D57] transition-colors"
          >
            <IoArrowForward />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={updateCurrent}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 px-5 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {UNITS.map((unit) => (
          <div
            key={`${unit.type}-${unit.beds}`}
            data-card
            className="snap-start flex-shrink-0 w-[86vw] sm:w-[520px] border border-white/10"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={unit.image}
                alt={`${unit.beds} ${unit.type} at Yas Riva Reserve`}
                fill
                sizes="(max-width: 640px) 86vw, 520px"
                className="object-cover"
              />
              <span className="absolute top-4 left-4 bg-[#0E0C09]/80 text-white text-[0.65rem] font-semibold px-3 py-1.5">
                {unit.units}
              </span>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-[#D9C098] text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-1">
                {unit.type}
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-white text-3xl font-semibold mb-5">
                {unit.beds}
              </h3>

              <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-white/10">
                <div>
                  <p className="text-white/40 text-[0.6rem] uppercase tracking-wider">Price</p>
                  <p className="text-white text-sm font-bold">{unit.price}</p>
                </div>
                <div>
                  <p className="text-white/40 text-[0.6rem] uppercase tracking-wider">Built-up</p>
                  <p className="text-white text-sm font-bold">{unit.bua}</p>
                </div>
                <div>
                  <p className="text-white/40 text-[0.6rem] uppercase tracking-wider">Plot</p>
                  <p className="text-white text-sm font-bold">{unit.plot}</p>
                </div>
              </div>

              <button
                onClick={() => setActiveUnit(unit)}
                className="flex items-center gap-2 text-white hover:text-[#D9C098] text-sm font-semibold transition-colors"
              >
                Register for this villa <IoArrowForward />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 flex items-center gap-2 mt-8">
        {UNITS.map((u, i) => (
          <button
            key={u.beds + u.type}
            onClick={() => goTo(i)}
            aria-label={`Go to villa ${i + 1}`}
            className={`h-[3px] transition-all ${
              i === current ? "w-8 bg-[#D9C098]" : "w-4 bg-white/20"
            }`}
          />
        ))}
      </div>

      <p className="text-white/30 text-xs text-center mt-8 px-5">
        Prices and sizes per Aldar's official listing. Final unit
        allocation and floor plans are confirmed at the time of booking.
      </p>

      {activeUnit && (
        <YRPopupModal
          onClose={() => setActiveUnit(null)}
          unitLabel={`${activeUnit.beds} ${activeUnit.type}`}
        />
      )}
    </section>
  );
}
