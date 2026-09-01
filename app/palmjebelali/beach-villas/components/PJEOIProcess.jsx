import React from "react";
import { MdArrowForward, MdEditDocument, MdVerifiedUser, MdVilla } from "react-icons/md";

const STEPS = [
  {
    icon: MdEditDocument,
    label: "Register Your EOI",
    desc: "Submit an Expression of Interest of AED 1,000,000 (~USD 272,000) to join the priority allocation list.",
    highlight: true,
  },
  {
    icon: MdVerifiedUser,
    label: "Priority Allocation",
    desc: "Registered buyers are given first access to unit selection ahead of public release.",
    highlight: false,
  },
  {
    icon: MdVilla,
    label: "Reserve Your Villa",
    desc: "Confirm your preferred Beach or Coral Villa with our advisory team and finalize terms.",
    highlight: false,
  },
];

export default function PJEOIProcess() {
  return (
    <section className="py-20 bg-[#F7F5F1]" id="eoi">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#79644A] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Priority Access
          </p>
          <h2
            className="text-[#14181B] text-3xl lg:text-4xl mb-4 font-semibold"
            style={{ fontFamily: "var(--font-pj-display), serif" }}
          >
            How the EOI Process Works
          </h2>
          <p className="text-black/50 text-base max-w-xl mx-auto leading-relaxed">
            Availability at Palm Jebel Ali is limited and by priority
            allocation only. Registering your Expression of Interest secures
            your place at the front of the line.
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex items-stretch gap-0 mb-10">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={i}>
                <div
                  className={`flex-1 rounded-2xl p-8 relative border transition-all duration-300 ${
                    step.highlight
                      ? "bg-gradient-to-b from-[#79644A] to-[#5F4E3B] border-[#79644A]"
                      : "bg-white border-black/10 hover:border-[#79644A]/30 shadow-sm"
                  }`}
                >
                  <div
                    className={`absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      step.highlight
                        ? "bg-white/20 text-white"
                        : "bg-[#79644A]/10 text-[#79644A]"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <Icon
                    className={`text-3xl mb-4 ${
                      step.highlight ? "text-white" : "text-[#79644A]"
                    }`}
                  />
                  <p
                    className={`font-bold text-lg mb-2 ${
                      step.highlight ? "text-white" : "text-[#14181B]"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p
                    className={`text-sm leading-relaxed m-0 ${
                      step.highlight ? "text-white/80" : "text-black/50"
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex items-center px-3 flex-shrink-0">
                    <MdArrowForward className="text-[#79644A] text-2xl" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="lg:hidden space-y-4 mb-10">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className={`rounded-2xl p-6 border flex gap-5 items-start ${
                  step.highlight
                    ? "bg-gradient-to-br from-[#79644A] to-[#5F4E3B] border-[#79644A]"
                    : "bg-white border-black/10 shadow-sm"
                }`}
              >
                <Icon
                  className={`text-3xl flex-shrink-0 ${
                    step.highlight ? "text-white" : "text-[#79644A]"
                  }`}
                />
                <div>
                  <p
                    className={`font-bold text-base mb-1 ${
                      step.highlight ? "text-white" : "text-[#14181B]"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p
                    className={`text-sm m-0 ${
                      step.highlight ? "text-white/80" : "text-black/50"
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary banner */}
        <div className="bg-[#79644A]/[0.06] border border-[#79644A]/20 rounded-2xl p-6 text-center">
          <p className="text-[#14181B] font-semibold text-lg mb-1">
            Expression of Interest:{" "}
            <span className="text-[#79644A]">AED 1,000,000</span>{" "}
            <span className="text-black/40 text-sm font-normal">(~USD 272,000)</span>
          </p>
          <p className="text-black/50 text-sm m-0">
            Applicable toward your final villa purchase &nbsp;·&nbsp;
            Beach Villas &amp; Coral Villas
          </p>
        </div>
      </div>
    </section>
  );
}
