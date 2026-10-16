import React from "react";
import DLContactForm from "./DLContactForm";

export default function DLFinalCTA() {
  return (
    <section
      className="relative py-16 lg:py-24 px-4"
      style={{
        background:
          "radial-gradient(ellipse 80% 80% at 50% 0%, rgba(20,184,166,0.10) 0%, rgba(20,184,166,0) 60%), #0B1210",
      }}
      id="enquire-footer"
    >
      <div className="max-w-[560px] mx-auto">
        <div className="bg-white/[0.04] backdrop-blur-md border border-[#B68A2E]/15 rounded-3xl p-8 lg:p-10 shadow-2xl shadow-black/50">
          <div className="text-center mb-7">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#B68A2E] to-transparent rounded-full mx-auto mb-4" />
            <h2 className="text-white font-semibold text-3xl mb-2">
              Ready To Own A Piece Of The Lagoon?
            </h2>
            <p className="text-white/50 text-sm">
              Speak to a DNK Real Estate advisor today for the latest
              pricing, floor plans and payment plan on Lagoon Views.
            </p>
          </div>
          <DLContactForm />
        </div>
      </div>
    </section>
  );
}
