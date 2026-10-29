"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { IoArrowDown, IoDocumentTextOutline } from "react-icons/io5";

const PRICING = [
  { label: "3-Bedroom Townhouses", value: "From AED 2.875M" },
  { label: "3-Bedroom Villas", value: "From AED 3.95M" },
  { label: "Payment Plan", value: "55/45" },
];

const WHATSAPP_TEXT =
  "Hello, I am interested in the new Aldar residential launch in Dubai. Please share the latest project details, pricing, floor plans and payment plan.";

export default function AHero({ onOpenEnquiry }) {
  return (
    <section className="relative h-[100dvh] min-h-[680px] overflow-hidden bg-[#071321] scroll-mt-24" id="top">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/assets/aldar-dubai-launch/images/aerial-canal-daytime.webp"
          alt="Aerial view of a waterfront villa community in Dubai with the city skyline in the distance"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#071321]/85 via-[#071321]/70 to-[#071321]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071321] via-transparent to-[#071321]/50" />

      <div className="relative z-10 h-full max-w-[1320px] mx-auto px-5 sm:px-8 flex flex-col justify-center pt-24 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-[#C6A46A]" />
          <p className="text-[#B7B0A5] text-xs font-semibold tracking-[0.35em] uppercase">
            Aldar &middot; New Residential Launch &middot; Dubai
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-display)] text-[#F7F3EB] font-medium leading-[1.05] text-4xl sm:text-5xl lg:text-6xl max-w-[760px] mb-6"
        >
          Discover a New Standard of Living in Dubai
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white/70 text-base sm:text-lg max-w-[560px] mb-9 leading-relaxed"
        >
          Explore an exceptional new residential opportunity featuring
          three-bedroom townhouses and villas, with an advertised 55/45
          payment plan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-wrap gap-x-10 gap-y-4 mb-10 pb-9 border-b border-white/15 max-w-[760px]"
        >
          {PRICING.map((item) => (
            <div key={item.label}>
              <p className="font-[family-name:var(--font-display)] text-[#C6A46A] text-2xl sm:text-3xl font-semibold">
                {item.value}
              </p>
              <p className="text-white/50 text-xs uppercase tracking-wider mt-1">{item.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 mb-4"
        >
          <button
            onClick={() => document.getElementById("residences")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-gradient-to-r from-[#C6A46A] to-[#A9874F] hover:brightness-110 text-[#071321] font-bold px-7 py-3.5 rounded-sm text-sm tracking-wide transition-all"
          >
            Explore the Residences
          </button>
          <button
            onClick={() =>
              onOpenEnquiry({
                title: "Request the Brochure",
                document: "Brochure",
                ctaLabel: "Get the Brochure",
              })
            }
            className="border border-white/30 hover:border-[#C6A46A] hover:bg-white/5 text-white font-semibold px-7 py-3.5 rounded-sm text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <IoDocumentTextOutline /> Download Brochure
          </button>
          <a
            href={`https://wa.me/+971555769195?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#25D366]/40 hover:bg-[#25D366]/10 text-[#25D366] font-semibold px-7 py-3.5 rounded-sm text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <FaWhatsapp /> Enquire on WhatsApp
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-white/35 text-xs max-w-[560px]"
        >
          Be among the first to receive verified pricing, payment plan and
          project details as they're confirmed by Aldar &mdash; register
          your interest today.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="hidden sm:flex absolute bottom-7 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10"
      >
        <span className="text-white/40 text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <IoArrowDown className="text-[#C6A46A] text-sm" />
        </motion.div>
      </motion.div>
    </section>
  );
}
