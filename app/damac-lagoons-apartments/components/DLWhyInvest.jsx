import React from "react";
import { FaWater, FaChartLine, FaShieldAlt, FaHandHoldingUsd } from "react-icons/fa";

const REASONS = [
  {
    icon: FaWater,
    title: "Resort-Style Living, Every Day",
    text: "A Mediterranean-inspired lagoon community with private beaches, wave pools and lush landscaping — not just an apartment, a lifestyle.",
  },
  {
    icon: FaChartLine,
    title: "Growing Dubailand District",
    text: "Part of one of Dubai's largest master-planned districts, with ongoing infrastructure and community development around Damac Lagoons.",
  },
  {
    icon: FaHandHoldingUsd,
    title: "Flexible Payment Options",
    text: "Damac typically structures off-plan payment plans across the construction period — ask our advisors for the exact plan currently on offer.",
  },
  {
    icon: FaShieldAlt,
    title: "Trusted Developer",
    text: "Backed by Damac Properties, with an established track record delivering master-planned residential communities across the UAE.",
  },
];

export default function DLWhyInvest() {
  return (
    <section className="bg-[#F7F5F1] py-16 lg:py-24 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#0F766E] text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            Why Lagoon Views
          </p>
          <h2 className="text-[#151A19] text-3xl lg:text-4xl font-semibold">
            Reasons To Make This Your Next Move
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="bg-white rounded-2xl border border-[#EBE8E2] p-6 hover:border-[#B68A2E]/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#B68A2E]/10 flex items-center justify-center text-[#B68A2E] mb-4">
                <reason.icon className="text-lg" />
              </div>
              <h3 className="text-[#151A19] font-semibold mb-2">
                {reason.title}
              </h3>
              <p className="text-[#5B6460] text-sm leading-relaxed">
                {reason.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
