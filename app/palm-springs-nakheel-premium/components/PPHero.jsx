"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoArrowForward, IoDownloadOutline } from "react-icons/io5";
import { PRICE_USD_MIN, PRICE_AED_MIN } from "../constants";

export default function PPHero({ onOpenEnquiry }) {
  return (
    <section id="overview" className="relative mx-4 sm:mx-6 lg:mx-10 mt-4 scroll-mt-32">
      <motion.div
        initial={{ opacity: 0, scale: 1.01 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-[500px] sm:min-h-[580px] lg:min-h-[660px] rounded-[1.75rem] sm:rounded-[2.5rem] overflow-hidden"
      >
        <Image
          src="/assets/palm-springs-nakheel/images/hero-waterfront-sunset.png"
          alt="Palm Springs by Nakheel, Dubai, at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D30] from-0% via-[#0A1D30]/55 via-35% to-transparent to-80%" />

        <div className="relative h-full flex flex-col justify-end px-5 pt-20 pb-2 sm:px-9 sm:pt-9 sm:pb-3 lg:px-12 lg:pt-60 lg:pb-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-2 self-start mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8DB6D3]" />
            <span className="text-white text-[0.65rem] font-bold tracking-[0.2em] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
              Pre-Launch &middot; New Nakheel Community
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-[family-name:var(--font-display)] text-white text-[1.6rem] sm:text-3xl lg:text-[2.75rem] font-semibold leading-normal sm:leading-relaxed max-w-[640px] mb-5"
          >
            Palm Springs by Nakheel in Jebel Ali, Dubai
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-t border-white/15 pt-4"
          >
            <p className="text-white text-xs sm:text-sm leading-relaxed max-w-[400px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
              Townhouses and villas by Nakheel, near Palm Jebel Ali, expected
              from $1.03M. Register now for the first release.
            </p>

            <div className="rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-3 flex-shrink-0">
              <p className="text-white/45 text-[0.55rem] font-semibold tracking-[0.2em] uppercase mb-0.5">
                Starting From
              </p>
              <p className="font-[family-name:var(--font-body)] text-white text-2xl sm:text-3xl font-extrabold tabular-nums">
                ${(PRICE_USD_MIN / 1_000_000).toFixed(2)}M
              </p>
              <p className="text-white/40 text-[0.65rem] mt-0.5 tabular-nums">
                &asymp; AED {(PRICE_AED_MIN / 1_000_000).toFixed(1)}M &middot; as advertised
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-2.5 mt-5"
          >
            <button
              onClick={() => document.getElementById("residences")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#DCEAF4] text-[#102B46] font-semibold px-5 py-3 rounded-full text-[0.7rem] tracking-[0.08em] uppercase transition-colors"
            >
              Explore the Project <IoArrowForward className="text-sm" />
            </button>
            <button
              onClick={() =>
                onOpenEnquiry({ title: "Request the Brochure", interest: "Brochure", ctaLabel: "Get the Brochure" })
              }
              className="inline-flex items-center gap-2 border border-white/40 hover:border-white text-white font-semibold px-5 py-3 rounded-full text-[0.7rem] tracking-[0.08em] uppercase transition-colors"
            >
              Download Brochure <IoDownloadOutline className="text-sm" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
