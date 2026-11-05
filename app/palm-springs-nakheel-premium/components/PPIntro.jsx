"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PPIntro() {
  return (
    <section className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
      <div className="grid lg:grid-cols-3 gap-5 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[1.75rem] sm:rounded-[2rem] bg-[#102B46] text-white p-8 sm:p-10 min-h-[320px] flex flex-col justify-between overflow-hidden"
        >
          <svg
            className="absolute -right-10 -bottom-10 w-48 h-48 opacity-20"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="100" cy="100" r="99" stroke="#8DB6D3" strokeWidth="1" />
            <circle cx="100" cy="100" r="70" stroke="#8DB6D3" strokeWidth="1" />
          </svg>
          <p className="text-[#8DB6D3] text-xs font-bold tracking-[0.25em] uppercase relative">
            By the Numbers
          </p>
          <div className="relative space-y-5">
            <div>
              <p className="font-[family-name:var(--font-body)] text-7xl sm:text-8xl font-extrabold leading-none mb-3">
                2
              </p>
              <p className="text-white text-base font-semibold mb-1">Residence Collections</p>
              <p className="text-white/50 text-sm">Townhouses &amp; Villas</p>
            </div>
            <div className="pt-4 border-t border-white/15 grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/40 text-[0.6rem] font-semibold tracking-[0.15em] uppercase mb-1">Unit Types</p>
                <p className="text-white text-sm font-semibold">Townhouses, Villas</p>
              </div>
              <div>
                <p className="text-white/40 text-[0.6rem] font-semibold tracking-[0.15em] uppercase mb-1">Bedrooms</p>
                <p className="text-white text-sm font-semibold">3, 4 &amp; 5 BR</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col justify-center py-4 lg:py-0">
          <p className="text-[#367BA8] text-xs font-bold tracking-[0.25em] uppercase mb-4">
            Who We Are
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-display)] text-[#102B46] text-3xl sm:text-4xl font-semibold leading-tight mb-5"
          >
            Discover Palm Springs.
          </motion.h2>
          <p className="text-[#252D36]/60 leading-relaxed mb-4">
            Palm Springs is Nakheel&apos;s newest residential vision for
            Dubai&apos;s waterfront &mdash; a community shaped by contemporary
            architecture, considered landscaping and an elevated everyday
            lifestyle.
          </p>
          <p className="text-[#252D36]/60 leading-relaxed">
            Final specifications, residence types and pricing are being
            finalized by Nakheel. DNK Real Estate is your dedicated point of
            contact &mdash; register now and we hand-deliver every verified
            detail to you first.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden min-h-[320px]"
        >
          <Image
            src="/assets/palm-springs-nakheel/images/villas-exterior-sunset.png"
            alt="Palm Springs by Nakheel villa exteriors with landscaped gardens at sunset"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
