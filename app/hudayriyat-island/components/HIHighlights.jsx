import React from "react";
import {
  MdApartment,
  MdCalendarMonth,
  MdVerified,
  MdPayments,
  MdWater,
  MdBeachAccess,
} from "react-icons/md";

const HIGHLIGHTS = [
  {
    icon: MdApartment,
    value: "AED 2.3M",
    label: "Starting Price",
    desc: "Premium waterfront living at an accessible entry point",
  },
  {
    icon: MdPayments,
    value: "10%",
    label: "Booking Deposit",
    desc: "Secure your unit with minimal initial investment",
  },
  {
    icon: MdCalendarMonth,
    value: "Q4 2029",
    label: "Handover Date",
    desc: "Lock in today's off-plan prices for maximum ROI",
  },
  {
    icon: MdVerified,
    value: "50 / 50",
    label: "Payment Plan",
    desc: "Flexible investor-friendly construction payment structure",
  },
  {
    icon: MdWater,
    value: "Modon",
    label: "Government Developer",
    desc: "Backed by Abu Dhabi's most trusted property developer",
  },
  {
    icon: MdBeachAccess,
    value: "1 – 4 BR",
    label: "Unit Options",
    desc: "Diverse bedroom configurations for every lifestyle",
  },
];

export default function HIHighlights() {
  return (
    <section className="py-20 bg-[#06101C]" id="highlights">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-[#C4973D] text-xs font-semibold tracking-widest uppercase mb-3">
            Investment Highlights
          </p>
          <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4">
            Why Hudayriyat Island?
          </h2>
          <p className="text-[#8BA4BC] text-base max-w-xl mx-auto leading-relaxed">
            A rare opportunity to own waterfront property in Abu Dhabi's newest
            and most exciting island destination.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HIGHLIGHTS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:border-[#C4973D]/35 hover:bg-[#C4973D]/[0.04] transition-all duration-300 group"
              >
                <Icon className="text-3xl text-[#C4973D] mb-4" />
                <p className="text-[#C4973D] text-2xl font-bold mb-1">
                  {item.value}
                </p>
                <p className="text-white font-semibold text-base mb-2">
                  {item.label}
                </p>
                <p className="text-[#8BA4BC] text-sm leading-relaxed m-0">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
