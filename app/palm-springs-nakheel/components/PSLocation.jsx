"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoLocationOutline } from "react-icons/io5";

const REFERENCES = [
  { name: "DWC Airport", time: "15 min" },
  { name: "Palm Jebel Ali", time: "17 min" },
  { name: "Bluewaters Island", time: "20 min" },
  { name: "Palm Jumeirah", time: "25 min" },
  { name: "Burj Al Arab", time: "30 min" },
];

export default function PSLocation({ onOpenEnquiry }) {
  return (
    <section className="bg-[#0A2458] py-16 sm:py-24 px-5 sm:px-8 scroll-mt-24" id="location">
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p className="text-[#C6A66B] text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Location
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-white text-3xl sm:text-4xl font-semibold mb-6 max-w-[520px] leading-tight">
            Connected to Dubai. Positioned for What Comes Next.
          </h2>
          <p className="text-white/50 leading-relaxed mb-8 max-w-[480px]">
            Explore the surrounding destinations and road connections shown
            on the reference map below. Exact coordinates and travel times
            are pending official verification by Nakheel.
          </p>

          <div className="space-y-3 mb-9">
            {REFERENCES.map((ref, i) => (
              <motion.div
                key={ref.name}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-center justify-between gap-3 py-3 border-b border-white/10"
              >
                <span className="flex items-center gap-3">
                  <IoLocationOutline className="text-[#C6A66B] flex-shrink-0" />
                  <span className="text-white/80 text-sm">{ref.name}</span>
                </span>
                <span className="text-white/40 text-xs">{ref.time}</span>
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
            className="bg-gradient-to-r from-[#C6A66B] to-[#A9874F] hover:brightness-110 text-[#011945] font-bold px-7 py-3.5 rounded-sm text-sm transition-all"
          >
            Request the Verified Location
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[3/2] rounded-sm overflow-hidden border border-white/10"
        >
          <Image
            src="/assets/palm-springs-nakheel/images/location-map-reference.webp"
            alt="Reference map showing the Palm Springs site relative to Palm Jebel Ali, Palm Jumeirah, Bluewaters Island, Burj Al Arab and DWC Airport"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#011945]/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-5">
            <p className="text-white font-semibold text-sm flex items-center gap-2">
              <IoLocationOutline className="text-[#ffffff]" /> Location Map
            </p>
            <p className="text-white/50 text-xs mt-1 leading-relaxed">
              Register to receive the full site map and location details.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
