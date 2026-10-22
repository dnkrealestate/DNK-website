"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const AMENITIES = [
  { name: "Residents-Only Clubhouse", image: "/assets/yas-riva-reserve/amenities/feature-1.webp" },
  { name: "Adult & Kids' Pools", image: "/assets/yas-riva-reserve/amenities/feature-2.webp" },
  { name: "Padel Courts & Table Tennis", image: "/assets/yas-riva-reserve/amenities/feature-3.webp" },
  { name: "Canal Viewing Deck", image: "/assets/yas-riva-reserve/amenities/waterfront-terrace.webp" },
  { name: "Cycling & Jogging Tracks", image: "/assets/yas-riva-reserve/amenities/linear-parks.webp" },
  { name: "Community Mosque", image: "/assets/yas-riva-reserve/amenities/feature-4.webp" },
  { name: "Café & Mini Mart", image: "/assets/yas-riva-reserve/amenities/feature-5.webp" },
  { name: "Hobby Garden", image: "/assets/yas-riva-reserve/amenities/hobby-garden.webp" },
  { name: "Kids' Play Areas", image: "/assets/yas-riva-reserve/amenities/feature-6.webp" },
  { name: "Parks & Pocket Gardens", image: "/assets/yas-riva-reserve/renders/overview-parks.webp" },
];

export default function YRAmenities() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#15130F] py-16 lg:py-28 px-5 sm:px-8" id="amenities">
      <div className="max-w-[1400px] mx-auto">
        <p className="text-[#D9C098] text-xs font-bold tracking-[0.2em] uppercase mb-3">
          04 &mdash; Amenities
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-white text-3xl sm:text-5xl font-semibold mb-12 max-w-[640px] leading-tight">
          A resort of your own, behind the gate
        </h2>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          <div>
            {AMENITIES.map((amenity, i) => (
              <button
                key={amenity.name}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`w-full flex items-center gap-5 py-4 border-b text-left transition-colors ${
                  active === i ? "border-[#B08D57]" : "border-white/10"
                }`}
              >
                <span
                  className={`font-[family-name:var(--font-display)] text-lg w-9 flex-shrink-0 ${
                    active === i ? "text-[#D9C098]" : "text-white/30"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-lg sm:text-xl transition-colors ${
                    active === i ? "text-white font-medium" : "text-white/50"
                  }`}
                >
                  {amenity.name}
                </span>
              </button>
            ))}
          </div>

          <div className="relative aspect-[4/3] lg:sticky lg:top-24 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0"
              >
                <Image
                  src={AMENITIES[active].image}
                  alt={`${AMENITIES[active].name} at Yas Riva Reserve`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="text-white/30 text-xs text-center mt-12">
          Amenities as shown in Aldar's official Yas Riva Reserve marketing.
          Final specifications are confirmed by the developer.
        </p>
      </div>
    </section>
  );
}
