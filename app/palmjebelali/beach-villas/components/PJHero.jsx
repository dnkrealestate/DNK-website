"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import PJContactForm from "./PJContactForm";
import PJPopupModel from "./PJPopupModel";

const STATS = [
  { value: "5 – 6 BR", label: "Beach Villas" },
  { value: "AED 30M+", label: "Starting From" },
  { value: "8,600 sqft", label: "Max BUA" },
  { value: "AED 1M", label: "EOI" },
];

function HeroVideoBg() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #05070A 0%, #0A1416 35%, #0F2224 65%, #123531 100%)",
        }}
      />
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/other/bannerVideo.webm" type="video/webm" />
      </video>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 100%, rgba(121,100,74,0.16) 0%, rgba(121,100,74,0) 60%)",
        }}
      />
      <div className="absolute left-0 right-0 top-[62%] h-px bg-gradient-to-r from-transparent via-[#79644A]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
    </>
  );
}

export default function PJHero() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section className="relative">
      {/* ============ Mobile / tablet: video shows just the headline ============ */}
      <div className="lg:hidden relative h-[62vh] min-h-[420px] flex items-center overflow-hidden">
        <HeroVideoBg />
        <div className="relative z-10 w-full px-4 text-center">
          <p className="text-[#C4A57F] text-[0.65rem] font-semibold tracking-[0.25em] uppercase mb-3">
            Inspired by Palm Jumeirah
          </p>
          <h1
            className="leading-[0.95] font-semibold"
            style={{ fontFamily: "var(--font-pj-display), serif" }}
          >
            <span className="block text-4xl sm:text-5xl text-white tracking-tight">
              Beach Villas
            </span>
            <span className="block text-xl sm:text-2xl text-[#C4A57F] tracking-tight mt-1 italic">
              Your Private Shoreline
            </span>
          </h1>
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50 pointer-events-none">
          <div className="w-px h-6 bg-gradient-to-b from-transparent to-[#79644A]" />
          <div className="w-1.5 h-1.5 bg-[#79644A] rounded-full animate-bounce" />
        </div>
      </div>

      {/* Mobile / tablet: details live in a separate block below the video */}
      <div className="lg:hidden bg-[#0A0C0E] px-4 pt-8 pb-10">
        <p className="text-white/55 text-sm leading-relaxed mb-6 text-center">
          Exclusive Villas on Palm Jebel Ali
          5–6 Bedroom Beach Villas and 6–7 Bedroom Coral Villas
          Private beach access, panoramic sea views, spacious layouts and exceptional waterfront living on Dubai’s iconic new Palm.
        </p>

        <div className="grid grid-cols-2 gap-2.5 mb-6">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="bg-white/[0.04] border border-[#79644A]/20 rounded-2xl px-3 py-2.5 text-center"
            >
              <p className="text-[#C4A57F] font-bold text-base leading-tight m-0">
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
            className="bg-gradient-to-r from-[#79644A] to-[#9C8564] hover:brightness-110 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm tracking-wide shadow-lg shadow-[#79644A]/20"
          >
            Register Your Interest
          </button>
          <a
            href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Palm%20Jebel%20Ali%20Beach%20Villas"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm tracking-wide flex items-center justify-center gap-2"
          >
            <FaWhatsapp /> WhatsApp Us
          </a>
        </div>

        <div className="bg-white/[0.04] border border-[#79644A]/15 rounded-3xl p-5">
          <div className="text-center mb-5">
            <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-[#79644A] to-transparent rounded-full mx-auto mb-3" />
            <h2
              className="text-white font-semibold text-xl"
              style={{ fontFamily: "var(--font-pj-display), serif" }}
            >
              Reserve Your Villa
            </h2>
            <p className="text-white/45 text-xs mt-1">
              EOI from AED 1,000,000 · Limited beachfront plots
            </p>
          </div>
          <PJContactForm unitInterest="Beach Villas" />
        </div>
      </div>

      {/* ============ Desktop: everything together in the video hero ============ */}
      <div className="hidden lg:flex relative min-h-screen items-center overflow-hidden">
        <HeroVideoBg />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 pt-40 pb-28">
          <div className="flex flex-row items-center gap-16">
            <div className="flex-1 text-left">
              <p className="text-[#C4A57F] text-sm font-semibold tracking-[0.3em] uppercase mb-4">
                Inspired by Palm Jumeirah
              </p>

              <h1
                className="leading-[0.95] mb-5 font-semibold"
                style={{ fontFamily: "var(--font-pj-display), serif" }}
              >
                <span className="block text-[5.5rem] text-white tracking-tight">
                  Beach Villas
                </span>
                <span className="block text-5xl text-[#C4A57F] tracking-tight mt-1 italic">
                  Your Private Shoreline
                </span>
              </h1>

              <p className="text-white/55 text-lg mb-8 max-w-[520px] leading-relaxed">
                Exclusive Villas on Palm Jebel Ali
                5–6 Bedroom Beach Villas and 6–7 Bedroom Coral Villas
                Private beach access, panoramic sea views, spacious layouts and exceptional waterfront living on Dubai’s iconic new Palm.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                {STATS.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.04] border border-[#79644A]/20 rounded-2xl px-5 py-3 text-center min-w-[110px] backdrop-blur-sm"
                  >
                    <p className="text-[#C4A57F] font-bold text-lg leading-tight m-0">
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
                  className="bg-gradient-to-r from-[#79644A] to-[#9C8564] hover:brightness-110 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm tracking-wide shadow-lg shadow-[#79644A]/20"
                >
                  Register Your Interest
                </button>
                <a
                  href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Palm%20Jebel%20Ali%20Beach%20Villas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm tracking-wide flex items-center justify-center gap-2"
                >
                  <FaWhatsapp /> WhatsApp Us
                </a>
              </div>
            </div>

            <div className="w-[420px] flex-shrink-0" id="contact-hero">
              <div className="bg-white/[0.04] backdrop-blur-md border border-[#79644A]/15 rounded-3xl p-8 shadow-2xl shadow-black/50">
                <div className="text-center mb-6">
                  <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-[#79644A] to-transparent rounded-full mx-auto mb-4" />
                  <h2
                    className="text-white font-semibold text-2xl"
                    style={{ fontFamily: "var(--font-pj-display), serif" }}
                  >
                    Reserve Your Villa
                  </h2>
                  <p className="text-white/45 text-sm mt-1">
                    EOI from AED 1,000,000 · Limited beachfront plots
                  </p>
                </div>
                <PJContactForm unitInterest="Beach Villas" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50 pointer-events-none">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#79644A]" />
          <div className="w-2 h-2 bg-[#79644A] rounded-full animate-bounce" />
        </div>
      </div>

      {showPopup && (
        <PJPopupModel unitInterest="Beach Villas" onClose={() => setShowPopup(false)} />
      )}
    </section>
  );
}
