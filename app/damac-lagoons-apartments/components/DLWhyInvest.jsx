import React from "react";

const REASONS = [
  {
    num: "01",
    title: "Developed by Damac Properties",
    text: "A recognised property developer with an established Dubai portfolio and the developer of the wider Damac Lagoons community.",
  },
  {
    num: "02",
    title: "Mediterranean-Inspired Living",
    text: "Curved white facades, sweeping balconies and landscaping inspired by a coastal lifestyle.",
  },
  {
    num: "03",
    title: "Lagoon Community",
    text: "Access to the broader Damac Lagoons waterfront lifestyle: lagoons, beaches and community amenities.",
  },
];

export default function DLWhyInvest() {
  return (
    <section className="bg-[#F5F1E8] pb-16 lg:pb-24 px-4">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[#1C6B82] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
          <span>05</span>
          <span className="w-8 h-px bg-[#1C6B82]" />
          <span>Highlights</span>
        </p>
        <h2 className="text-[#151A19] text-3xl lg:text-4xl font-extrabold mb-10 max-w-[600px]">
          Why Sorrento at Damac Lagoons Is Worth a Closer Look
        </h2>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {REASONS.map((reason) => (
            <div
              key={reason.num}
              className="bg-white rounded-2xl border border-[#E5E0D5] p-6"
            >
              <p className="text-[#1C6B82] text-xs font-bold mb-3">{reason.num}</p>
              <h3 className="text-[#151A19] text-lg font-bold mb-2 leading-snug">
                {reason.title}
              </h3>
              <p className="text-[#5B6460] text-sm leading-relaxed">
                {reason.text}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-[#EBE5D8] rounded-3xl p-8 lg:p-10">
          <h3 className="text-[#151A19] text-2xl font-extrabold mb-6">
            Live in it, or invest in it
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-[#1C6B82] text-xs font-bold tracking-[0.15em] uppercase mb-2">
                For Homeowners
              </p>
              <p className="text-[#5B6460] text-sm leading-relaxed">
                A manageable studio or 1-bedroom home in a resort-style
                setting, with lagoons, beaches and landscaped walks in the
                community around you, next to Damac Hills.
              </p>
            </div>
            <div>
              <p className="text-[#1C6B82] text-xs font-bold tracking-[0.15em] uppercase mb-2">
                For Investors to Evaluate
              </p>
              <p className="text-[#5B6460] text-sm leading-relaxed">
                Compact unit types, an advertised 50/50* plan and an entry
                price from AED 680K*. Compare the official figures, service
                charges and fees before deciding — we do not promise
                returns or capital growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
