"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PRICE_USD_MIN, PRICE_USD_MAX, PRICE_AED_MIN, PRICE_AED_MAX } from "../constants";

const RESIDENCES = [
  {
    type: "Townhouses",
    bedrooms: "3 & 4 Bedroom",
    image: "/assets/palm-springs-nakheel/images/townhouses-row-exterior.png",
  },
  {
    type: "Villas",
    bedrooms: "4 & 5 Bedroom",
    image: "/assets/palm-springs-nakheel/images/villa-exterior-garden.jpg",
  },
];

export default function PPResidences({ onOpenEnquiry }) {
  return (
    <section id="residences" className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 scroll-mt-28">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <p className="text-[#367BA8] text-xs font-bold tracking-[0.25em] uppercase mb-4">
            Residences &amp; Architecture
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[#102B46] text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold max-w-[560px] leading-tight">
            Spaces Designed Around the Way You Live
          </h2>
        </div>
        <p className="text-[#252D36]/55 max-w-[340px] text-sm leading-relaxed">
          Two residence collections, priced from ${(PRICE_USD_MIN / 1_000_000).toFixed(2)}M to $
          {(PRICE_USD_MAX / 1_000_000).toFixed(2)}M across the community.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {RESIDENCES.map((res, i) => (
          <motion.div
            key={res.type}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative rounded-[1.75rem] overflow-hidden aspect-[4/5]"
          >
            <Image
              src={res.image}
              alt={`${res.type} at Palm Springs by Nakheel`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D30]/90 via-[#0A1D30]/10 to-transparent" />

            <div className="absolute bottom-4 inset-x-4 sm:bottom-5 sm:inset-x-5 rounded-[1.5rem] bg-white/90 backdrop-blur-xl border border-white/60 p-5 sm:p-6">
              <p className="text-[#367BA8] text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-1.5">
                {res.bedrooms}
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-[#102B46] text-2xl font-semibold mb-3">
                {res.type}
              </h3>
              <p className="text-[#252D36]/55 text-xs mb-4 tabular-nums">
                Within the advertised ${(PRICE_USD_MIN / 1_000_000).toFixed(2)}M&ndash;$
                {(PRICE_USD_MAX / 1_000_000).toFixed(2)}M range
                <span className="block text-[#252D36]/35">
                  (AED {(PRICE_AED_MIN / 1_000_000).toFixed(1)}M&ndash;{(PRICE_AED_MAX / 1_000_000).toFixed(0)}M)
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() =>
                    onOpenEnquiry({
                      eyebrow: `${res.type} Enquiry`,
                      title: `Request ${res.type} Floor Plans`,
                      interest: "Floor Plans",
                      propertyType: res.type,
                      ctaLabel: `Request ${res.type} Floor Plans`,
                    })
                  }
                  className="flex-1 bg-[#102B46] hover:bg-[#174A73] text-white font-semibold px-4 py-2.5 rounded-full text-xs text-center transition-colors"
                >
                  Request Floor Plans
                </button>
                <button
                  onClick={() =>
                    onOpenEnquiry({
                      eyebrow: `${res.type} Enquiry`,
                      title: `Enquire About ${res.type}`,
                      interest: "Pricing",
                      propertyType: res.type,
                      ctaLabel: "Enquire About Availability",
                    })
                  }
                  className="flex-1 border border-[#102B46]/20 hover:border-[#367BA8] text-[#102B46] font-semibold px-4 py-2.5 rounded-full text-xs text-center transition-colors"
                >
                  Check Availability
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
