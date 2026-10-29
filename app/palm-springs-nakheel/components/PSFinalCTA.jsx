"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import PSEnquiryForm from "./PSEnquiryForm";

export default function PSFinalCTA() {
  return (
    <section className="relative bg-[#011945] py-16 sm:py-24 px-5 sm:px-8 overflow-hidden scroll-mt-24" id="contact">
      <Image
        src="/assets/palm-springs-nakheel/images/interior-living-sunset-view.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-[#011945]/92" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#C6A66B]/[0.08] via-transparent to-transparent" />

      <div className="relative max-w-[1100px] mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#C6A66B] text-xs font-bold tracking-[0.2em] uppercase mb-3 flex items-center gap-3">
            <span className="w-8 h-px bg-[#C6A66B]" />
            Private Consultation
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-white text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
            Experience the Possibilities
          </h2>
          <p className="text-white/60 leading-relaxed mb-8 max-w-[440px]">
            Speak with our team to receive the latest verified project
            information and arrange a personalised consultation &mdash; no
            obligation.
          </p>
          <ul className="space-y-3 text-white/50 text-sm">
            <li className="flex items-center gap-2.5">
              <span className="w-1 h-1 rounded-full bg-[#C6A66B]" /> Verified pricing as it's confirmed
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-1 h-1 rounded-full bg-[#C6A66B]" /> Floor plans sent directly to you
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-1 h-1 rounded-full bg-[#C6A66B]" /> A dedicated advisor guiding you end-to-end
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-1 h-1 rounded-full bg-[#C6A66B]" /> No cost, no obligation to purchase
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#010D30] border border-white/10 rounded-sm p-6 sm:p-8"
        >
          <PSEnquiryForm heading="Request Information" />
        </motion.div>
      </div>
    </section>
  );
}
