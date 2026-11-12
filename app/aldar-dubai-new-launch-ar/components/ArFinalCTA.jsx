"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ArEnquiryForm from "./ArEnquiryForm";

export default function ArFinalCTA() {
  return (
    <section className="relative bg-[#071321] py-16 sm:py-24 px-5 sm:px-8 overflow-hidden scroll-mt-24" id="contact">
      <Image
        src="/assets/aldar-dubai-launch/images/interior-lifestyle.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-[#071321]/90" />
      <div className="absolute inset-0 bg-gradient-to-bl from-[#C6A46A]/[0.08] via-transparent to-transparent" />

      <div className="relative max-w-[1100px] mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#C6A46A] text-xs font-bold tracking-[0.2em] uppercase mb-3 flex items-center gap-3">
            <span className="w-8 h-px bg-[#C6A46A]" />
            إحاطة خاصة
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-white text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
            اطلب إحاطتك الخاصة عن المشروع
          </h2>
          <p className="text-white/60 leading-relaxed mb-8 max-w-[440px]">
            احصل على أحدث معلومات المشروع والأسعار والمخططات وتفاصيل
            الدفع مباشرة من أحد مستشاري DNK العقارية &mdash; دون أي
            التزام.
          </p>
          <ul className="space-y-3 text-white/50 text-sm">
            <li className="flex items-center gap-2.5">
              <span className="w-1 h-1 rounded-full bg-[#C6A46A]" /> أسعار مؤكدة فور اعتمادها
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-1 h-1 rounded-full bg-[#C6A46A]" /> مخططات تُرسل إليك مباشرة
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-1 h-1 rounded-full bg-[#C6A46A]" /> بدون تكلفة ودون التزام بالشراء
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#0D1520] border border-white/10 rounded-sm p-6 sm:p-8"
        >
          <ArEnquiryForm heading="طلب معلومات" />
        </motion.div>
      </div>
    </section>
  );
}
