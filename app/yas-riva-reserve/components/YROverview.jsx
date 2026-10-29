"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";

const BLOCKS = [
  {
    eyebrow: "01 — Overview",
    title: "A gated address on the canal",
    text: "Yas Riva Reserve by Aldar is a gated community of 292 villas on north-east Yas Island, directly opposite the original Yas Riva. Large plots, canal frontage with an optional pontoon, and close to everything Yas Island offers — away from everyone.",
    image: "/assets/yas-riva-reserve/hero/hero-1.webp",
  },
  {
    eyebrow: "The Numbers",
    title: "Space to live, and room to breathe",
    stats: [
      { value: "292", label: "Gated villas, inland & waterfront" },
      { value: "20%", label: "Of the land is open space" },
      { value: "1,294 sqm", label: "Largest plot size" },
    ],
    image: "/assets/yas-riva-reserve/renders/overview-parks.webp",
  },
  {
    eyebrow: "Launch Terms",
    title: "The offer, at launch",
    terms: [
      "5-Year Service Charge Waiver",
      "2% ADM Fee Waiver",
      "5% Booking — No Mortgage Pre-Approval Required",
    ],
    image: "/assets/yas-riva-reserve/hero/hero-2.webp",
  },
];

export default function YROverview() {
  const [active, setActive] = useState(0);
  const blockRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = blockRefs.current.indexOf(entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { threshold: 0.5 }
    );
    blockRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#F3EDE3]">
      <div className="max-w-[1500px] mx-auto grid lg:grid-cols-2">
        <div className="hidden lg:block relative">
          <div className="sticky top-0 h-[100dvh] overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Image
                  src={BLOCKS[active].image}
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/10" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div>
          {BLOCKS.map((block, blockIndex) => (
            <div
              key={block.eyebrow}
              ref={(el) => (blockRefs.current[blockIndex] = el)}
              className="min-h-[60dvh] lg:min-h-[100dvh] flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-16 border-b border-[#E5DCC9] last:border-b-0"
            >
              <div className="lg:hidden relative aspect-[4/3] mb-8 rounded-sm overflow-hidden">
                <Image src={block.image} alt={block.title} fill sizes="100vw" className="object-cover" />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.6 }}
                className="text-[#96713F] text-xs font-bold tracking-[0.2em] uppercase mb-3"
              >
                {block.eyebrow}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="font-[family-name:var(--font-display)] text-[#1C1915] text-3xl sm:text-4xl font-semibold mb-6 max-w-[480px] leading-tight"
              >
                {block.title}
              </motion.h2>

              {block.text && (
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-[#5B5547] max-w-[460px] leading-relaxed"
                >
                  {block.text}
                </motion.p>
              )}

              {block.stats && (
                <div className="space-y-5 max-w-[420px]">
                  {block.stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-20%" }}
                      transition={{ duration: 0.5, delay: 0.1 * i }}
                      className="flex items-baseline gap-4 border-b border-[#E5DCC9] pb-4"
                    >
                      <span className="font-[family-name:var(--font-display)] text-[#96713F] text-3xl font-semibold w-[110px] flex-shrink-0">
                        {stat.value}
                      </span>
                      <span className="text-[#5B5547] text-sm">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {block.terms && (
                <div className="space-y-4 max-w-[460px]">
                  {block.terms.map((term, i) => (
                    <motion.p
                      key={term}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-20%" }}
                      transition={{ duration: 0.5, delay: 0.1 * i }}
                      className="flex items-center gap-3 text-[#1C1915] font-medium"
                    >
                      <IoCheckmarkCircle className="text-[#96713F] flex-shrink-0 text-xl" />
                      {term}
                    </motion.p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
