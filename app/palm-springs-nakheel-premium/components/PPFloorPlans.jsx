"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoLockClosedOutline } from "react-icons/io5";

const TYPES = [
  {
    type: "Townhouses",
    bedrooms: "3 & 4 Bedroom",
    image: "/assets/palm-springs-nakheel/images/floor-plan-townhouse-3br.jpg",
  },
  {
    type: "Villas",
    bedrooms: "4 & 5 Bedroom",
    image: "/assets/palm-springs-nakheel/images/floor-plan-sample.png",
  },
];

export default function PPFloorPlans({ onOpenEnquiry }) {
  return (
    <section id="floor-plans" className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 scroll-mt-28">
      <p className="text-[#367BA8] text-xs font-bold tracking-[0.25em] uppercase mb-4">
        Floor Plans
      </p>
      <h2 className="font-[family-name:var(--font-display)] text-[#102B46] text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-tight mb-3 max-w-[640px]">
        See the Level of Detail Behind Every Layout
      </h2>
      <p className="text-[#252D36]/55 leading-relaxed mb-10 max-w-[560px]">
        The sample below shows the kind of layout detail our floor-plan packs
        include. Register for either collection and we&apos;ll send the
        confirmed Palm Springs plans the moment Nakheel releases them.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        {TYPES.map((t, i) => (
          <motion.div
            key={t.type}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="rounded-[1.75rem] bg-[#F5F8FB] border border-[#102B46]/8 overflow-hidden flex flex-col"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={t.image}
                alt={`Sample floor plan layout for ${t.type} at Palm Springs by Nakheel`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute top-3 right-3 bg-[#102B46]/85 text-white text-[0.6rem] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <IoLockClosedOutline /> Sample Preview
              </span>
            </div>
            <div className="p-6 sm:p-7 flex flex-col flex-1">
              <p className="text-[#367BA8] text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-1.5">
                {t.bedrooms}
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-[#102B46] text-xl font-semibold mb-5">
                {t.type}
              </h3>
              <button
                onClick={() =>
                  onOpenEnquiry({
                    eyebrow: `${t.type} Floor Plans`,
                    title: `Request ${t.type} Floor Plans`,
                    interest: "Floor Plans",
                    propertyType: t.type,
                    ctaLabel: `Request ${t.type} Floor Plans`,
                  })
                }
                className="mt-auto bg-[#102B46] hover:bg-[#174A73] text-white font-semibold px-5 py-3 rounded-full text-sm transition-colors self-start"
              >
                Request Floor Plans
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
