"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { IoArrowDown } from "react-icons/io5";

const STATS = [
  { value: "292", label: "Villas" },
  { value: "4–6", label: "Bedrooms" },
  { value: "AED 7.9M", label: "From" },
  { value: "5%", label: "Booking" },
];

export default function YRHero({ onOpenDrawer }) {
  return (
    <section className="relative" id="top">
      <div className="relative h-[100vh] min-h-[640px] overflow-hidden bg-[#15130F]">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/yas-riva-reserve/hero/hero-1.webp"
          className="absolute inset-0 w-full h-full object-cover object-[65%_center] sm:object-center scale-105"
        >
          <source src="/assets/yas-riva-reserve/video/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C09] via-[#0E0C09]/10 to-[#0E0C09]/50" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #0E0C09 0%, rgba(14,12,9,0.75) 18%, rgba(14,12,9,0.1) 38%, rgba(14,12,9,0) 55%)",
          }}
        />

        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-5 sm:px-8 flex flex-col justify-end pb-24 sm:pb-28">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/70 text-xs font-semibold tracking-[0.4em] uppercase mb-5 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-[#B08D57]" />
            Yas Island, Abu Dhabi &middot; By Aldar
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-display)] text-white font-medium leading-[0.98] text-[13vw] sm:text-[8vw] lg:text-[6.2rem] mb-6 -ml-1"
          >
            The private
            <br />
            side <span className="italic text-[#D9C098]">of Yas</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 border-t border-white/15 pt-6"
          >
            <p className="text-white/70 text-base sm:text-lg max-w-[360px] leading-relaxed">
              A gated canal-front villa community. Life along the water,
              close to everything Yas Island offers.
            </p>

            <div className="flex flex-col sm:items-end gap-4">
              <div className="flex gap-3">
                <button
                  onClick={onOpenDrawer}
                  className="bg-gradient-to-r from-[#B08D57] to-[#96713F] hover:brightness-110 text-white font-semibold px-7 py-3.5 text-sm tracking-wide transition-all"
                >
                  Register Your Interest
                </button>
                <a
                  href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Yas%20Riva%20Reserve%20by%20Aldar"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-[52px] h-[52px] flex-shrink-0 border border-white/30 hover:border-[#25D366] hover:text-[#25D366] text-white flex items-center justify-center transition-colors"
                >
                  <FaWhatsapp className="text-lg" />
                </a>
              </div>
              <p className="text-white/40 text-xs">
                *Indicative starting price, subject to Aldar's confirmation.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-5 sm:right-8 flex-col items-center gap-3 z-10"
        >
          <span
            className="text-white/40 text-[0.65rem] tracking-[0.3em] uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
          <IoArrowDown className="text-white/40 animate-bounce" />
        </motion.div>
      </div>

      <div className="bg-[#0E0C09] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 grid grid-cols-2 sm:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-5 sm:py-6 ${
                i !== 0 ? "border-l border-white/10" : ""
              } ${i < 2 ? "border-b sm:border-b-0 border-white/10" : ""} px-4 sm:px-6`}
            >
              <p className="font-[family-name:var(--font-display)] text-[#D9C098] text-2xl sm:text-3xl font-semibold">
                {stat.value}
              </p>
              <p className="text-white/50 text-xs uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
