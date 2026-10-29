"use client";

import React from "react";
import { motion } from "framer-motion";

const FACTS = [
  { label: "Project", value: "Palm Springs" },
  { label: "Developer", value: "Nakheel" },
  { label: "Property Types", value: "Townhouses & Villas" },
  { label: "Bedrooms", value: "3 – 5" },
  { label: "Prices From", value: "AED 3.8M" },
];

export default function PSQuickFacts() {
  return (
    <section className="bg-[#010D30] border-b border-white/10">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-5">
          {FACTS.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`py-6 sm:py-8 px-4 sm:px-5 border-white/10 ${
                i % 2 !== 0 ? "border-l" : ""
              } ${i !== 0 ? "sm:border-l" : ""} ${
                i < 4 ? "border-b sm:border-b-0" : ""
              }`}
            >
              <p className="text-white/40 text-[0.65rem] uppercase tracking-wider mb-1.5">
                {fact.label}
              </p>
              <p className="font-[family-name:var(--font-body)] text-[#C6A66B] text-lg sm:text-xl font-bold tracking-tight tabular-nums mb-0">
                {fact.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
