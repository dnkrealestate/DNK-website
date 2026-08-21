"use client";

import React from "react";
import { MdStar } from "react-icons/md";
import PJContactForm from "./PJContactForm";

const BENEFITS = [
  "Priority access to the best beachfront plots",
  "Exclusive floor plans & pricing before public launch",
  "Dedicated advisor throughout the EOI process",
  "Zero commission — direct developer pricing",
];

export default function PJContactBanner() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      id="contact"
      style={{
        background:
          "linear-gradient(180deg, #05070A 0%, #0F2224 50%, #05070A 100%)",
      }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-[#79644A]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left: copy */}
          <div className="flex-1 text-left">
            <div className="flex items-center gap-1 justify-start mb-4">
              {[...Array(5)].map((_, i) => (
                <MdStar key={i} className="text-[#C4A57F] text-xl" />
              ))}
            </div>

            <p className="text-[#C4A57F] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Limited Availability
            </p>
            <h2
              className="text-white text-3xl lg:text-4xl mb-4 leading-tight font-semibold"
              style={{ fontFamily: "var(--font-pj-display), serif" }}
            >
              Secure Your Place on
              <br />
              <span className="text-[#C4A57F] italic">Palm Jebel Ali</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              Beachfront plots on Palm Jebel Ali are among the most sought
              after in Dubai. Register your Expression of Interest now to
              receive priority allocation, exclusive floor plans, and
              personal guidance from our advisory team.
            </p>

            <div className="space-y-3">
              {BENEFITS.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 justify-start"
                >
                  <div className="w-5 h-5 rounded-full bg-[#79644A] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">
                      ✓
                    </span>
                  </div>
                  <span className="text-white/65 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="w-full lg:w-[440px] flex-shrink-0">
            <div className="bg-white/[0.04] border border-[#79644A]/15 rounded-3xl p-6 lg:p-8 shadow-2xl shadow-black/50">
              <div className="text-center mb-6">
                <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-[#79644A] to-transparent rounded-full mx-auto mb-4" />
                <h3
                  className="text-white font-semibold text-2xl"
                  style={{ fontFamily: "var(--font-pj-display), serif" }}
                >
                  Register Your EOI
                </h3>
                <p className="text-white/45 text-sm mt-1">
                  Our advisor will contact you within 24 hours
                </p>
              </div>
              <PJContactForm unitInterest="Beach Villas" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
