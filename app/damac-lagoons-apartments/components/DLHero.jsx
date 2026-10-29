"use client";

import React from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import DLContactForm from "./DLContactForm";

const BADGES = [
  { label: "From AED 680K", solid: false },
  { label: "Studio & 1-Bed", solid: false },
  { label: "50/50 plan*", solid: false },
  { label: "4% DLD fee", solid: true },
];

export default function DLHero() {
  return (
    <section className="relative" id="top">
      <div className="relative min-h-[90dvh] lg:min-h-[100dvh] overflow-hidden">
        <Image
          src="/assets/damac-lagoons/hero-poster.webp"
          alt="Sorrento Lagoon Views waterfront apartments at Damac Lagoons"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 pt-10 lg:pt-16 pb-12 lg:pb-16 min-h-[90dvh] lg:min-h-[100dvh] flex flex-col justify-center lg:flex-row lg:items-center gap-10 lg:gap-16">
          <div className="flex-1 lg:max-w-[640px]">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/assets/damac-lagoons/logo-sorrento-full-white.webp"
                alt="Sorrento Lagoon Views"
                width={140}
                height={110}
                className="h-16 sm:h-20 w-auto"
                priority
              />
              <span className="text-white/40 text-xs self-end mb-1">|</span>
              <div className="flex items-center gap-1.5 self-end mb-1.5">
                <span className="text-white/60 text-xs italic">by</span>
                <Image
                  src="/assets/damac-lagoons/logo-damac-clean.webp"
                  alt="Damac Properties"
                  width={324}
                  height={44}
                  className="h-3.5 w-auto"
                />
              </div>
            </div>

            <p className="text-white/70 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              New Damac Launch · EOI Open
            </p>

            <h1 className="text-white font-extrabold leading-[1.02] text-4xl sm:text-5xl lg:text-[3.4rem] mb-4">
              Sorrento at Damac Lagoons — Waterfront Apartments in Dubai
            </h1>

            <p className="text-[#7FC4D6] text-lg sm:text-xl font-medium mb-6">
              Your Mediterranean Lifestyle Starts by the Lagoon.
            </p>

            <div className="flex flex-wrap gap-2.5 mb-7">
              {BADGES.map((badge) => (
                <span
                  key={badge.label}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    badge.solid
                      ? "bg-[#3D8FA6] text-white"
                      : "bg-white/10 border border-white/25 text-white backdrop-blur-sm"
                  }`}
                >
                  {badge.label}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <a
                href="#enquire-hero"
                className="bg-[#1C6B82] hover:bg-[#17596C] text-white font-semibold px-7 py-3.5 rounded-full text-sm text-center transition-colors"
              >
                Get Early Access &amp; Price List
              </a>
              <a
                href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Damac%20Lagoons%20-%20Sorrento%20Lagoon%20Views"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/40 hover:bg-white/10 text-white font-semibold px-7 py-3.5 rounded-full text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <FaWhatsapp /> WhatsApp Your Property Advisor
              </a>
            </div>
            <p className="text-white/50 text-xs">
              *Expected, subject to Damac confirmation.
            </p>
          </div>

          <div className="lg:w-[400px] flex-shrink-0" id="enquire-hero">
            <div className="bg-[#0D1210]/95 backdrop-blur-md border border-white/10 rounded-3xl p-6 lg:p-7 shadow-2xl shadow-black/50 max-h-[85vh] overflow-y-auto">
              <h2 className="text-white font-bold text-xl mb-1">
                Register Your Interest Before Launch
              </h2>
              <p className="text-white/50 text-xs mb-5">
                Official price list, floor plans and launch updates — first.
              </p>
              <DLContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
