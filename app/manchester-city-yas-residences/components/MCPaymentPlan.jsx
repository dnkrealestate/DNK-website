"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import MCPopupModal from "./MCPopupModal";

const PLANS = [
  {
    id: "30-70",
    tab: "30/70",
    subtitle: "UAE Nationals",
    split: ["30", "70"],
    rows: [
      { label: "On SPA Signing", value: "5%" },
      { label: "5 installments of 5% — Feb 2027 to Jan 2029", value: "25%" },
      { label: "On Completion", value: "70%" },
    ],
  },
  {
    id: "35-65",
    tab: "35/65",
    subtitle: "Non-UAE Nationals",
    split: ["35", "65"],
    rows: [
      { label: "On SPA Signing", value: "5%" },
      { label: "7 installments of 5% — Feb 2027 to Jul 2029", value: "30%" },
      { label: "On Completion", value: "65%" },
    ],
  },
  {
    id: "25-75",
    tab: "25/75",
    subtitle: "Full Down Payment",
    split: ["25", "75"],
    rows: [
      { label: "On SPA Signing", value: "10%" },
      { label: "In February 2027", value: "15%" },
      { label: "On Completion", value: "75%" },
    ],
  },
];

export default function MCPaymentPlan() {
  const [activeId, setActiveId] = useState("30-70");
  const [showPopup, setShowPopup] = useState(false);
  const active = PLANS.find((p) => p.id === activeId);

  return (
    <section className="relative bg-[#070C16] pb-12 lg:pb-20 px-4 overflow-hidden" id="payment-plan">
      <Image
        src="/assets/manchester-city-yas/renders/bg-gradient-blue.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25 pointer-events-none"
      />
      <div className="relative max-w-[900px] mx-auto">
        <p className="text-[#6CABDD] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
          <span>03</span>
          <span className="w-8 h-px bg-[#6CABDD]" />
          <span>Payment Plan</span>
        </p>
        <h2 className="text-white text-3xl lg:text-4xl font-extrabold mb-8 max-w-[640px]">
          A Payment Plan Built Around You
        </h2>

        <div className="flex gap-2 mb-8">
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setActiveId(plan.id)}
              className={`flex-1 rounded-2xl border px-4 py-3.5 text-center transition-all ${
                activeId === plan.id
                  ? "border-[#6CABDD] bg-[#6CABDD]/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/25"
              }`}
            >
              <p className="text-white font-extrabold text-lg">{plan.tab}</p>
              <p className="text-white/50 text-[0.65rem] uppercase tracking-wider mt-0.5">
                {plan.subtitle}
              </p>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid sm:grid-cols-2 gap-8 mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-white text-6xl font-black">{active.split[0]}</span>
                <span className="text-[#6CABDD] text-3xl font-bold">%</span>
                <span className="text-white/50 text-sm ml-2">
                  During the
                  <br />
                  construction period
                </span>
              </div>
              <div className="flex items-baseline gap-2 sm:border-l sm:border-white/10 sm:pl-8">
                <span className="text-white text-6xl font-black">{active.split[1]}</span>
                <span className="text-[#6CABDD] text-3xl font-bold">%</span>
                <span className="text-white/50 text-sm ml-2">
                  On
                  <br />
                  completion
                </span>
              </div>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10 mb-8">
              {active.rows.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 py-4">
                  <p className="text-white/70 text-sm">{row.label}</p>
                  <p className="text-[#6CABDD] font-bold">{row.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mb-8">
          <span className="border border-white/15 text-white/50 text-xs font-semibold rounded-full px-4 py-1.5 flex items-center gap-2 text-center">
            Indicative plan, subject to Ohana Development's official SPA
            (Sale and Purchase Agreement) terms.
          </span>
        </div>

        <div className="bg-gradient-to-r from-[#0D1424] to-[#1A3A5C] border border-white/10 rounded-2xl p-6 sm:p-8 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-[#6CABDD]/15 flex items-center justify-center flex-shrink-0">
            <span className="text-[#6CABDD] text-lg font-extrabold">5%</span>
          </div>
          <div className="flex-1">
            <p className="text-white text-lg font-extrabold mb-1">
              Starting From AED 3.5M*
            </p>
            <p className="text-white/60 text-sm">
              Just 5% on SPA signing to secure your waterfront residence on
              Yas Canal.
            </p>
          </div>
          <button
            onClick={() => setShowPopup(true)}
            className="hidden sm:block bg-gradient-to-r from-[#6CABDD] to-[#4E8FC4] hover:brightness-110 text-[#07101E] font-bold px-5 py-2.5 rounded-full text-sm transition-all whitespace-nowrap"
          >
            Get Full Breakdown
          </button>
        </div>
        <button
          onClick={() => setShowPopup(true)}
          className="sm:hidden w-full mt-4 bg-gradient-to-r from-[#6CABDD] to-[#4E8FC4] text-[#07101E] font-bold px-5 py-3 rounded-full text-sm transition-all"
        >
          Get Full Breakdown
        </button>
      </div>

      {showPopup && <MCPopupModal onClose={() => setShowPopup(false)} />}
    </section>
  );
}
