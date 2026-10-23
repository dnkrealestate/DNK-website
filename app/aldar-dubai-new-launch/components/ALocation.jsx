"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoLocationOutline } from "react-icons/io5";

const REFERENCES = [
  "Al Ain Road (E66)",
  "Sheikh Mohammed Bin Zayed Road (E311)",
  "Dubai Silicon Oasis",
  "Academic City",
  "Downtown Dubai",
];

export default function ALocation({ onOpenEnquiry }) {
  return (
    <section className="bg-[#101820] py-16 sm:py-24 px-5 sm:px-8 scroll-mt-24" id="location">
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p className="text-[#C6A46A] text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Location
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-white text-3xl sm:text-4xl font-semibold mb-6 max-w-[520px] leading-tight">
            Connected to the Places That Matter
          </h2>
          <p className="text-white/50 leading-relaxed mb-8 max-w-[480px]">
            Perfectly positioned near Dubai's most connected corridors
            &mdash; register your interest and we'll send you the exact
            project location and site map.
          </p>

          <div className="space-y-3 mb-9">
            {REFERENCES.map((ref, i) => (
              <motion.div
                key={ref}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-center gap-3 py-3 border-b border-white/10"
              >
                <IoLocationOutline className="text-[#C6A46A] flex-shrink-0" />
                <span className="text-white/80 text-sm">{ref}</span>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() =>
              onOpenEnquiry({
                eyebrow: "Location",
                title: "Request Exact Project Location",
                ctaLabel: "Request Exact Project Location",
              })
            }
            className="bg-gradient-to-r from-[#C6A46A] to-[#A9874F] hover:brightness-110 text-[#071321] font-bold px-7 py-3.5 rounded-sm text-sm transition-all"
          >
            Request Exact Project Location
          </button>
        </div>

        {/* Advertised masterplan imagery — not a verified GPS map pin */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10"
        >
          <Image
            src="/assets/aldar-dubai-launch/images/masterplan-aerial.webp"
            alt="Advertised aerial masterplan render showing the community layout"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-transparent to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-5">
            <p className="text-white font-semibold text-sm flex items-center gap-2">
              <IoLocationOutline className="text-[#C6A46A]" /> Advertised Masterplan
            </p>
            <p className="text-white/50 text-xs mt-1 leading-relaxed">
              Register now to receive the verified location and site map
              as soon as they're confirmed by Aldar.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
