"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const PROFILES = {
  family: {
    tab: "For Families",
    title: "A Home to Grow Into",
    text: "Large plots, a residents-only clubhouse, kids' pools and play areas, cycling and jogging tracks, parks and a hobby garden — room for every stage of family life.",
    image: "/assets/yas-riva-reserve/renders/profile-family.webp",
  },
  investor: {
    tab: "For Investors",
    title: "A Scarce, Gated Asset",
    text: "292 villas in a gated canal-front community opposite the original Yas Riva, with a 5-year service charge waiver and 2% ADM fee waiver at launch. Compare the official terms before deciding — we do not promise returns.",
    image: "/assets/yas-riva-reserve/renders/profile-investor.webp",
  },
};

export default function YRBuyerProfile() {
  const [active, setActive] = useState("family");
  const profile = PROFILES[active];

  return (
    <section className="bg-[#F3EDE3] py-16 lg:py-28 px-5 sm:px-8">
      <div className="max-w-[1400px] mx-auto">
        <p className="text-[#96713F] text-xs font-bold tracking-[0.2em] uppercase mb-3">
          03 &mdash; Is It Right For You
        </p>

        <div className="flex items-center gap-8 border-b border-[#D8CBAE] mb-10">
          {Object.entries(PROFILES).map(([key, p]) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`relative pb-4 font-[family-name:var(--font-display)] text-2xl sm:text-4xl font-medium transition-colors ${
                active === key ? "text-[#1C1915]" : "text-[#1C1915]/35 hover:text-[#1C1915]/60"
              }`}
            >
              {p.tab}
              {active === key && (
                <motion.span
                  layoutId="profile-underline"
                  className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#96713F]"
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            <div className="relative aspect-[4/3] lg:order-2">
              <Image
                src={profile.image}
                alt={profile.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="lg:order-1">
              <h3 className="font-[family-name:var(--font-display)] text-[#1C1915] text-3xl sm:text-4xl font-semibold mb-5">
                {profile.title}
              </h3>
              <p className="text-[#5B5547] leading-relaxed max-w-[440px]">{profile.text}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
