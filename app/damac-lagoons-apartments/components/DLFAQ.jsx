"use client";

import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const FAQS = [
  {
    q: "What is Sorrento at Damac Lagoons?",
    a: "Sorrento Lagoon Views is a new collection of Studio and 1-Bedroom apartments within Damac Lagoons, Dubailand — \"a new chapter in Mediterranean living.\"",
  },
  {
    q: "Where is Sorrento located in Dubai?",
    a: "Sorrento is located within Damac Lagoons in Dubailand, Dubai, close to the established Damac Hills community, with Downtown Dubai and Palm Jumeirah within approximately half an hour.",
  },
  {
    q: "Who is developing Sorrento?",
    a: "Sorrento is developed by Damac Properties, one of Dubai's best-known developers of branded communities including Damac Hills, Damac Hills 2 and Damac Lagoons.",
  },
  {
    q: "What apartments are available at Sorrento?",
    a: "Sorrento offers Studio and 1-Bedroom luxury apartments.",
  },
  {
    q: "What is the starting price of Sorrento at Damac Lagoons?",
    a: "Prices start from AED 680,000*, subject to Damac's official confirmation.",
  },
  {
    q: "When is the Sorrento launch expected?",
    a: "Sorrento is a newly launched phase with EOI (Expression of Interest) currently open. Contact our advisors for the latest launch and availability updates.",
  },
  {
    q: "What is the Sorrento payment plan?",
    a: "The advertised structure is a 50/50 payment plan*, with a 4% DLD fee waiver. The exact instalment schedule is confirmed in Damac's official plan; contact our advisors for the full breakdown.",
  },
  {
    q: "What does an Expression of Interest (EOI) mean?",
    a: "An EOI is a non-binding registration of interest that lets Damac and our advisors know you'd like to be considered for a unit and kept updated — it is not a payment or a reservation.",
  },
  {
    q: "Does registering guarantee an apartment?",
    a: "No. EOI submission does not guarantee unit allocation. Payment instructions, refundability and allocation priority are subject to Damac's official terms.",
  },
  {
    q: "Can foreign investors buy property at Sorrento?",
    a: "Damac Lagoons sits in a freehold area of Dubai, open to foreign ownership. Confirm the latest eligibility and process details with our advisors.",
  },
  {
    q: "What amenities are included at Damac Lagoons?",
    a: "The community features a wave pool, private beach, floating amphitheatre, floating bridge, Boho lounge and a waterfront clubhouse, among other resort-style amenities.",
  },
  {
    q: "How do I book a unit or get the latest pricing?",
    a: "Fill in the registration form on this page or WhatsApp/call DNK Real Estate directly — one of our advisors will send you the latest pricing, floor plans and availability.",
  },
];

export default function DLFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white py-16 lg:py-24 px-4" id="faq">
      <div className="max-w-[800px] mx-auto">
        <p className="text-[#1C6B82] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2 justify-center">
          <span>13</span>
          <span className="w-8 h-px bg-[#1C6B82]" />
          <span>FAQ</span>
        </p>
        <h2 className="text-[#151A19] text-3xl lg:text-4xl font-extrabold text-center mb-10">
          Sorrento at Damac Lagoons: Your Questions Answered
        </h2>

        <div className="divide-y divide-[#E5E0D5] border-t border-b border-[#E5E0D5]">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[#151A19] font-medium text-sm lg:text-base">
                    {item.q}
                  </span>
                  <IoChevronDown
                    className={`text-[#1C6B82] flex-shrink-0 transition-transform duration-300 ${
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
                    <p className="text-[#5B6460] text-sm leading-relaxed pb-5">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
