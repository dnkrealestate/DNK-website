"use client";

import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const FAQS = [
  {
    q: "What unit types are available at Sorrento Lagoon Views?",
    a: "Sorrento Lagoon Views offers Studio and 1 Bedroom luxury apartments, starting from AED 680K.",
  },
  {
    q: "What payment plan is available?",
    a: "Sorrento Lagoon Views is offered on a 50/50 payment plan, with instalments from around AED 1,700 per month, plus a 4% DLD fee waiver. Contact our advisors for the full, current payment schedule.",
  },
  {
    q: "Where exactly is Damac Lagoons located?",
    a: "Damac Lagoons is located in Dubailand, Dubai, directly adjacent to the established Damac Hills community, with convenient access to Al Qudra Road and the wider Dubailand road network.",
  },
  {
    q: "What amenities are included at Damac Lagoons?",
    a: "The community features a wave pool, private beach, floating amphitheatre, floating bridge, Boho lounge and a waterfront clubhouse, among other resort-style amenities.",
  },
  {
    q: "How do I book a unit or get the latest pricing?",
    a: "Fill in the enquiry form on this page or WhatsApp/call DNK Real Estate directly — one of our advisors will send you the latest pricing, floor plans and availability.",
  },
];

export default function DLFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white py-16 lg:py-24 px-4" id="faq">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#0F766E] text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-[#151A19] text-3xl lg:text-4xl font-semibold">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className="border border-[#EBE8E2] rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[#151A19] font-medium text-sm lg:text-base">
                    {item.q}
                  </span>
                  <IoChevronDown
                    className={`text-[#B68A2E] flex-shrink-0 transition-transform duration-300 ${
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
                    <p className="text-[#5B6460] text-sm leading-relaxed px-5 pb-5">
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
