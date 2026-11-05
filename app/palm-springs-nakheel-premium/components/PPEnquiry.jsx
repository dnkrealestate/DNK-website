"use client";

import React from "react";
import { motion } from "framer-motion";
import PPEnquiryForm from "./PPEnquiryForm";

export default function PPEnquiry() {
  return (
    <section id="enquiry" className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 scroll-mt-28">
      <div className="rounded-[1.75rem] sm:rounded-[2rem] bg-[#F5F8FB] border border-[#102B46]/8 p-6 sm:p-14 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <p className="text-[#367BA8] text-xs font-bold tracking-[0.25em] uppercase mb-4">Enquiry</p>
          <h2 className="font-[family-name:var(--font-display)] text-[#102B46] text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-tight mb-6 max-w-[460px]">
            Your Waterfront Residence Awaits
          </h2>
          <p className="text-[#252D36]/55 leading-relaxed max-w-[420px]">
            Share your details and a DNK Real Estate advisor will reach out
            with verified pricing, floor plans and availability for Palm
            Springs by Nakheel.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          className="rounded-[1.75rem] bg-white border border-[#102B46]/8 shadow-[0_20px_50px_rgba(16,43,70,0.08)] p-6 sm:p-8"
        >
          <PPEnquiryForm heading="Request a Private Consultation" extended />
        </motion.div>
      </div>
    </section>
  );
}
