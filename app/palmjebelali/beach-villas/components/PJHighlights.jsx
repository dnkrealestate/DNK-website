import React from "react";
import {
  MdBeachAccess,
  MdVerified,
  MdWaterDrop,
  MdSecurity,
  MdVilla,
  MdDiamond,
} from "react-icons/md";

const HIGHLIGHTS = [
  {
    icon: MdWaterDrop,
    value: "Private",
    label: "Beach Frontage",
    desc: "Direct, uninterrupted access to your own stretch of shoreline",
  },
  {
    icon: MdVilla,
    value: "5 – 7 BR",
    label: "Villa Collection",
    desc: "Beach Villas and Coral Villas — two distinct expressions of luxury",
  },
  {
    icon: MdDiamond,
    value: "Bespoke",
    label: "Architecture",
    desc: "Signature villa designs crafted for privacy and grandeur",
  },
  {
    icon: MdSecurity,
    value: "Gated",
    label: "Island Community",
    desc: "24/7 private security within an exclusive island enclave",
  },
  {
    icon: MdVerified,
    value: "Nakheel",
    label: "Master Developer",
    desc: "Delivered by the visionary behind Palm Jumeirah",
  },
  {
    icon: MdBeachAccess,
    value: "AED 1M",
    label: "Expression of Interest",
    desc: "Reserve priority allocation before public release",
  },
];

export default function PJHighlights() {
  return (
    <section className="py-20 bg-white border-t border-black/[0.05]">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#79644A] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            The Palm Jebel Ali Promise
          </p>
          <h2
            className="text-[#14181B] text-3xl lg:text-4xl mb-4 font-semibold"
            style={{ fontFamily: "var(--font-pj-display), serif" }}
          >
            An Address Beyond Compare
          </h2>
          <p className="text-black/50 text-base max-w-xl mx-auto leading-relaxed">
            Every detail of Palm Jebel Ali is designed for those who measure
            luxury not by size, but by privacy, view, and craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {HIGHLIGHTS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-[#FAF9F6] border border-black/[0.06] rounded-2xl p-4 sm:p-6 hover:border-[#79644A]/30 hover:bg-[#79644A]/[0.04] transition-all duration-300"
              >
                <Icon className="text-2xl sm:text-3xl text-[#79644A] mb-2.5 sm:mb-4" />
                <p className="text-[#79644A] text-lg sm:text-2xl font-bold mb-1">
                  {item.value}
                </p>
                <p className="text-[#14181B] font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">
                  {item.label}
                </p>
                <p className="text-black/50 text-xs sm:text-sm leading-relaxed m-0">
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
