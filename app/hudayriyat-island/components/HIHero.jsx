"use client";

import React from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import HIContactForm from "./HIContactForm";
import bannerImg from "@/public/assets/other/hudayriyatBanner.webp";

const STATS = [
  { value: "AED 2.3M", label: "Starting Price" },
  { value: "1 – 4 BR", label: "Bedrooms" },
  { value: "10%", label: "Booking Only" },
  { value: "Q4 2029", label: "Handover" },
];

export default function HIHero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src={bannerImg}
        alt="Hudayriyat Island"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Dark overlay — keeps text readable over the photo */}
      <div className="absolute inset-0 bg-[#06101C]/75" />

      {/* Subtle gold vignette at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#06101C] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left: Property info ── */}
          <div className="flex-1 text-center lg:text-left">
            {/* Developer badge */}
            <div className="inline-flex items-center gap-2 border border-[#C4973D]/30 bg-[#C4973D]/8 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 bg-[#C4973D] rounded-full animate-pulse" />
              <span className="text-[#C4973D] text-xs font-semibold tracking-widest uppercase">
                Modon · Hudayriyat Island · Abu Dhabi
              </span>
            </div>

            {/* Title */}
            <h1 className="font-black leading-none mb-4">
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight">
                HUDAYRIYAT
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-[#C4973D] tracking-tight">
                ISLAND
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-[#8BA4BC] text-base lg:text-lg mb-8 max-w-[480px] mx-auto lg:mx-0 leading-relaxed">
              Abu Dhabi's premier waterfront destination — where serene island
              living meets world-class leisure and strong investment potential.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-[#C4973D]/20 rounded-2xl px-5 py-3 text-center min-w-[100px]  backdrop-blur-sm"
                >
                  <p className="text-[#C4973D] font-bold text-lg leading-tight m-0">
                    {stat.value}
                  </p>
                  <p className="text-white/50 text-xs mt-0.5 m-0">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={() => scrollTo("contact")}
                className="bg-[#C4973D] hover:bg-[#DEBA6B] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm tracking-wide shadow-lg shadow-[#C4973D]/20"
              >
                Register Your Interest
              </button>
              <a
                href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Hudayriyat%20Island%20Abu%20Dhabi"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm tracking-wide flex items-center justify-center gap-2"
              >
                <FaWhatsapp /> WhatsApp Us
              </a>
            </div>
          </div>

          {/* ── Right: Floating form card ── */}
          <div className="w-full lg:w-[420px] flex-shrink-0">
            <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl shadow-black/40">
              <div className="text-center mb-6">
                <div className="w-10 h-0.5 bg-[#C4973D] rounded-full mx-auto mb-4" />
                <h2 className="text-white font-bold text-xl">
                  Register Your Interest
                </h2>
                <p className="text-white/50 text-sm mt-1">
                  Get exclusive floor plans &amp; pricing
                </p>
              </div>
              <HIContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50 pointer-events-none">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#C4973D]" />
        <div className="w-2 h-2 bg-[#C4973D] rounded-full animate-bounce" />
      </div>
    </section>
  );
}
