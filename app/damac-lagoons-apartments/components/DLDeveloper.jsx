import React from "react";
import Image from "next/image";

const STATS = [
  { value: "2002", label: "Building luxury since" },
  { value: "50,000+", label: "Units delivered" },
  { value: "55,000+", label: "Units in progress" },
  { value: "15", label: "Countries" },
];

export default function DLDeveloper() {
  return (
    <section className="relative py-16 lg:py-24 px-4 overflow-hidden">
      <Image
        src="/assets/damac-lagoons/gallery/gallery-08.webp"
        alt="Damac Lagoons community"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <Image
            src="/assets/damac-lagoons/logo-damac-clean.webp"
            alt="Damac Properties"
            width={324}
            height={44}
            className="h-9 w-auto mb-6"
          />
          <p className="text-[#7FC4D6] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
            <span>12</span>
            <span className="w-8 h-px bg-[#7FC4D6]" />
            <span>Developer</span>
          </p>
          <h2 className="text-white text-3xl lg:text-4xl font-extrabold mb-5 leading-tight">
            Developed by Damac Properties
          </h2>
          <p className="text-white/70 leading-relaxed mb-6 max-w-[520px]">
            One of Dubai's best-known developers of branded communities —
            Damac Hills, Damac Hills 2 and Damac Lagoons. Sorrento – Lagoon
            Views is its new apartment collection, "A new chapter in
            Mediterranean living".
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 border border-white/15 rounded-2xl p-5"
            >
              <p className="text-[#7FC4D6] text-3xl font-extrabold">{stat.value}</p>
              <p className="text-white text-sm font-medium mt-1">{stat.label}</p>
              <p className="text-white/40 text-[0.6rem] mt-1 uppercase tracking-wider">
                Damac, as reported
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
