"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import YRContactForm from "./YRContactForm";

export default function YREnquiryDrawer({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[301] w-full sm:w-[440px] bg-[#15130F] border-l border-white/10 overflow-y-auto"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-[#D9C098] text-xs font-bold tracking-[0.2em] uppercase mb-2">
                    Yas Riva Reserve
                  </p>
                  <h2 className="font-[family-name:var(--font-display)] text-white font-semibold text-2xl">
                    Register Your Interest
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white flex-shrink-0"
                >
                  <IoClose className="text-xl" />
                </button>
              </div>
              <p className="text-white/50 text-sm mb-6 leading-relaxed">
                Official price list, floor plans and payment plan details —
                sent directly by a DNK Real Estate advisor.
              </p>
              <YRContactForm />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
