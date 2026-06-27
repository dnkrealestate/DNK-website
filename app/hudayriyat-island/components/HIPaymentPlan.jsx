import React from "react";
import { MdArrowForward } from "react-icons/md";

const STEPS = [
  {
    percent: "10%",
    label: "On Booking",
    desc: "Secure your unit with just 10% down payment today",
    highlight: true,
  },
  {
    percent: "40%",
    label: "During Construction",
    desc: "Spread across the construction timeline 2025 – 2029",
    highlight: false,
  },
  {
    percent: "50%",
    label: "On Handover",
    desc: "Final payment upon receiving your keys in Q4 2029",
    highlight: false,
  },
];

export default function HIPaymentPlan() {
  return (
    <section className="py-20 bg-[#091825]" id="payment">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-[#C4973D] text-xs font-semibold tracking-widest uppercase mb-3">
            Flexible Investment
          </p>
          <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4">
            Payment Plan
          </h2>
          <p className="text-[#8BA4BC] text-base max-w-xl mx-auto leading-relaxed">
            An investor-friendly payment structure designed to make your dream
            waterfront home accessible.
          </p>
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden lg:flex items-stretch gap-0 mb-10">
          {STEPS.map((step, i) => (
            <React.Fragment key={i}>
              <div
                className={`flex-1 rounded-2xl p-8 relative border transition-all duration-300 ${
                  step.highlight
                    ? "bg-[#C4973D] border-[#C4973D]"
                    : "bg-white/[0.03] border-white/10 hover:border-[#C4973D]/30"
                }`}
              >
                {/* Step number */}
                <div
                  className={`absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.highlight
                      ? "bg-white/20 text-white"
                      : "bg-[#C4973D]/10 text-[#C4973D]"
                  }`}
                >
                  {i + 1}
                </div>

                <p
                  className={`text-5xl font-black mb-3 ${
                    step.highlight ? "text-white" : "text-[#C4973D]"
                  }`}
                >
                  {step.percent}
                </p>
                <p
                  className={`font-bold text-lg mb-2 ${
                    step.highlight ? "text-white" : "text-white"
                  }`}
                >
                  {step.label}
                </p>
                <p
                  className={`text-sm leading-relaxed m-0 ${
                    step.highlight ? "text-white/80" : "text-[#8BA4BC]"
                  }`}
                >
                  {step.desc}
                </p>
              </div>

              {i < STEPS.length - 1 && (
                <div className="flex items-center px-3 flex-shrink-0">
                  <MdArrowForward className="text-[#C4973D] text-2xl" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden space-y-4 mb-10">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 border flex gap-5 items-start ${
                step.highlight
                  ? "bg-[#C4973D] border-[#C4973D]"
                  : "bg-white/[0.03] border-white/10"
              }`}
            >
              <p
                className={`text-4xl font-black leading-none flex-shrink-0 ${
                  step.highlight ? "text-white" : "text-[#C4973D]"
                }`}
              >
                {step.percent}
              </p>
              <div>
                <p className="text-white font-bold text-base mb-1">
                  {step.label}
                </p>
                <p
                  className={`text-sm m-0 ${
                    step.highlight ? "text-white/80" : "text-[#8BA4BC]"
                  }`}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary banner */}
        <div className="bg-[#C4973D]/10 border border-[#C4973D]/20 rounded-2xl p-6 text-center">
          <p className="text-white font-semibold text-lg mb-1">
            Total:{" "}
            <span className="text-[#C4973D]">50 / 50 Payment Plan</span>
          </p>
          <p className="text-[#8BA4BC] text-sm m-0">
            50% paid during construction &nbsp;·&nbsp; 50% on handover &nbsp;·&nbsp; Q4 2029
          </p>
        </div>
      </div>
    </section>
  );
}
