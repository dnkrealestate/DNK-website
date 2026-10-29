"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PSIntro() {
  return (
    <section className="bg-[#F7F5EF] py-16 sm:py-24 px-5 sm:px-8 scroll-mt-24" id="vision">
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[16/10] rounded-sm overflow-hidden shadow-2xl shadow-black/10 border border-[#1C211F]/10">
            <Image
              src="/assets/palm-springs-nakheel/images/villas-exterior-sunset.png"
              alt="Row of contemporary villas with landscaped gardens at sunset, representative imagery for Palm Springs by Nakheel"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-10 h-10 border-b-2 border-r-2 border-[#C6A66B] hidden sm:block" />
        </motion.div>

        <div>
          <p className="text-[#A9874F] text-xs font-bold tracking-[0.2em] uppercase mb-3">
            The Vision
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-display)] text-[#1C211F] text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold mb-6 leading-tight"
          >
            A Distinctive Expression of Modern Dubai Living
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#4B534E] leading-relaxed mb-5 max-w-[480px]"
          >
            Palm Springs by Nakheel introduces an exciting new residential vision in Dubai, with a planned collection of townhouses and villas designed for modern living. Set in the Jebel Ali area, near Palm Jebel Ali, the development offers an opportunity to explore a new address in one of Dubai’s growing residential destinations.

          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[#4B534E] leading-relaxed mb-8 max-w-[480px]"
          >
            Register your interest to receive the latest confirmed details on residences, floor plans, prices and payment plans as soon as they are announced. Be among the first to discover what Palm Springs has to offer.
          </motion.p>

          <button
            onClick={() => document.getElementById("residences")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 bg-[#011945] hover:bg-[#0A2458] text-white font-semibold px-7 py-3.5 rounded-sm text-sm transition-colors"
          >
            Discover the Residences
          </button>
        </div>
      </div>
    </section>
  );
}
