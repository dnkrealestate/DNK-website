"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoCheckmarkCircleOutline, IoLockClosedOutline } from "react-icons/io5";

const STAGES = [
  { label: "Down Payment", due: "On Booking", percent: 10 },
  { label: "1st Instalment", due: "April 2027", percent: 10 },
  { label: "2nd Instalment", due: "September 2027", percent: 10 },
  { label: "3rd Instalment", due: "February 2028", percent: 10 },
  { label: "4th Instalment", due: "July 2028", percent: 10 },
  { label: "5th Instalment", due: "December 2028", percent: 5 },
  { label: "6th Instalment", due: "May 2029", percent: 5 },
  { label: "Handover", due: "October 2030", percent: 40 },
];

const UNITS = [
  { label: "3BR Townhouse", sub: "Mid Unit", priceAed: 3_800_000 },
  { label: "4BR Townhouse", sub: "Type 1", priceAed: 4_600_000 },
  { label: "4BR Townhouse", sub: "Type 2", priceAed: 5_200_000 },
  { label: "4BR Villa", sub: "Standalone", priceAed: 7_000_000 },
  { label: "5BR Villa", sub: "Standalone", priceAed: 8_900_000 },
];

function formatAed(aed) {
  return aed.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

export default function PSPaymentPlan({ onOpenEnquiry }) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const checkUnlocked = () => {
      try {
        setUnlocked(window.localStorage.getItem("ps_lead_registered") === "true");
      } catch {}
    };
    checkUnlocked();
    window.addEventListener("ps-lead-registered", checkUnlocked);
    return () => window.removeEventListener("ps-lead-registered", checkUnlocked);
  }, []);

  return (
    <section className="bg-[#F7F5EF] py-16 sm:py-24 px-5 sm:px-8 scroll-mt-24" id="payment-plan">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <p className="text-[#A9874F] text-xs font-bold tracking-[0.2em] uppercase mb-3">
              Payment Plan
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[#1C211F] text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 max-w-[640px]">
              60% Before Handover, 40% on Handover
            </h2>
            <p className="text-[#4B534E] max-w-[600px] leading-relaxed">
              The advertised instalment schedule below, with estimated
              completion in October 2030. A DLD fee of 4% of the unit value
              applies, along with additional admin charges.
            </p>
          </div>
          <button
            onClick={() =>
              onOpenEnquiry({
                title: "Request the Payment Plan",
                interest: "Payment Plan",
                ctaLabel: "Request the Payment Plan",
              })
            }
            className="bg-gradient-to-r from-[#C6A66B] to-[#A9874F] hover:brightness-110 text-[#011945] font-bold px-6 py-3.5 rounded-sm text-sm whitespace-nowrap transition-all self-start"
          >
            Request the Payment Plan
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-10">
          {STAGES.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`p-4 border ${
                s.label === "Handover" ? "bg-[#011945] border-[#011945] text-white" : "bg-white border-[#1C211F]/10 text-[#1C211F]"
              }`}
            >
              <p className={`font-[family-name:var(--font-body)] text-lg font-bold mb-1 ${s.label === "Handover" ? "text-[#E4C98C]" : "text-[#A9874F]"}`}>
                {s.percent}%
              </p>
              <p className="text-xs font-semibold leading-snug">{s.label}</p>
              <p className={`text-[0.65rem] mt-0.5 ${s.label === "Handover" ? "text-white/50" : "text-[#8A8F8B]"}`}>{s.due}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative bg-white border border-[#1C211F]/10 overflow-hidden mb-8">
          <div className={`overflow-x-auto ${unlocked ? "" : "blur-sm select-none pointer-events-none"}`}>
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="border-b border-[#1C211F]/10">
                  <th className="text-left font-semibold text-[#8A8F8B] text-xs uppercase tracking-wider p-4">Stage</th>
                  <th className="text-left font-semibold text-[#8A8F8B] text-xs uppercase tracking-wider p-4">Due</th>
                  {UNITS.map((u) => (
                    <th key={`${u.label}-${u.sub}`} className="text-right font-semibold text-[#8A8F8B] text-[0.65rem] uppercase tracking-wider p-4 whitespace-nowrap">
                      {u.label}
                      <span className="block font-normal normal-case text-[#8A8F8B]/70">{u.sub}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STAGES.map((s) => (
                  <tr key={s.label} className="border-b border-[#1C211F]/8 last:border-b-0">
                    <td className="p-4 font-semibold text-[#1C211F] whitespace-nowrap">{s.label}</td>
                    <td className="p-4 text-[#4B534E] whitespace-nowrap">{s.due}</td>
                    {UNITS.map((u) => (
                      <td key={`${u.label}-${u.sub}`} className="p-4 text-right font-[family-name:var(--font-body)] font-bold text-[#1C211F] tabular-nums whitespace-nowrap">
                        {unlocked ? formatAed((u.priceAed * s.percent) / 100) : "AED •••,•••"}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-[#F7F5EF]">
                  <td className="p-4 font-bold text-[#1C211F]">Total</td>
                  <td className="p-4 text-[#4B534E]">100%</td>
                  {UNITS.map((u) => (
                    <td key={`${u.label}-${u.sub}`} className="p-4 text-right font-[family-name:var(--font-body)] font-extrabold text-[#1C211F] tabular-nums whitespace-nowrap">
                      {unlocked ? formatAed(u.priceAed) : "AED •••,•••"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {!unlocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/30">
              <div className="flex flex-col items-center gap-3 bg-white border border-[#1C211F]/10 shadow-xl px-7 py-6 text-center max-w-[320px] mx-4">
                <span className="w-11 h-11 rounded-full bg-[#1C211F]/5 flex items-center justify-center text-[#1C211F] text-lg">
                  <IoLockClosedOutline />
                </span>
                <p className="text-[#1C211F] font-semibold text-sm">
                  Register to view exact instalment amounts
                </p>
                <button
                  onClick={() =>
                    onOpenEnquiry({
                      title: "Request the Payment Plan",
                      interest: "Payment Plan",
                      ctaLabel: "Unlock Pricing",
                    })
                  }
                  className="bg-gradient-to-r from-[#C6A66B] to-[#A9874F] hover:brightness-110 text-[#011945] font-bold px-5 py-2.5 rounded-sm text-xs transition-all"
                >
                  Unlock Pricing
                </button>
              </div>
            </div>
          )}
        </div>

        <ul className="space-y-2">
          <li className="flex items-start gap-3 text-sm text-[#4B534E]">
            <IoCheckmarkCircleOutline className="text-[#A9874F] text-lg flex-shrink-0 mt-0.5" />
            All amounts above are in AED, calculated from the advertised starting price for each unit type.
          </li>
          <li className="flex items-start gap-3 text-sm text-[#4B534E]">
            <IoCheckmarkCircleOutline className="text-[#A9874F] text-lg flex-shrink-0 mt-0.5" />
            Swimming pools and landscape features are not included and are the end user&apos;s responsibility.
          </li>
          <li className="flex items-start gap-3 text-sm text-[#4B534E]">
            <IoCheckmarkCircleOutline className="text-[#A9874F] text-lg flex-shrink-0 mt-0.5" />
            Figures are as advertised and remain subject to final confirmation by Nakheel.
          </li>
        </ul>
      </div>
    </section>
  );
}
