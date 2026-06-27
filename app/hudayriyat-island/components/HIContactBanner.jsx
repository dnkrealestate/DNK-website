"use client";

import React from "react";
import { MdStar } from "react-icons/md";
import HIContactForm from "./HIContactForm";

const BENEFITS = [
  "Exclusive floor plans & unit pricing",
  "Priority selection before public launch",
  "Expert guidance from certified property advisors",
  "Zero commission — developer direct pricing",
];

export default function HIContactBanner() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      id="contact"
      style={{
        background:
          "linear-gradient(180deg, #091825 0%, #0D2035 50%, #091825 100%)",
      }}
    >
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-[#C4973D]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

          {/* ── Left: copy ── */}
          <div className="flex-1 text-center lg:text-left">
            {/* Stars */}
            <div className="flex items-center gap-1 justify-center lg:justify-start mb-4">
              {[...Array(5)].map((_, i) => (
                <MdStar key={i} className="text-[#C4973D] text-xl" />
              ))}
            </div>

            <p className="text-[#C4973D] text-xs font-semibold tracking-widest uppercase mb-3">
              Limited Availability
            </p>
            <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Secure Your
              <br />
              <span className="text-[#C4973D]">Waterfront Home Today</span>
            </h2>
            <p className="text-[#8BA4BC] text-base leading-relaxed mb-8">
              Units at Hudayriyat Island are selling fast. Register your
              interest now to receive exclusive floor plans, pricing, and
              priority access to the best waterfront views.
            </p>

            {/* Benefits */}
            <div className="space-y-3">
              {BENEFITS.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 justify-center lg:justify-start"
                >
                  <div className="w-5 h-5 rounded-full bg-[#C4973D] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="w-full lg:w-[440px] flex-shrink-0">
            <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl shadow-black/40">
              <div className="text-center mb-6">
                <div className="w-10 h-0.5 bg-[#C4973D] rounded-full mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl">
                  Get Exclusive Details
                </h3>
                <p className="text-white/50 text-sm mt-1">
                  Our expert will contact you within 24 hours
                </p>
              </div>
              <HIContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
