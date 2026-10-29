"use client";

import React from "react";
import { motion } from "framer-motion";
import { IoHomeOutline, IoLeafOutline, IoCarOutline, IoRibbonOutline } from "react-icons/io5";

const HIGHLIGHTS = [
  {
    icon: IoHomeOutline,
    title: "Contemporary Residential Design",
    text: "A planned residential development featuring townhouses and villas.",
  },
  {
    icon: IoLeafOutline,
    title: "Thoughtfully Landscaped Surroundings",
    text: "Community landscaping and outdoor amenities are subject to official confirmation.",
  },
  {
    icon: IoCarOutline,
    title: "Connected to Dubai",
    text: "Located in Jebel Ali, near Palm Jebel Ali, with access to Sheikh Zayed Road",
  },
  {
    icon: IoRibbonOutline,
    title: "A Development by Nakheel",
    text: "Developed by Nakheel, a leading developer known for creating landmark residential communities in Dubai.",
  },
];

export default function PSHighlights() {
  return (
    <section className="bg-[#011945] py-16 sm:py-20 px-5 sm:px-8 border-b border-white/10 scroll-mt-24" id="lifestyle">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-sm overflow-hidden">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#011945] p-7 sm:p-8"
            >
              <h.icon className="text-[#C6A66B] text-2xl mb-4" />
              <h3 className="font-[family-name:var(--font-display)] text-white text-lg font-semibold mb-2">
                {h.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{h.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
