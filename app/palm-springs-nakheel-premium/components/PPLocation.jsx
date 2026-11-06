"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoLocationOutline } from "react-icons/io5";

const REFERENCES = [
  { name: "DWC Airport", time: "15 min" },
  { name: "Jebel Ali", time: "10 min" },
  { name: "Bluewaters Island", time: "20 min" },
  { name: "Palm Jumeirah", time: "25 min" },
  { name: "Dubai Marina", time: "30 min" },
  { name: "Burj Al Arab", time: "40 min" },
];

export default function PPLocation({ onOpenEnquiry }) {
  return (
    <section id="location" className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 scroll-mt-28">
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/3] rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(16,43,70,0.12)]"
        >
          <Image
            src="/assets/palm-springs-nakheel/images/location-map-detailed.jpg"
            alt="Location map showing Palm Springs relative to Palm Jebel Ali, Palm Jumeirah, Bluewaters Island, Burj Al Arab, Dubai Marina and DWC Airport"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute top-5 left-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 px-4 py-3">
            <p className="text-[#252D36]/50 text-[0.6rem] font-semibold tracking-[0.15em] uppercase">DWC Airport</p>
            <p className="font-[family-name:var(--font-body)] text-[#102B46] text-lg font-extrabold">15 min</p>
          </div>
          <div className="absolute bottom-5 right-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 px-4 py-3">
            <p className="text-[#252D36]/50 text-[0.6rem] font-semibold tracking-[0.15em] uppercase">Jebel Ali</p>
            <p className="font-[family-name:var(--font-body)] text-[#102B46] text-lg font-extrabold">10 min</p>
          </div>
        </motion.div>

        <div>
          <p className="text-[#367BA8] text-xs font-bold tracking-[0.25em] uppercase mb-4">Location</p>
          <h2 className="font-[family-name:var(--font-display)] text-[#102B46] text-3xl sm:text-4xl font-semibold mb-6 max-w-[480px] leading-tight">
            Connected to Dubai. Positioned for What Comes Next.
          </h2>
          <p className="text-[#252D36]/55 leading-relaxed mb-8 max-w-[440px]">
            Explore the surrounding destinations and road connections shown
            on the reference map. Travel times are indicative and pending
            official verification by Nakheel.
          </p>

          <div className="space-y-3 mb-9">
            {REFERENCES.map((ref, i) => (
              <motion.div
                key={ref.name}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-center justify-between gap-3 py-3 border-b border-[#102B46]/10"
              >
                <span className="flex items-center gap-3">
                  <IoLocationOutline className="text-[#367BA8] flex-shrink-0" />
                  <span className="text-[#252D36]/75 text-sm">{ref.name}</span>
                </span>
                <span className="text-[#252D36]/40 text-xs tabular-nums">{ref.time}</span>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() =>
              onOpenEnquiry({
                eyebrow: "Location",
                title: "Request the Verified Location",
                interest: "Masterplan",
                ctaLabel: "Request the Verified Location",
              })
            }
            className="bg-[#102B46] hover:bg-[#174A73] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-colors"
          >
            Request the Verified Location
          </button>
        </div>
      </div>
    </section>
  );
}
