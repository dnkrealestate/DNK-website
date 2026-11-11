"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoHomeOutline, IoLeafOutline, IoCarOutline, IoRibbonOutline } from "react-icons/io5";

const HIGHLIGHTS = [
  {
    icon: IoHomeOutline,
    title: "تصميم سكني عصري",
    text: "عمارة مصممة حول الإضاءة الطبيعية والخطوط النظيفة والعيش اليومي المدروس.",
  },
  {
    icon: IoLeafOutline,
    title: "محيط مُشجّر بعناية",
    text: "مساحات خارجية خضراء ومدروسة تمتد عبر المجتمع.",
  },
  {
    icon: IoCarOutline,
    title: "مرتبط بدبي",
    text: "يقع على امتداد ممر نمو جبل علي الأوسع في دبي.",
  },
  {
    icon: IoRibbonOutline,
    title: "تطوير من نخيل",
    text: "بدعم من أحد أكثر المطورين الرئيسيين رسوخاً في دبي.",
  },
];

export default function ArLifestyle() {
  return (
    <section id="lifestyle" className="relative px-4 sm:px-6 lg:px-10 py-10 sm:py-14 scroll-mt-28">
      <div className="relative rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden min-h-[480px] sm:min-h-[560px] flex items-end">
        <Image
          src="/assets/palm-springs-nakheel/images/community-pool-lifestyle.webp"
          alt="سكان يستمتعون بمسبح المجتمع في بالم سبرينغز من نخيل"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D30]/90 via-[#0A1D30]/30 to-transparent" />

        <div className="relative p-6 sm:p-12 max-w-[640px]">
          <p className="text-[#8DB6D3] text-xs font-bold tracking-[0.25em] uppercase mb-3">
            المرافق ونمط الحياة
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-white text-3xl sm:text-4xl font-semibold leading-tight">
            مصمم حول فن العيش.
          </h2>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {HIGHLIGHTS.map((h, i) => (
          <motion.div
            key={h.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-[1.5rem] bg-[#F5F8FB] border border-[#102B46]/8 p-6"
          >
            <h.icon className="text-[#367BA8] text-2xl mb-3" />
            <h3 className="font-[family-name:var(--font-display)] text-[#102B46] text-base font-semibold mb-2">
              {h.title}
            </h3>
            <p className="text-[#252D36]/55 text-sm leading-relaxed">{h.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
