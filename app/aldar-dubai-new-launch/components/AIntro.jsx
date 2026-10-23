"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AIntro() {
  return (
    <section className="bg-[#F7F3EB] py-16 sm:py-24 px-5 sm:px-8 scroll-mt-24" id="overview">
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[940/1015] max-w-[420px] mx-auto rounded-sm overflow-hidden shadow-2xl shadow-black/20 border border-[#101820]/10">
            <Image
              src="/assets/aldar-dubai-launch/images/masterplan-pin.webp"
              alt="Aerial masterplan render of the advertised Aldar community, marked with the Aldar pin"
              fill
              sizes="(max-width: 1024px) 60vw, 420px"
              className="object-cover"
            />
          </div>
          {/* <p className="text-[#8A8275] text-xs text-center mt-4 max-w-[420px] mx-auto">
            A first look at Aldar's advertised masterplan &mdash; register
            now and we'll send you the verified site plan the moment it's
            released.
          </p> */}
        </motion.div>

        <div>
          <p className="text-[#A9874F] text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Overview
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-display)] text-[#101820] text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold mb-6 leading-tight"
          >
            A Place to Call Your Own. An Opportunity to Explore.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#5B5547] leading-relaxed mb-5 max-w-[480px]"
          >
            Aldar's newly advertised Dubai launch brings a choice of
            three-bedroom townhouses and villas to market, positioned near
            Al Ain Road (E66) and Sheikh Mohammed Bin Zayed Road (E311),
            within reach of Dubai Silicon Oasis, Academic City and Downtown
            Dubai.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[#5B5547] leading-relaxed mb-8 max-w-[480px]"
          >
            Final project name, location, floor plans and specifications
            are being finalized by Aldar &mdash; register now and our team
            will hand-deliver every verified detail to you first.
          </motion.p>

          <button
            onClick={() => document.getElementById("residences")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 bg-[#101820] hover:bg-[#071321] text-white font-semibold px-7 py-3.5 rounded-sm text-sm transition-colors"
          >
            Discover Your Residence
          </button>
        </div>
      </div>
    </section>
  );
}
