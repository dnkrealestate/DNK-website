"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import MCContactForm from "./MCContactForm";

const BADGES = [
  { label: "From AED 3.5M*", solid: false },
  { label: "Villas & Townhouses", solid: false },
  { label: "30/70 Plan", solid: false },
  { label: "5% Down Payment", solid: true },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function MCHero() {
  return (
    <section className="relative" id="top">
      <div className="relative min-h-[94vh] lg:min-h-screen overflow-hidden bg-[#050810]">
        <Image
          src="/assets/manchester-city-yas/renders/render-masterplan-aerial.webp"
          alt="Manchester City Yas Residences masterplan, Yas Island, Abu Dhabi"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[22%_58%] sm:object-[35%_50%] lg:object-center scale-105"
        />

        {/* Animated ambient glow blobs */}
        <motion.div
          className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full bg-[#6CABDD]/25 blur-[120px]"
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[480px] h-[480px] rounded-full bg-[#4E8FC4]/20 blur-[110px]"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#050810] via-[#050810]/55 to-transparent" />
        {/* Bottom edge matches #070C16 exactly (the next section's bg) so the
            hero hands off seamlessly instead of showing a hard color seam. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #070C16 0%, rgba(5,8,16,0.85) 25%, rgba(5,8,16,0.3) 50%, rgba(5,8,16,0) 70%, rgba(5,8,16,0.4) 100%)",
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 pt-10 lg:pt-16 pb-12 lg:pb-16 min-h-[94vh] lg:min-h-screen flex flex-col justify-center lg:flex-row lg:items-center gap-10 lg:gap-8 xl:gap-16">
          <div className="flex-1 lg:max-w-[640px]">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="flex items-center gap-3 mb-7"
            >
              <Image
                src="/assets/manchester-city-yas/logos/logo-yas-by-ohana-white.svg"
                alt="Manchester City Yas Residences by Ohana"
                width={472}
                height={127}
                className="h-10 sm:h-12 w-auto"
                priority
              />
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="text-white/70 text-xs font-semibold tracking-[0.3em] uppercase mb-4 flex items-center gap-2"
            >
              <span className="w-6 h-px bg-[#6CABDD]" />
              Yas Canal, Yas Island, Abu Dhabi
            </motion.p>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="text-white font-extrabold leading-[1.03] text-4xl sm:text-5xl lg:text-[3.6rem] mb-4"
            >
              Built for <span className="text-[#6CABDD]">Greatness</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="text-white/70 text-lg sm:text-xl font-medium mb-7 max-w-[520px]"
            >
              Waterfront villas, duplexes &amp; townhouses on Yas Canal — a
              Manchester City–branded collection by Ohana Development.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="flex flex-wrap gap-2.5 mb-7"
            >
              {BADGES.map((badge) => (
                <span
                  key={badge.label}
                  className={`rounded-full px-3 xl:px-4 py-2 text-sm font-semibold backdrop-blur-md ${
                    badge.solid
                      ? "bg-gradient-to-r from-[#6CABDD] to-[#4E8FC4] text-[#07101E]"
                      : "bg-white/10 border border-white/20 text-white"
                  }`}
                >
                  {badge.label}
                </span>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={5}
              className="flex flex-col sm:flex-row gap-3 mb-4"
            >
              <a
                href="#enquire-hero"
                className="bg-gradient-to-r from-[#6CABDD] to-[#4E8FC4] hover:brightness-110 text-[#07101E] font-bold px-7 py-3.5 rounded-full text-sm text-center transition-all"
              >
                Register Your Interest
              </a>
              <a
                href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Manchester%20City%20Yas%20Residences%20by%20Ohana"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 hover:bg-white/10 text-white font-semibold px-7 py-3.5 rounded-full text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <FaWhatsapp /> WhatsApp Your Advisor
              </a>
            </motion.div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={6}
              className="text-white/40 text-xs"
            >
              *Indicative starting price, subject to Ohana Development's official confirmation.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-[320px] xl:w-[400px] flex-shrink-0"
            id="enquire-hero"
          >
            <div className="bg-white/[0.06] backdrop-blur-2xl border border-white/15 rounded-3xl p-6 lg:p-7 shadow-2xl shadow-black/50 max-h-[85vh] overflow-y-auto">
              <h2 className="text-white font-bold text-xl mb-1 text-center">
                Register Before Launch Pricing Closes
              </h2>
              {/* <p className="text-white/50 text-xs mb-5">
                Official price list, floor plans and payment plan details — first.
              </p> */}
              <MCContactForm />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="hidden lg:flex absolute bottom-7 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10"
        >
          <span className="text-white/40 text-[0.65rem] tracking-[0.25em] uppercase">Scroll</span>
          <motion.div
            className="w-[1.5px] h-8 bg-gradient-to-b from-[#6CABDD] to-transparent"
            animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
