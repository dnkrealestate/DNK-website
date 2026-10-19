"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import DIContactForm from "./DIContactForm";
import DIPopupModal from "./DIPopupModal";

const STATS = [
  { value: "Villas & Townhouses", label: "Residence Types" },
  { value: "AED 2.75M", label: "Starting From" },
  { value: "7", label: "Signature Amenities" },
  { value: "Dubailand", label: "Location" },
];

function HeroVideoBg() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #050A0B 0%, #081517 35%, #0A1C1D 65%, #0C2423 100%)",
        }}
      />
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/assets/damac-islands/hero-poster.webp"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/damac-islands/video/hero-16x9.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 100%, rgba(45,212,191,0.14) 0%, rgba(45,212,191,0) 60%)",
        }}
      />
      <div className="absolute left-0 right-0 top-[62%] h-px bg-gradient-to-r from-transparent via-[#B68A2E]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
    </>
  );
}

export default function DIHero() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section className="relative" id="top">
      {/* Mobile / tablet */}
      <div className="lg:hidden relative h-[64vh] min-h-[440px] flex items-center overflow-hidden">
        <HeroVideoBg />
        <div className="relative z-10 w-full px-4 text-center">
          <p className="text-[#2DD4BF] text-[0.65rem] font-semibold tracking-[0.25em] uppercase mb-3">
            Island-Inspired Living · Dubailand
          </p>
          <h1 className="leading-[0.95] font-semibold">
            <span className="block text-4xl sm:text-5xl text-white tracking-tight">
              Damac Islands
            </span>
            <span className="block text-xl sm:text-2xl text-[#B68A2E] tracking-tight mt-1 italic">
              Villas &amp; Townhouses
            </span>
          </h1>
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50 pointer-events-none">
          <div className="w-px h-6 bg-gradient-to-b from-transparent to-[#B68A2E]" />
          <div className="w-1.5 h-1.5 bg-[#B68A2E] rounded-full animate-bounce" />
        </div>
      </div>

      <div className="lg:hidden bg-[#070A0C] px-4 pt-8 pb-10">
        <p className="text-white/55 text-sm leading-relaxed mb-6 text-center">
          A perpetual journey through the world's most beautiful island
          destinations — from the serenity of the Maldives to the charm of
          Seychelles, reimagined in Dubailand with tranquil lagoons, lush
          jungle rivers and resort-style amenities.
        </p>

        <div className="grid grid-cols-2 gap-2.5 mb-6">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="bg-white/[0.04] border border-[#B68A2E]/20 rounded-2xl px-3 py-2.5 text-center"
            >
              <p className="text-[#B68A2E] font-bold text-base leading-tight m-0">
                {stat.value}
              </p>
              <p className="text-white/45 text-[0.7rem] mt-0.5 m-0">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 mb-8">
          <button
            onClick={() => setShowPopup(true)}
            className="bg-gradient-to-r from-[#B68A2E] to-[#D4AF6A] hover:brightness-110 text-black font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm tracking-wide shadow-lg shadow-[#B68A2E]/20"
          >
            Get Latest Price &amp; Floor Plans
          </button>
          <a
            href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Damac%20Islands"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm tracking-wide flex items-center justify-center gap-2"
          >
            <FaWhatsapp /> WhatsApp Us
          </a>
        </div>

        <div className="bg-white/[0.04] border border-[#B68A2E]/15 rounded-3xl p-5" id="enquire">
          <div className="text-center mb-5">
            <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-[#B68A2E] to-transparent rounded-full mx-auto mb-3" />
            <h2 className="text-white font-semibold text-xl">
              Enquire Now
            </h2>
            <p className="text-white/45 text-xs mt-1">
              Villas &amp; Townhouses from AED 2.75M
            </p>
          </div>
          <DIContactForm compact />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex relative min-h-screen items-center overflow-hidden">
        <HeroVideoBg />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 pt-40 pb-28">
          <div className="flex flex-row items-center gap-16">
            <div className="flex-1 text-left">
              <p className="text-[#2DD4BF] text-sm font-semibold tracking-[0.3em] uppercase mb-4">
                Island-Inspired Living · Dubailand
              </p>

              <h1 className="leading-[0.95] mb-5 font-semibold">
                <span className="block text-[5.5rem] text-white tracking-tight">
                  Damac Islands
                </span>
                <span className="block text-5xl text-[#B68A2E] tracking-tight mt-1 italic">
                  Villas &amp; Townhouses
                </span>
              </h1>

              <p className="text-white/55 text-lg mb-8 max-w-[520px] leading-relaxed">
                A perpetual journey through the world's most beautiful
                island destinations — from the serenity of the Maldives to
                the charm of Seychelles, reimagined in Dubailand with
                tranquil lagoons, lush jungle rivers and resort-style
                amenities.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                {STATS.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.04] border border-[#B68A2E]/20 rounded-2xl px-5 py-3 text-center min-w-[110px] backdrop-blur-sm"
                  >
                    <p className="text-[#B68A2E] font-bold text-lg leading-tight m-0">
                      {stat.value}
                    </p>
                    <p className="text-white/45 text-xs mt-0.5 m-0">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-row gap-3">
                <button
                  onClick={() => setShowPopup(true)}
                  className="bg-gradient-to-r from-[#B68A2E] to-[#D4AF6A] hover:brightness-110 text-black font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm tracking-wide shadow-lg shadow-[#B68A2E]/20"
                >
                  Get Latest Price &amp; Floor Plans
                </button>
                <a
                  href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Damac%20Islands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm tracking-wide flex items-center justify-center gap-2"
                >
                  <FaWhatsapp /> WhatsApp Us
                </a>
              </div>
            </div>

            <div className="w-[420px] flex-shrink-0" id="enquire-desktop">
              <div className="bg-white/[0.04] backdrop-blur-md border border-[#B68A2E]/15 rounded-3xl p-8 shadow-2xl shadow-black/50">
                <div className="text-center mb-6">
                  <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-[#B68A2E] to-transparent rounded-full mx-auto mb-4" />
                  <h2 className="text-white font-semibold text-2xl">
                    Enquire Now
                  </h2>
                  <p className="text-white/45 text-sm mt-1">
                    Villas &amp; Townhouses from AED 2.75M
                  </p>
                </div>
                <DIContactForm />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50 pointer-events-none">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#B68A2E]" />
          <div className="w-2 h-2 bg-[#B68A2E] rounded-full animate-bounce" />
        </div>
      </div>

      {showPopup && <DIPopupModal onClose={() => setShowPopup(false)} />}
    </section>
  );
}
