"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import MCContactForm from "./MCContactForm";

export default function MCFinalCTA() {
  return (
    <section className="relative py-12 lg:py-20 px-4 overflow-hidden" id="enquire-footer">
      <Image
        src="/assets/manchester-city-yas/units/unit-5br-foyer.webp"
        alt="Manchester City Yas Residences villa foyer"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#050810]/85" />
      <motion.div
        className="absolute -bottom-32 -right-20 w-[500px] h-[500px] rounded-full bg-[#6CABDD]/20 blur-[130px]"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#6CABDD] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
            <span className="w-8 h-px bg-[#6CABDD]" />
            <span>For Those Who Aspire To More</span>
          </p>
          <h2 className="text-white text-3xl lg:text-4xl font-extrabold mb-5 leading-tight max-w-[560px]">
            Register Your Interest in Manchester City Yas Residences
          </h2>
          <p className="text-white/70 leading-relaxed mb-6 max-w-[520px]">
            Waterfront villas, duplexes &amp; townhouses on Yas Canal —
            from AED 3.5M*, 30/70 payment plan, 5% down payment.
          </p>

          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6CABDD] to-[#4E8FC4] text-[#07101E] font-bold rounded-full px-4 py-2 text-sm mb-7">
            5% Down Payment to Secure Your Unit
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Manchester%20City%20Yas%20Residences%20by%20Ohana"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:brightness-110 text-white font-semibold px-7 py-3.5 rounded-full text-sm flex items-center justify-center gap-2 transition-all"
            >
              <FaWhatsapp /> WhatsApp Us
            </a>
            <a
              href="tel:+971555769195"
              className="border border-white/30 hover:bg-white/10 text-white font-semibold px-7 py-3.5 rounded-full text-sm flex items-center justify-center gap-2 transition-colors"
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
          <div className="bg-[#0A0F1C]/95 backdrop-blur-xl border border-white/15 rounded-3xl p-6 lg:p-7 shadow-2xl shadow-black/50">
            <h3 className="text-white font-bold text-xl mb-1">
              Register My Interest
            </h3>
            <p className="text-white/50 text-xs mb-5">
              Official price list, floor plans and payment plan details — first.
            </p>
            <MCContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
