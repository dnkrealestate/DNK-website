"use client";

import React from "react";
import { motion } from "framer-motion";

const FACTS = [
  { label: "Developer", value: "Aldar" },
  { label: "Property Types", value: "Townhouses & Villas" },
  { label: "Bedrooms", value: "3" },
  { label: "Starting Price", value: "AED 2.875M" },
  { label: "Payment Plan", value: "55/45" },
];

export default function AQuickFacts() {
  return (
    <section className="bg-[#0D1520] border-b border-white/10">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-5">
          {FACTS.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`py-6 sm:py-8 px-4 sm:px-5 ${
                i !== 0 ? "sm:border-l border-white/10" : ""
              } ${i < 4 ? "border-b sm:border-b-0 border-white/10" : ""}`}
            >
              <p className="text-white/40 text-[0.65rem] uppercase tracking-wider mb-1.5">
                {fact.label}
              </p>
              <p className="font-[family-name:var(--font-display)] text-[#C6A46A] text-xl sm:text-2xl font-semibold">
                {fact.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
