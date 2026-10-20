import React from "react";

const STEPS = [
  {
    step: "Step 1",
    title: "Register Your Interest",
    text: "Select Studio or 1 Bedroom and submit your contact details. It takes about 20 seconds.",
  },
  {
    step: "Step 2",
    title: "Receive Official Launch Information",
    text: "Your advisor shares verified pricing, floor plans and availability updates as Damac releases them.",
  },
  {
    step: "Step 3",
    title: "Complete the Developer Process",
    text: "If you decide to proceed, follow Damac's official EOI payment and unit-selection instructions.",
  },
];

export default function DLProcessSteps() {
  return (
    <section className="bg-[#F5F1E8] pb-16 lg:pb-24 px-4">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[#1C6B82] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
          <span>03</span>
          <span className="w-8 h-px bg-[#1C6B82]" />
          <span>Expression Of Interest</span>
        </p>
        <h2 className="text-[#151A19] text-3xl lg:text-4xl font-extrabold mb-4 max-w-[600px]">
          How to Get Early Access to Sorrento
        </h2>
        <p className="text-[#5B6460] max-w-[680px] mb-10 leading-relaxed">
          Three steps, and nothing is payable on this website. Your
          registration is an enquiry that lets us send you Damac's official
          instructions first.
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-2xl border-t-4 border-[#1C6B82] border-x border-b border-[#E5E0D5] p-6"
            >
              <p className="text-[#1C6B82] text-xs font-bold tracking-[0.15em] uppercase mb-3">
                {item.step}
              </p>
              <h3 className="text-[#151A19] text-lg font-bold mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-[#5B6460] text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white/60 border-l-4 border-[#1C6B82] rounded-xl p-5">
          <p className="text-[#5B6460] text-sm leading-relaxed">
            EOI submission does not guarantee unit allocation. Payment
            instructions, refundability and allocation priority are subject
            to Damac's official terms. Registering on this page is an
            enquiry, not a financial reservation, and we never ask for card
            or bank details.
          </p>
        </div>
      </div>
    </section>
  );
}
