"use client";

import React, { useState } from "react";
import DLPopupModal from "./DLPopupModal";

export default function DLPaymentPlan() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section className="bg-[#F5F1E8] pb-16 lg:pb-24 px-4" id="payment-plan">
      <div className="max-w-[1000px] mx-auto">
        <p className="text-[#1C6B82] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
          <span>07</span>
          <span className="w-8 h-px bg-[#1C6B82]" />
          <span>Payment Plan</span>
        </p>
        <h2 className="text-[#151A19] text-3xl lg:text-4xl font-extrabold mb-10 max-w-[600px]">
          Sorrento at Damac Lagoons Payment Plan
        </h2>

        <div className="grid sm:grid-cols-2 gap-8 mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-[#151A19] text-6xl font-black">50</span>
            <span className="text-[#1C6B82] text-3xl font-bold">%</span>
            <span className="text-[#5B6460] text-sm ml-2">
              During the
              <br />
              payment schedule
            </span>
          </div>
          <div className="flex items-baseline gap-2 sm:border-l sm:border-[#E5E0D5] sm:pl-8">
            <span className="text-[#151A19] text-6xl font-black">50</span>
            <span className="text-[#1C6B82] text-3xl font-bold">%</span>
            <span className="text-[#5B6460] text-sm ml-2">
              According to the
              <br />
              developer's final terms
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-0 rounded-2xl overflow-hidden mb-4">
          <div className="bg-[#0D1210] text-white p-5">
            <p className="text-2xl font-extrabold">50%</p>
            <p className="text-white/60 text-xs mt-1">
              Instalment dates confirmed in Damac's official plan
            </p>
          </div>
          <div className="bg-[#1C6B82] text-white p-5">
            <p className="text-2xl font-extrabold">50%</p>
            <p className="text-white/80 text-xs mt-1">
              Timing of the second 50% not yet published
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <span className="border border-[#1C6B82] text-[#1C6B82] text-xs font-bold rounded-full px-4 py-1.5 flex items-center gap-2">
            EXPECTED
            <span className="text-[#5B6460] font-normal normal-case">
              50/50 is the advertised structure, subject to Damac's confirmation.
            </span>
          </span>
        </div>

        <div className="bg-gradient-to-r from-[#0D1210] to-[#1C6B82] rounded-2xl p-6 sm:p-8 flex items-center gap-5 mb-8">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg font-extrabold">0%</span>
          </div>
          <div>
            <p className="text-white text-lg font-extrabold mb-1">
              4% DLD Fee Waiver
            </p>
            <p className="text-white/70 text-sm">
              Damac covers the 4% Dubai Land Department registration fee,
              so you pay no DLD fee on your Sorrento apartment.
            </p>
          </div>
        </div>

        <div className="divide-y divide-[#E5E0D5] border-y border-[#E5E0D5]">
          {["Studio Apartments", "1-Bedroom Apartments"].map((label) => (
            <div key={label} className="flex items-center justify-between gap-4 py-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg border border-[#D8D4CC] flex items-center justify-center text-[#8A8F8B] text-[0.6rem] font-bold">
                  PDF
                </span>
                <p className="text-[#151A19] font-semibold">{label}</p>
              </div>
              <button
                onClick={() => setShowPopup(true)}
                className="bg-[#1C6B82] hover:bg-[#17596C] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors whitespace-nowrap"
              >
                Request Full Payment Breakdown
              </button>
            </div>
          ))}
        </div>

        <p className="text-[#8A8F8B] text-xs text-center mt-6">
          The 4% DLD registration fee is waived; plan excludes DLD admin and
          trustee office fees.{" "}
          <button onClick={() => setShowPopup(true)} className="underline">
            Ask our advisor on WhatsApp
          </button>
        </p>
      </div>

      {showPopup && <DLPopupModal onClose={() => setShowPopup(false)} />}
    </section>
  );
}
