"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoArrowForward, IoDownloadOutline } from "react-icons/io5";
import { PRICE_USD_MIN, PRICE_AED_MIN } from "../constants";

export default function PPHero({ onOpenEnquiry }) {
  return (
    <section
      id="overview"
      className="relative mx-4 sm:mx-6 lg:mx-10 scroll-mt-32"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-[72dvh] sm:min-h-[80dvh] rounded-[1.75rem] sm:rounded-[2.5rem] overflow-hidden"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/assets/palm-springs-nakheel/images/hero-waterfront-sunset.png"
            alt="Waterfront villas at Palm Springs by Nakheel, Dubai, at sunset"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D30]/85 via-[#0A1D30]/20 to-transparent" />

        <div className="relative h-full flex flex-col justify-end p-6 sm:p-12 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 self-start mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8DB6D3]" />
            <span className="text-white text-xs font-bold tracking-[0.25em] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
              Exclusive Waterfront Collection
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-[family-name:var(--font-display)] text-white text-[2.2rem] sm:text-5xl lg:text-[3.6rem] font-semibold leading-[1.08] max-w-[720px] mb-5"
          >
            Discover a New Expression of Waterfront Luxury.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-white text-xs font-bold tracking-[0.25em] uppercase mb-7 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
          >
            Palm Springs by Nakheel
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-t border-white/15 pt-6"
          >
            <p className="text-white text-sm sm:text-base leading-relaxed max-w-[440px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
              Experience refined waterfront living in one of Dubai&apos;s
              distinctive residential destinations &mdash; presented by DNK
              Real Estate with direct access to Nakheel.
            </p>

            <div className="rounded-[1.25rem] bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-4 flex-shrink-0">
              <p className="text-white/45 text-[0.6rem] font-semibold tracking-[0.2em] uppercase mb-1">
                Starting From
              </p>
              <p className="font-[family-name:var(--font-body)] text-white text-3xl sm:text-4xl font-extrabold tabular-nums">
                ${(PRICE_USD_MIN / 1_000_000).toFixed(2)}M
              </p>
              <p className="text-white/40 text-xs mt-1 tabular-nums">
                &asymp; AED {(PRICE_AED_MIN / 1_000_000).toFixed(1)}M &middot; as advertised
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap items-center gap-3 mt-7"
          >
            <button
              onClick={() => document.getElementById("residences")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#DCEAF4] text-[#102B46] font-semibold px-7 py-4 rounded-full text-xs tracking-[0.1em] uppercase transition-colors"
            >
              Explore the Project <IoArrowForward />
            </button>
            <button
              onClick={() =>
                onOpenEnquiry({ title: "Request the Brochure", interest: "Brochure", ctaLabel: "Get the Brochure" })
              }
              className="inline-flex items-center gap-2 border border-white/40 hover:border-white text-white font-semibold px-7 py-4 rounded-full text-xs tracking-[0.1em] uppercase transition-colors"
            >
              Download Brochure <IoDownloadOutline />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
