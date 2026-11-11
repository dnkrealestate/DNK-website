"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import ArEnquiryForm from "./ArEnquiryForm";

export default function ArEnquiryModal({ config, onClose }) {
  const context = config || {};

  return (
    <AnimatePresence>
      {config && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[300] bg-[#0A1D30]/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[480px] max-h-[90vh] overflow-y-auto overflow-x-hidden bg-white border border-[#102B46]/10 rounded-[1.75rem] p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="إغلاق"
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#102B46]/5 hover:bg-[#102B46]/10 flex items-center justify-center text-[#102B46]"
            >
              <IoClose className="text-lg" />
            </button>

            <p className="text-[#367BA8] text-xs font-bold tracking-[0.2em] uppercase mb-2">
              {context.eyebrow || "بالم سبرينغز — من نخيل"}
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[#102B46] font-semibold text-2xl mb-1 pl-8">
              {context.title || "طلب معلومات"}
            </h2>
            <p className="text-[#102B46]/50 text-xs mb-6 leading-relaxed">
              {context.subtitle ||
                "احصل على آخر المعلومات المتوفرة عن المشروع والأسعار والمخططات."}
            </p>

            <ArEnquiryForm
              heading={context.ctaLabel || "طلب معلومات"}
              defaultInterest={context.interest || ""}
              onSuccess={onClose}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
