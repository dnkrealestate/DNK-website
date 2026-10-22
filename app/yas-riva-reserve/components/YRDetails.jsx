"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IoCheckmarkCircle, IoChevronDown } from "react-icons/io5";
import YRPopupModal from "./YRPopupModal";

const TABS = ["Payment Plan", "Developer", "FAQ"];

const PAYMENT_STEPS = [
  { label: "On Booking", value: "5%", note: "No mortgage pre-approval required" },
  { label: "During Construction", value: "Instalments", note: "Full schedule shared on request" },
  { label: "On Handover", value: "Balance", note: "Handover timing shared with the schedule" },
];

const DEV_STATS = [
  { value: "2004", label: "Founded, listed on ADX" },
  { value: "155,000+", label: "Residential units managed" },
  { value: "4", label: "Flagship Abu Dhabi communities" },
  { value: "AED 40.6Bn", label: "FY2025 sales" },
];

const FAQS = [
  { q: "What is Yas Riva Reserve?", a: "Yas Riva Reserve by Aldar is a gated community of 292 villas on north-east Yas Island, Abu Dhabi — inland and waterfront, with canal frontage and large plots." },
  { q: "Is it part of Yas Riva?", a: "No. It is a separate gated community with its own launch, directly opposite Yas Riva (Aldar's 2024 launch, now under construction). Aldar calls it the next chapter of Yas Riva." },
  { q: "What villa types are available?", a: "4, 5 and 6 bedroom inland villas, and 5 and 6 bedroom waterfront villas. Every waterfront villa can add a pontoon." },
  { q: "What is the starting price?", a: "Prices start from AED 7.9M for a 4-bedroom inland villa, subject to Aldar's official confirmation." },
  { q: "Can I keep a boat?", a: "Yes — waterfront villas offer the option to add a pontoon on the canal." },
  { q: "Can I register remotely, outside the UAE?", a: "Yes. You can register and be guided through the process via email, WhatsApp or phone call." },
  { q: "Is there a confirmed handover date?", a: "Not yet published. Aldar will share handover timing together with the full payment schedule." },
  { q: "Does registering guarantee a villa?", a: "No. Registering your interest is an enquiry, not a payment or a reservation. Final allocation and pricing are confirmed directly by Aldar." },
];

export default function YRDetails() {
  const [tab, setTab] = useState("Payment Plan");
  const [showPopup, setShowPopup] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="bg-white py-16 lg:py-28 px-5 sm:px-8" id="details">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[#96713F] text-xs font-bold tracking-[0.2em] uppercase mb-3">
          07 &mdash; Details
        </p>

        <div className="flex items-center gap-8 border-b border-[#E5DCC9] mb-10 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative pb-4 whitespace-nowrap font-[family-name:var(--font-display)] text-xl sm:text-3xl font-medium transition-colors ${
                tab === t ? "text-[#1C1915]" : "text-[#1C1915]/35 hover:text-[#1C1915]/60"
              }`}
            >
              {t}
              {tab === t && (
                <motion.span
                  layoutId="details-underline"
                  className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#96713F]"
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            {tab === "Payment Plan" && (
              <div>
                <div className="relative pl-10 space-y-10 mb-10">
                  <span className="absolute left-[7px] top-2 bottom-2 w-px bg-[#E5DCC9]" />
                  {PAYMENT_STEPS.map((step) => (
                    <div key={step.label} className="relative">
                      <span className="absolute -left-10 top-1.5 w-[15px] h-[15px] rounded-full bg-[#96713F] ring-4 ring-white" />
                      <p className="text-[#1C1915] font-semibold">{step.label}</p>
                      <p className="font-[family-name:var(--font-display)] text-[#96713F] text-3xl font-semibold my-1">
                        {step.value}
                      </p>
                      <p className="text-[#8A8275] text-sm">{step.note}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-[#F3EDE3] rounded-sm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
                  <div>
                    <p className="text-[#1C1915] font-bold mb-1">5-Year Service Charge Waiver</p>
                    <p className="text-[#5B5547] text-sm">
                      Plus a 2% ADM fee waiver &mdash; launch terms confirmed by Aldar.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPopup(true)}
                    className="bg-gradient-to-r from-[#B08D57] to-[#96713F] text-white font-semibold px-6 py-3 text-sm whitespace-nowrap"
                  >
                    Get Full Breakdown
                  </button>
                </div>
              </div>
            )}

            {tab === "Developer" && (
              <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 items-center">
                <div className="relative aspect-[4/3] order-2 md:order-1">
                  <Image
                    src="/assets/yas-riva-reserve/hero/hero-2.webp"
                    alt="Villa architecture at Yas Riva Reserve"
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <Image
                    src="/assets/yas-riva-reserve/logos/logo-aldar-ink.svg"
                    alt="Aldar Properties"
                    width={461}
                    height={461}
                    className="h-12 w-auto mb-6"
                  />
                  <p className="text-[#5B5547] leading-relaxed mb-8 max-w-[440px]">
                    Abu Dhabi's largest listed real estate developer, behind
                    master-planned communities across Yas Island, Saadiyat
                    Island, Al Raha Beach and Reem Island &mdash; publicly
                    listed on the Abu Dhabi Securities Exchange since 2005.
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                    {DEV_STATS.map((stat) => (
                      <div key={stat.label}>
                        <p className="font-[family-name:var(--font-display)] text-[#96713F] text-2xl font-semibold">
                          {stat.value}
                        </p>
                        <p className="text-[#5B5547] text-xs mt-0.5">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "FAQ" && (
              <div className="divide-y divide-[#E5DCC9] border-t border-b border-[#E5DCC9]">
                {FAQS.map((item, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={item.q}>
                      <button
                        onClick={() => setOpenFaq(isOpen ? -1 : i)}
                        className="w-full flex items-center justify-between gap-4 py-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="text-[#1C1915] font-medium text-sm sm:text-base">{item.q}</span>
                        <IoChevronDown
                          className={`text-[#96713F] flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-[#5B5547] text-sm leading-relaxed pb-5 flex items-start gap-2">
                            <IoCheckmarkCircle className="text-[#96713F] flex-shrink-0 mt-0.5" />
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {showPopup && <YRPopupModal onClose={() => setShowPopup(false)} />}
    </section>
  );
}
