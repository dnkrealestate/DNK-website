"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  IoCart,
  IoCarSport,
  IoWater,
  IoFlag,
  IoGolf,
  IoAirplane,
} from "react-icons/io5";

const LANDMARKS = [
  { icon: IoCart, category: "Shopping", place: "Yas Mall" },
  { icon: IoCarSport, category: "Theme Park", place: "Ferrari World" },
  { icon: IoWater, category: "Waterpark", place: "Yas Waterworld" },
  { icon: IoFlag, category: "Formula 1", place: "Yas Marina Circuit" },
  { icon: IoGolf, category: "Golf", place: "Yas Links" },
  { icon: IoAirplane, category: "By Road", place: "Zayed Int'l Airport" },
];

export default function YRLocation() {
  return (
    <section className="relative bg-[#0E0C09]" id="location">
      <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
        <Image
          src="/assets/yas-riva-reserve/renders/masterplan.webp"
          alt="Yas Riva Reserve masterplan, Yas Island"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C09] via-[#0E0C09]/20 to-[#0E0C09]/40" />

        <div className="absolute inset-0 flex flex-col justify-end px-5 sm:px-8 pb-12 sm:pb-16">
          <div className="max-w-[1400px] mx-auto w-full">
            <p className="text-[#D9C098] text-xs font-bold tracking-[0.2em] uppercase mb-3">
              06 &mdash; Location
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-[family-name:var(--font-display)] text-white text-3xl sm:text-5xl font-semibold mb-4 max-w-[640px] leading-tight"
            >
              Close to everything, away from everyone
            </motion.h2>
            <p className="text-white/70 max-w-[560px] leading-relaxed">
              North-east Yas Island, opposite the original Yas Riva. Minutes
              from Yas Mall, the theme parks, Yas Marina Circuit and Yas
              Links, with roads to Abu Dhabi city, Zayed International
              Airport and Dubai.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {LANDMARKS.map((l, i) => (
            <motion.div
              key={l.place}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              className={`flex-shrink-0 w-[220px] sm:w-auto sm:flex-1 flex items-center gap-4 px-6 sm:px-8 py-8 ${
                i !== 0 ? "border-l border-white/10" : ""
              }`}
            >
              <l.icon className="text-[#D9C098] text-2xl flex-shrink-0" />
              <div>
                <p className="text-white/40 text-[0.6rem] uppercase tracking-wider">{l.category}</p>
                <p className="text-white text-sm font-semibold">{l.place}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
