import React from "react";
import { MdLocationOn, MdDirectionsCar } from "react-icons/md";
import mapImg from "@/public/assets/other/hudayriyatMap.webp";
import Image from "next/image";

const DESTINATIONS = [
  { name: "Corniche Beach", time: "10 min" },
  { name: "Abu Dhabi City Center", time: "15 min" },
  { name: "Yas Island", time: "15 min" },
  { name: "Ferrari World", time: "15 min" },
  { name: "Abu Dhabi International Airport", time: "20 min" },
  { name: "Abu Dhabi Mall", time: "15 min" },
];

export default function HILocation() {
  return (
    <section className="py-20 bg-[#06101C]" id="location">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

          {/* ── Left: content ── */}
          <div className="flex-1">
            <p className="text-[#C4973D] text-xs font-semibold tracking-widest uppercase mb-3">
              Prime Location
            </p>
            <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Connected to the
              <br />
              <span className="text-[#C4973D]">Heart of Abu Dhabi</span>
            </h2>
            <p className="text-[#8BA4BC] text-base leading-relaxed mb-8">
              Hudayriyat Island enjoys a strategic position just minutes from
              Abu Dhabi&apos;s key landmarks, beaches, and entertainment
              destinations — offering the perfect balance of island serenity and
              urban convenience.
            </p>

            {/* Distance cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DESTINATIONS.map((dest, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 hover:border-[#C4973D]/30 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C4973D]/10 flex items-center justify-center flex-shrink-0">
                    <MdDirectionsCar className="text-[#C4973D] text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate m-0">
                      {dest.name}
                    </p>
                    <p className="text-[#C4973D] text-xs font-semibold m-0">
                      {dest.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: visual map card ── */}
          <div className="w-full lg:w-[480px] flex-shrink-0">
            <div
              className="h-[400px] rounded-3xl relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #0D2035 0%, #091825 100%)",
              }}
            >
              {/* Background image */}
                    <Image
                      src={mapImg}
                      alt="Hudayriyat Island"
                      fill
                      className="object-cover object-center"
                      priority
                    />
              {/* Pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(196,151,61,0.7) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Concentric rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-64 h-64 rounded-full border border-[#C4973D]/8" />
                  <div className="absolute w-44 h-44 rounded-full border border-[#C4973D]/12" />
                  <div className="absolute w-28 h-28 rounded-full border border-[#C4973D]/20" />
                  <div className="w-16 h-16 rounded-full bg-[#C4973D]/20 border-2 border-[#C4973D]/50 flex items-center justify-center shadow-lg shadow-[#C4973D]/20">
                    <MdLocationOn className="text-[#C4973D] text-3xl" />
                  </div>
                </div>
              </div>

              {/* Info bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/45 backdrop-blur-sm p-5">
                <p className="text-[#C4973D] text-xs font-semibold uppercase tracking-wide mb-0.5">
                  Hudayriyat Island
                </p>
                <p className="text-white text-sm">Abu Dhabi · UAE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
