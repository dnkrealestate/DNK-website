"use client";

import React from "react";
import { motion } from "framer-motion";

export default function APaymentPlan({ onOpenEnquiry }) {
  return (
    <section className="bg-[#071321] py-16 sm:py-24 px-5 sm:px-8 scroll-mt-24" id="payment-plan">
      <div className="max-w-[900px] mx-auto text-center">
        <p className="text-[#C6A46A] text-xs font-bold tracking-[0.2em] uppercase mb-3">
          Payment Plan
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-white text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6">
          A Flexible 55/45 Payment Plan
        </h2>
        <p className="text-white/50 max-w-[560px] mx-auto mb-14 leading-relaxed">
          A flexible structure designed to make ownership easier &mdash;
          request your personalized payment schedule and take the first
          step toward owning your new home.
        </p>

        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
            className="h-14 sm:h-16 rounded-sm overflow-hidden flex"
          >
            <div className="h-full w-[55%] bg-gradient-to-r from-[#C6A46A] to-[#A9874F] flex items-center justify-center">
              <span className="text-[#071321] font-bold text-lg sm:text-xl">55%</span>
            </div>
            <div className="h-full w-[45%] bg-white/10 border-l border-[#071321] flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl">45%</span>
            </div>
          </motion.div>

          <div className="flex justify-between mt-4 text-sm">
            <p className="text-[#C6A46A] font-semibold">During Construction</p>
            <p className="text-white/60 font-semibold">On Handover</p>
          </div>
        </div>

        <div className="bg-white/[0.04] border border-white/10 rounded-sm p-6 sm:p-8 text-left mb-10">
          <p className="text-white/50 text-sm leading-relaxed">
            <span className="text-[#C6A46A] font-semibold">Priority access: </span>
            Full instalment milestones and booking details are released
            directly to registered enquirers. Request yours now and a DNK
            Real Estate advisor will walk you through the complete payment
            schedule.
          </p>
        </div>

        <button
          onClick={() =>
            onOpenEnquiry({
              eyebrow: "Payment Plan",
              title: "Request Payment Plan Details",
              document: "Payment Plan",
              ctaLabel: "Request Payment Plan Details",
            })
          }
          className="bg-gradient-to-r from-[#C6A46A] to-[#A9874F] hover:brightness-110 text-[#071321] font-bold px-8 py-3.5 rounded-sm text-sm transition-all"
        >
          Request Payment Plan Details
        </button>
      </div>
    </section>
  );
}
