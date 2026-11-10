"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  IoLocationOutline,
  IoHomeOutline,
  IoPricetagOutline,
  IoCalendarOutline,
} from "react-icons/io5";
import { PRICE_USD_MIN, PRICE_AED_MIN } from "../constants";

const STATS = [
  { label: "Developer", value: "Nakheel", logo: true },
  { icon: IoLocationOutline, label: "Location", value: "Dubai, UAE" },
  { icon: IoHomeOutline, label: "Property Configuration", value: "3, 4 & 5 Bedroom" },
  {
    icon: IoPricetagOutline,
    label: "Starting Price",
    value: `$${(PRICE_USD_MIN / 1_000_000).toFixed(2)}M`,
    sub: `AED ${(PRICE_AED_MIN / 1_000_000).toFixed(1)}M`,
  },
  { icon: IoCalendarOutline, label: "Payment Plan", value: "60% / 40%" },
];

export default function PPStats() {
  return (
    <section className="px-4 sm:px-6 lg:px-10 pb-10 sm:pb-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="rounded-[1.75rem] sm:rounded-[2rem] border border-[#102B46]/10 grid grid-cols-2 sm:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-[#102B46]/10"
      >
        {STATS.map((s) => (
          <div key={s.label} className="p-5 sm:p-6">
            {s.logo ? (
              <Image
                src="/assets/palm-springs-nakheel/logos/nakheel-logo-ink.webp"
                alt="Nakheel"
                width={3840}
                height={667}
                className="h-4 sm:h-[1.1rem] w-auto mb-2.5"
              />
            ) : (
              <s.icon className="text-[#367BA8] text-lg mb-2.5" />
            )}
            <p className="text-[#252D36]/40 text-[0.6rem] font-semibold tracking-[0.15em] uppercase mb-1">
              {s.label}
            </p>
            <p className="font-[family-name:var(--font-body)] text-[#102B46] text-base sm:text-lg font-extrabold">
              {s.value}
            </p>
            {s.sub && <p className="text-[#252D36]/35 text-xs mt-0.5 tabular-nums">{s.sub}</p>}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
