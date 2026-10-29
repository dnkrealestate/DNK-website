"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown } from "react-icons/io5";
import { FAQ_ITEMS } from "../faqData";

export default function PSFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#F7F5EF] py-16 sm:py-24 px-5 sm:px-8 scroll-mt-24" id="faq">
      <div className="max-w-[860px] mx-auto">
        <p className="text-[#A9874F] text-xs font-bold tracking-[0.2em] uppercase mb-3 text-center">
          FAQ
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-[#1C211F] text-3xl sm:text-4xl font-semibold mb-12 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="bg-white border border-[#1C211F]/10 rounded-sm overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  aria-expanded={isOpen}
                >
                  <span className="text-[#1C211F] font-semibold text-sm sm:text-base">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-[#C6A66B] flex-shrink-0"
                  >
                    <IoChevronDown />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-[#4B534E] text-sm leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
