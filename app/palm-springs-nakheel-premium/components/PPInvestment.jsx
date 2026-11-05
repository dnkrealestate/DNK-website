"use client";

import React from "react";
import { motion } from "framer-motion";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { PRICE_USD_MIN, PRICE_USD_MAX, PRICE_AED_MIN, PRICE_AED_MAX, AED_TO_USD_RATE } from "../constants";

const HIGHLIGHTS = [
  "Developed by Nakheel, one of Dubai's most established master developers",
  "Positioned along Dubai's wider Jebel Ali growth corridor",
  "3 & 4 bedroom townhouses and 4 & 5 bedroom villas, as advertised",
];

export default function PPInvestment({ onOpenEnquiry }) {
  return (
    <section id="investment" className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 scroll-mt-28">
      <div className="rounded-[1.75rem] sm:rounded-[2rem] bg-[#102B46] text-white p-8 sm:p-14 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <p className="text-[#8DB6D3] text-xs font-bold tracking-[0.25em] uppercase mb-4">Investment</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold leading-tight mb-6">
            An Opportunity Beyond Ordinary.
          </h2>
          <p className="text-white/60 leading-relaxed mb-8 max-w-[440px]">
            Palm Springs is advertised from AED {(PRICE_AED_MIN / 1_000_000).toFixed(1)}M to AED{" "}
            {(PRICE_AED_MAX / 1_000_000).toFixed(0)}M. Payment plan terms have not yet been
            released by Nakheel &mdash; register and we will send you the
            confirmed structure the moment it's available.
          </p>
          <ul className="space-y-3 mb-9">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm text-white/75">
                <IoCheckmarkCircleOutline className="text-[#8DB6D3] text-lg flex-shrink-0 mt-0.5" />
                {h}
              </li>
            ))}
          </ul>
          <button
            onClick={() =>
              onOpenEnquiry({
                eyebrow: "Investment",
                title: "Request the Payment Plan",
                interest: "Payment Plan",
                ctaLabel: "Request the Payment Plan",
              })
            }
            className="bg-[#8DB6D3] hover:brightness-110 text-[#102B46] font-bold px-7 py-3.5 rounded-full text-sm transition-all"
          >
            Request the Payment Plan
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[1.75rem] bg-white/10 backdrop-blur-xl border border-white/10 p-8 sm:p-10"
        >
          <p className="text-white/50 text-xs font-semibold tracking-[0.15em] uppercase mb-2">Starting From</p>
          <p className="font-[family-name:var(--font-body)] text-5xl sm:text-6xl font-extrabold tabular-nums mb-2">
            ${(PRICE_USD_MIN / 1_000_000).toFixed(2)}M
          </p>
          <p className="text-white/40 text-sm tabular-nums mb-8">
            &asymp; AED {(PRICE_AED_MIN / 1_000_000).toFixed(1)}M &middot; up to ${(PRICE_USD_MAX / 1_000_000).toFixed(2)}M
            (AED {(PRICE_AED_MAX / 1_000_000).toFixed(0)}M)
          </p>
          <div className="pt-6 border-t border-white/10">
            <p className="text-white/35 text-xs leading-relaxed">
              USD figures are an approximate conversion at the fixed AED/USD
              peg of {AED_TO_USD_RATE}, for reference only. Prices as
              advertised and subject to confirmation by Nakheel.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
