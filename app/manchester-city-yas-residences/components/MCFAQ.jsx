"use client";

import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const FAQS = [
  {
    q: "What is Manchester City Yas Residences?",
    a: "Manchester City Yas Residences by Ohana is a Manchester City–branded collection of waterfront villas, duplexes and townhouses on Yas Canal, Yas Island, Abu Dhabi.",
  },
  {
    q: "Where is the project located?",
    a: "The development sits on Yas Canal, Yas Island, Abu Dhabi — within walking distance of Yas Island's attractions and minutes from Ferrari World, Yas Marina Circuit and Etihad Arena.",
  },
  {
    q: "Who is developing Manchester City Yas Residences?",
    a: "The project is developed by Ohana Development, a private real estate developer in the Middle East with over 35 years of expertise and 9,000+ units delivered.",
  },
  {
    q: "What unit types are available?",
    a: "Townhouses (2 & 3 Bedroom), Duplexes (3 Bedroom) and Villas (4 & 5 Bedroom), each with private outdoor space on the canal.",
  },
  {
    q: "What is the starting price?",
    a: "Prices start from AED 3.5M*, subject to Ohana Development's official confirmation and unit selection.",
  },
  {
    q: "What is the payment plan?",
    a: "A 30/70 plan is available for UAE nationals (5% on SPA signing, 25% in instalments, 70% on completion), a 35/65 plan for non-UAE nationals, and a 25/75 full down payment option.",
  },
  {
    q: "What does SPA mean?",
    a: "SPA stands for Sale and Purchase Agreement — the official contract signed with Ohana Development that confirms your unit purchase. \"On SPA signing\" refers to the payment due when this agreement is signed.",
  },
  {
    q: "What is the Manchester City partnership?",
    a: "Ohana Development signed an agreement with Manchester City F.C. to bring the club's branding and standard of excellence to Yas Island, including a dedicated Training Academy, City Lounge, City Cafe, Match Day Terrace and Tactical Room.",
  },
  {
    q: "Is a Manchester City player really a homeowner here?",
    a: "Yes — Manchester City star Erling Haaland was announced as a homeowner at the development during its Phase 2 launch.",
  },
  {
    q: "Can foreign investors buy property here?",
    a: "Yas Island is a freehold area of Abu Dhabi, open to foreign ownership. Confirm the latest eligibility and process details with our advisors.",
  },
  {
    q: "Does registering guarantee a unit?",
    a: "No. Registering your interest on this page is an enquiry, not a payment or a reservation. Final allocation and pricing are confirmed directly by Ohana Development.",
  },
  {
    q: "How do I get the latest pricing and floor plans?",
    a: "Fill in the registration form on this page or WhatsApp/call DNK Real Estate directly — one of our advisors will send you the official price list, floor plans and payment plan breakdown.",
  },
];

export default function MCFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#0A0F1C] py-12 lg:py-20 px-4" id="faq">
      <div className="max-w-[800px] mx-auto">
        <p className="text-[#6CABDD] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2 justify-center">
          <span>08</span>
          <span className="w-8 h-px bg-[#6CABDD]" />
          <span>FAQ</span>
        </p>
        <h2 className="text-white text-3xl lg:text-4xl font-extrabold text-center mb-10">
          Manchester City Yas Residences: Your Questions Answered
        </h2>

        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-white font-medium text-sm lg:text-base">
                    {item.q}
                  </span>
                  <IoChevronDown
                    className={`text-[#6CABDD] flex-shrink-0 transition-transform duration-300 ${
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
                    <p className="text-white/60 text-sm leading-relaxed pb-5">
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
