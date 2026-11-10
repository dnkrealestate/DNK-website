"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IoLockClosedOutline, IoArrowForward } from "react-icons/io5";
import { UNIT_TYPES } from "../constants";

export default function PPFloorPlans({ onOpenEnquiry }) {
  const [active, setActive] = useState(0);
  const unit = UNIT_TYPES[active];

  return (
    <section id="floor-plans" className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 scroll-mt-28">
      <p className="text-[#367BA8] text-xs font-bold tracking-[0.25em] uppercase mb-4">
        Floor Plans
      </p>
      <h2 className="font-[family-name:var(--font-display)] text-[#102B46] text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-tight mb-3 max-w-[640px]">
        See the Level of Detail Behind Every Layout
      </h2>
      <p className="text-[#252D36]/55 leading-relaxed mb-8 max-w-[560px]">
        Choose a residence type below to see its advertised layout. Register
        and we&apos;ll send the confirmed Palm Springs plans the moment
        Nakheel releases them.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {UNIT_TYPES.map((u, i) => (
          <button
            key={`${u.label}-${u.sub}`}
            onClick={() => setActive(i)}
            className={`text-left rounded-2xl border p-4 transition-colors ${
              active === i
                ? "bg-[#102B46] border-[#102B46] text-white"
                : "bg-[#F5F8FB] border-[#102B46]/10 text-[#102B46] hover:border-[#367BA8]/40"
            }`}
          >
            <p className="font-semibold text-sm leading-snug">{u.label}</p>
            <p className={`text-xs mt-1 ${active === i ? "text-white/55" : "text-[#252D36]/45"}`}>{u.sub}</p>
          </button>
        ))}
      </div>

      <div className="rounded-[1.75rem] bg-[#F5F8FB] border border-[#102B46]/8 p-3 sm:p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${unit.label}-${unit.sub}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-[1.3fr_1fr] gap-5"
          >
            <div className="relative rounded-[1.25rem] overflow-hidden aspect-[4/3]">
              <Image
                src={unit.floorPlanImage}
                alt={`${unit.floorPlanExact ? "Advertised" : "Sample"} floor plan layout for ${unit.label} (${unit.sub}) at Palm Springs by Nakheel`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <span className="absolute top-3 right-3 bg-[#102B46]/85 text-white text-[0.6rem] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <IoLockClosedOutline /> {unit.floorPlanExact ? "As Advertised" : "Sample Preview"}
              </span>
            </div>

            <div className="flex flex-col justify-center p-2 sm:p-4">
              <p className="text-[#367BA8] text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-1.5">
                {unit.sub} &middot; {unit.floors}
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-[#102B46] text-2xl font-semibold mb-4">
                {unit.label}
              </h3>
              <p className="text-[#252D36]/55 text-sm leading-relaxed mb-7">
                {unit.floorPlanExact
                  ? `This is the advertised layout for the ${unit.label.toLowerCase()} (${unit.sub}). Final specifications remain subject to confirmation by Nakheel.`
                  : `The image shown is a representative layout sample and not the final floor plan for this specific residence type. The confirmed ${unit.bedrooms}-bedroom ${unit.layout.toLowerCase()} plans will be released by Nakheel.`}
              </p>
              <button
                onClick={() =>
                  onOpenEnquiry({
                    eyebrow: `${unit.label} Floor Plans`,
                    title: `Request ${unit.label} Floor Plans`,
                    interest: "Floor Plans",
                    propertyType: `${unit.label} — ${unit.sub}`,
                    ctaLabel: "Request Floor Plans",
                  })
                }
                className="inline-flex items-center justify-center gap-2 bg-[#102B46] hover:bg-[#174A73] text-white font-semibold px-6 py-3.5 rounded-full text-sm transition-colors self-start"
              >
                Request Floor Plans <IoArrowForward />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
