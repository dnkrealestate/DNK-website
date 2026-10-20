"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const STATS = [
  { value: "35", suffix: "yrs", label: "Expertise in real estate" },
  { value: "9,000+", suffix: "", label: "Units delivered" },
  { value: "2,000+", suffix: "", label: "Employees" },
  { value: "$8Bn+", suffix: "", label: "Assets under value" },
];

export default function MCDeveloper() {
  return (
    <section className="relative py-12 lg:py-20 px-4 overflow-hidden">
      <Image
        src="/assets/manchester-city-yas/renders/render-canal-interior.webp"
        alt="Yas Canal waterfront at Manchester City Yas Residences"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#050810]/85" />

      <div className="relative max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/assets/manchester-city-yas/logos/logo-ohana-white.svg"
            alt="Ohana Development"
            width={172}
            height={184}
            className="h-12 w-auto mb-6"
          />
          <p className="text-[#6CABDD] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
            <span>07</span>
            <span className="w-8 h-px bg-[#6CABDD]" />
            <span>Developer</span>
          </p>
          <h2 className="text-white text-3xl lg:text-4xl font-extrabold mb-5 leading-tight">
            Developed by Ohana Development
          </h2>
          <p className="text-white/70 leading-relaxed mb-6 max-w-[520px]">
            A leading private real estate developer in the Middle East,
            crafting timeless homes that combine accessible luxury, high
            quality and lasting value — with 35 years of expertise across
            the UAE and Lebanon.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="bg-white/[0.06] backdrop-blur-md border border-white/15 rounded-2xl p-5"
            >
              <p className="text-[#6CABDD] text-3xl font-extrabold">
                {stat.value}
                {stat.suffix && <span className="text-lg ml-1">{stat.suffix}</span>}
              </p>
              <p className="text-white text-sm font-medium mt-1">{stat.label}</p>
              <p className="text-white/40 text-[0.6rem] mt-1 uppercase tracking-wider">
                Ohana Development, as reported
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
