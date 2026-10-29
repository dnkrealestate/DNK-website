"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { IoArrowDown, IoDocumentTextOutline } from "react-icons/io5";

const WHATSAPP_TEXT =
  "Hello, I am interested in Palm Springs by Nakheel in Dubai. Please share the latest project details, pricing and floor plans.";

export default function PSHero({ onOpenEnquiry }) {
  return (
    <section className="relative min-h-[100vh] bg-[#011945] scroll-mt-24" id="overview">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/assets/palm-springs-nakheel/images/hero-waterfront-sunset.png"
            alt="Aerial view of a waterfront villa community in Dubai at sunset, with the city skyline in the distance"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#011945]/85 via-[#011945]/55 to-[#011945]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#011945] via-transparent to-[#011945]/40" />
      </div>

      <div className="relative z-10 min-h-[100vh] max-w-[1320px] mx-auto px-5 sm:px-8 flex flex-col justify-center pt-28 sm:pt-32 pb-28 sm:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-2"
        >
         <p className="font-[family-name:var(--font-display)] bg-gradient-to-r from-[#E4C98C] via-[#C6A66B] to-[#A9874F] bg-clip-text text-transparent font-semibold tracking-[0.02em] text-2xl sm:text-3xl leading-none mb-0">
            Palm Springs
          </p>
          <p className="text-white/45 text-[0.65rem] font-semibold tracking-[0.3em] uppercase mb-0">
            By Nakheel
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-baseline gap-3 mb-4"
        >
           <p className="text-[#A9BBA5] text-[0.7rem] font-semibold tracking-[0.3em] uppercase mb-0">
            A New Perspective on Luxury Living
          </p>
          
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-display)] text-[#F7F5EF] font-medium leading-[1.08] text-4xl sm:text-5xl lg:text-[3.5rem] mb-5"
        >
          Where Refined Living 
          <br />
          <span className="text-4xl sm:text-5xl lg:text-[4rem]">Meets a New Horizon</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white/65 text-base max-w-[520px] mb-8 leading-relaxed"
        >
          Contemporary architecture and elevated everyday living on Dubai's
          waterfront &mdash; with DNK Real Estate giving you direct access
          to verified pricing and floor plans as they're confirmed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.58 }}
          className="grid grid-cols-3 divide-x divide-white/15 bg-white/[0.06] backdrop-blur-sm border border-white/15 rounded-sm mb-8 max-w-[720px]"
        >
          <div className="px-4 sm:px-6 py-4 sm:py-5">
            <p className="font-[family-name:var(--font-body)] text-[#C6A66B] text-lg sm:text-2xl font-bold tracking-tight tabular-nums mb-0">
              3 &amp; 4 BR
            </p>
            <p className="text-white text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider mt-1 mb-0">Townhouses</p>
          </div>
          <div className="px-4 sm:px-6 py-4 sm:py-5">
            <p className="font-[family-name:var(--font-body)] text-[#C6A66B] text-lg sm:text-2xl font-bold tracking-tight tabular-nums mb-0">
              4 &amp; 5 BR
            </p>
            <p className="text-white text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider mt-1 mb-0">Villas</p>
          </div>
          <div className="px-4 sm:px-6 py-4 sm:py-5">
            <p className="font-[family-name:var(--font-body)] text-[#C6A66B] text-lg sm:text-2xl font-bold tracking-tight tabular-nums mb-0">
              AED 3.8M&ndash;9M
            </p>
            <p className="text-white text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider mt-1 mb-0">Price Range</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 mb-5"
        >
          <button
            onClick={() => document.getElementById("residences")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-gradient-to-r from-[#C6A66B] to-[#A9874F] hover:brightness-110 text-[#011945] font-bold px-7 py-3.5 rounded-sm text-sm tracking-wide transition-all"
          >
            Explore the Residences
          </button>
          <button
            onClick={() =>
              onOpenEnquiry({
                title: "Request the Brochure",
                interest: "Brochure",
                ctaLabel: "Get the Brochure",
              })
            }
            className="border border-white/30 hover:border-[#C6A66B] hover:bg-white/5 text-white font-semibold px-7 py-3.5 rounded-sm text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <IoDocumentTextOutline /> Request the Brochure
          </button>
          <a
            href={`https://wa.me/+971555769195?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex border border-[#25D366]/40 hover:bg-[#25D366]/10 text-[#25D366] font-semibold px-7 py-3.5 rounded-sm text-sm items-center justify-center gap-2 transition-colors"
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
          Pricing and unit types shown are as advertised; unit sizes are yet
          to be announced by Nakheel. Register your interest today to
          receive verified information first.
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
          <IoArrowDown className="text-[#C6A66B] text-sm" />
        </motion.div>
      </motion.div>
    </section>
  );
}
