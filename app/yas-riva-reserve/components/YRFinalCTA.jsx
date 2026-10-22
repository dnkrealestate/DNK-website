"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import YRContactForm from "./YRContactForm";

export default function YRFinalCTA() {
  return (
    <section className="relative py-16 lg:py-28 px-5 sm:px-8 overflow-hidden" id="enquire-footer">
      <Image
        src="/assets/yas-riva-reserve/hero/hero-3.webp"
        alt="Yas Riva Reserve villa at dusk"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#0E0C09]/85" />

      <div className="relative max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#D9C098] text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-[#D9C098]" />
            Close To Everything, Away From Everyone
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-white text-4xl sm:text-6xl font-semibold mb-6 leading-[1.05] max-w-[560px]">
            Register your interest
          </h2>
          <p className="text-white/70 leading-relaxed mb-8 max-w-[460px]">
            Gated canal-front villas by Aldar on Yas Island &mdash; from AED
            7.9M*, 5% on booking, 5-year service charge waiver.
          </p>

          <div className="flex gap-3">
            <a
              href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Yas%20Riva%20Reserve%20by%20Aldar"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:brightness-110 text-white font-semibold px-7 py-3.5 text-sm flex items-center justify-center gap-2 transition-all"
            >
              <FaWhatsapp /> WhatsApp Us
            </a>
            <a
              href="tel:+971555769195"
              className="border border-white/30 hover:bg-white/10 text-white font-semibold px-7 py-3.5 text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <FaPhoneAlt className="text-xs" /> Call DNK Real Estate
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-[#15130F]/95 backdrop-blur-xl border border-white/15 p-6 lg:p-8">
            <h3 className="font-[family-name:var(--font-display)] text-white font-semibold text-2xl mb-1">
              Register My Interest
            </h3>
            <p className="text-white/50 text-xs mb-6">
              Official price list, floor plans and payment plan details — first.
            </p>
            <YRContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
