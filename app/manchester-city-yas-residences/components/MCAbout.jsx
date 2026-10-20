"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const FACTS = [
  { value: "5 min", label: "Walk to Yas Island's attractions" },
  { value: "Canal", label: "Private waterfront setting" },
  { value: "5", label: "Villa, duplex & townhouse types" },
];

export default function MCAbout() {
  return (
    <section className="relative bg-[#070C16] py-12 lg:py-20 px-4 overflow-hidden">
      <Image
        src="/assets/manchester-city-yas/renders/bg-gradient-blue.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30 pointer-events-none"
      />

      <div className="relative max-w-[1200px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[#6CABDD] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2"
        >
          <span>01</span>
          <span className="w-8 h-px bg-[#6CABDD]" />
          <span>Overview</span>
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-white text-3xl lg:text-4xl font-extrabold mb-5 max-w-[720px] leading-tight"
        >
          A collective rhythm, at its peak — waterfront living on Yas Canal
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/60 max-w-[680px] mb-10 leading-relaxed"
        >
          Manchester City Yas Residences by Ohana is a collection of
          waterfront villas, duplexes and townhouses on Yas Canal, Yas
          Island, Abu Dhabi — built with amenities modelled on elite sport
          training and recovery, for those who aspire to more.
        </motion.p>

        <div className="grid sm:grid-cols-3 gap-4">
          {FACTS.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6"
            >
              <p className="text-[#6CABDD] text-3xl font-extrabold mb-1">{fact.value}</p>
              <p className="text-white/60 text-sm">{fact.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
