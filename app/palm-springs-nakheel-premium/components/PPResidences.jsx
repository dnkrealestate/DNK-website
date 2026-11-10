"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IoArrowForward } from "react-icons/io5";
import { UNIT_TYPES, aedToUsd } from "../constants";

function formatAed(aed) {
  return `AED ${(aed / 1_000_000).toFixed(1)}M`;
}

function formatArea(sqft, sqm) {
  return `${sqft.toLocaleString(undefined, { maximumFractionDigits: 0 })} sq.ft (${sqm.toLocaleString(undefined, { maximumFractionDigits: 0 })} sq.m)`;
}

export default function PPResidences({ onOpenEnquiry }) {
  const [active, setActive] = useState(0);
  const unit = UNIT_TYPES[active];

  return (
    <section id="residences" className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 scroll-mt-28">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <p className="text-[#367BA8] text-xs font-bold tracking-[0.25em] uppercase mb-4">
            Residences &amp; Architecture
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[#102B46] text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold max-w-[560px] leading-tight">
            Five Ways to Live at Palm Springs.
          </h2>
        </div>
        <p className="text-[#252D36]/55 max-w-[340px] text-sm leading-relaxed">
          Townhouses for families moving up, standalone villas for those who
          want their own plot &mdash; starting from {formatAed(UNIT_TYPES[0].priceAed)}.
        </p>
      </div>

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
            <div className="relative rounded-[1.25rem] overflow-hidden aspect-[4/3] lg:aspect-auto">
              <Image
                src={unit.image}
                alt={`${unit.label} (${unit.sub}) at Palm Springs by Nakheel`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-2 sm:p-4">
              <p className="text-[#367BA8] text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-1.5">
                {unit.sub} &middot; {unit.floors}
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-[#102B46] text-2xl font-semibold mb-3">
                {unit.label}
              </h3>
              <p className="text-[#252D36]/60 leading-relaxed mb-6">{unit.description}</p>

              <div className="divide-y divide-[#102B46]/10 border-y border-[#102B46]/10 mb-7">
                <div className="flex items-center justify-between py-3">
                  <span className="text-[#252D36]/50 text-sm">Bedrooms</span>
                  <span className="font-[family-name:var(--font-body)] font-bold text-[#102B46] text-sm">{unit.bedrooms}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-[#252D36]/50 text-sm">Unit Area</span>
                  <span className="font-[family-name:var(--font-body)] font-bold text-[#102B46] text-sm text-right">
                    {formatArea(unit.areaSqft, unit.areaSqm)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-[#252D36]/50 text-sm">Plot Area</span>
                  <span className="font-[family-name:var(--font-body)] font-bold text-[#102B46] text-sm text-right">
                    {formatArea(unit.plotSqft, unit.plotSqm)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-[#252D36]/50 text-sm">Starting Price</span>
                  <span className="font-[family-name:var(--font-body)] font-bold text-[#102B46] text-sm text-right">
                    {formatAed(unit.priceAed)}
                    <span className="block font-normal text-[#252D36]/40 text-xs">
                      &asymp; ${(aedToUsd(unit.priceAed) / 1_000_000).toFixed(2)}M
                    </span>
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  onOpenEnquiry({
                    eyebrow: `${unit.label} Enquiry`,
                    title: `Register Your Interest — ${unit.label} (${unit.sub})`,
                    interest: "Floor Plans",
                    propertyType: `${unit.label} — ${unit.sub}`,
                    ctaLabel: "Register for This Home",
                  })
                }
                className="inline-flex items-center justify-center gap-2 bg-[#102B46] hover:bg-[#174A73] text-white font-semibold px-6 py-3.5 rounded-full text-sm transition-colors self-start"
              >
                Register for This Home <IoArrowForward />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
