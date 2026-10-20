import React from "react";

const DISTANCES = [
  { min: "20", place: "Global Village" },
  { min: "25", place: "Mall of the Emirates" },
  { min: "25", place: "Al Maktoum International Airport" },
  { min: "28", place: "Palm Jumeirah" },
  { min: "30", place: "Downtown Dubai" },
  { min: "30", place: "Dubai Marina" },
  { min: "35", place: "Dubai International Airport" },
  { min: "—", place: "Damac Hills (adjacent)" },
];

export default function DLLocation() {
  return (
    <section className="bg-[#F5F1E8] pb-16 lg:pb-24 px-4" id="location">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[#1C6B82] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
          <span>11</span>
          <span className="w-8 h-px bg-[#1C6B82]" />
          <span>Location</span>
        </p>
        <h2 className="text-[#151A19] text-3xl lg:text-4xl font-extrabold mb-4 max-w-[640px]">
          Everywhere Feels Nearby
        </h2>
        <p className="text-[#5B6460] max-w-[680px] mb-10 leading-relaxed">
          Damac Lagoons sits in Dubailand, close to the established Damac
          Hills, with Downtown Dubai and Palm Jumeirah within half an hour.*
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {DISTANCES.map((d) => (
            <div key={d.place} className="bg-white rounded-2xl border border-[#E5E0D5] p-5">
              <p className="text-[#1C6B82] text-2xl font-extrabold">
                {d.min}
                {d.min !== "—" && <span className="text-sm font-semibold ml-1">min</span>}
              </p>
              <p className="text-[#5B6460] text-sm mt-1">{d.place}</p>
            </div>
          ))}
        </div>

        <div
          className="relative rounded-3xl overflow-hidden min-h-[320px] flex items-center p-8 sm:p-12"
          style={{
            background: "linear-gradient(120deg, #0D1210 0%, #1C6B82 100%)",
          }}
        >
          <div>
            <p className="text-white text-4xl sm:text-5xl font-serif italic leading-tight">
              Everywhere
            </p>
            <p className="text-white text-4xl sm:text-5xl font-serif italic leading-tight">
              Feels Nearby
            </p>
            <p className="text-white/60 text-sm mt-4 max-w-[380px]">
              Positioned within Dubailand, with convenient access to Al
              Qudra Road and the wider road network connecting Sorrento to
              the rest of Dubai.
            </p>
          </div>
        </div>

        <p className="text-[#8A8F8B] text-xs text-center mt-6">
          * Approximate drive times by car, for general orientation only.
        </p>
      </div>
    </section>
  );
}
