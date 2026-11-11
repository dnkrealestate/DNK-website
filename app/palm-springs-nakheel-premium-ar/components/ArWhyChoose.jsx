"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoWaterOutline, IoRibbonOutline, IoSparklesOutline } from "react-icons/io5";

const CARDS = [
  {
    icon: IoWaterOutline,
    title: "عيش سكني متميز",
    text: "عنوان سكني في جبل علي، دبي، بمحيط مُشجّر مصمم للعيش اليومي.",
  },
  {
    icon: IoRibbonOutline,
    title: "مطوّر مميّز",
    text: "ينفذه نخيل، أحد أكثر المطورين الرئيسيين رسوخاً للمجتمعات السكنية في دبي.",
  },
  {
    icon: IoSparklesOutline,
    title: "نمط حياة استثنائي",
    text: "عمارة عصرية ومساحات خارجية مدروسة، مبنية حول الطريقة التي يعيش بها السكان فعلياً.",
  },
];

export default function ArWhyChoose() {
  return (
    <section className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
      <p className="text-[#367BA8] text-xs font-bold tracking-[0.25em] uppercase mb-4">
        لماذا بالم سبرينغز
      </p>
      <h2 className="font-[family-name:var(--font-display)] text-[#102B46] text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-tight mb-8 sm:mb-10 max-w-[640px]">
        لماذا تختار بالم سبرينغز
      </h2>

      <div className="grid sm:grid-cols-3 gap-5 mb-6">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="rounded-[1.75rem] bg-[#F5F8FB] border border-[#102B46]/8 p-7 sm:p-8"
          >
            <p className="text-[#367BA8]/50 font-[family-name:var(--font-body)] text-sm font-extrabold mb-4">
              {String(i + 1).padStart(2, "0")}
            </p>
            <c.icon className="text-[#102B46] text-2xl mb-4" />
            <h3 className="font-[family-name:var(--font-display)] text-[#102B46] text-lg font-semibold mb-2.5">
              {c.title}
            </h3>
            <p className="text-[#252D36]/55 text-sm leading-relaxed">{c.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="rounded-[1.75rem] bg-[#102B46] text-white p-7 sm:p-8 mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Image
            src="/assets/palm-springs-nakheel/logos/nakheel-logo-ink.webp"
            alt="نخيل"
            width={3840}
            height={667}
            className="h-5 sm:h-6 w-auto brightness-0 invert"
          />
          <span className="w-px h-4 bg-white/20" />
          <p className="text-[#8DB6D3] text-xs font-bold tracking-[0.2em] uppercase">
            أهم ميزة
          </p>
        </div>
        <p className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-semibold leading-snug max-w-[720px]">
          بدعم من نخيل — أحد أكثر المطورين الرئيسيين رسوخاً في دبي، والذي
          قدّم بعضاً من أكثر المجتمعات السكنية تميزاً في الإمارة.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7 }}
        className="relative rounded-[1.75rem] overflow-hidden aspect-[21/9] flex items-end"
      >
        <Image
          src="/assets/palm-springs-nakheel/images/masterplan-aerial-night.webp"
          alt="منظر جوي ليلي للمخطط الرئيسي لبالم سبرينغز من نخيل"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D30]/80 via-transparent to-transparent" />
        <h3 className="relative font-[family-name:var(--font-display)] text-white text-2xl sm:text-3xl font-semibold p-6 sm:p-10">
          عنوان يُلهم.
        </h3>
      </motion.div>
    </section>
  );
}
