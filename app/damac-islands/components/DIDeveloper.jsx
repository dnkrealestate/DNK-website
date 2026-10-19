import React from "react";
import Image from "next/image";

export default function DIDeveloper() {
  return (
    <section
      className="py-16 lg:py-24 px-4"
      style={{
        background:
          "radial-gradient(ellipse 70% 70% at 80% 20%, rgba(20,184,166,0.10) 0%, rgba(20,184,166,0) 60%), #0B1210",
      }}
    >
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-center">
        <div className="flex justify-center lg:justify-start">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center justify-center w-full max-w-[220px] aspect-square">
            <Image
              src="/assets/damac-islands/logo-white.svg"
              alt="Damac Properties logo"
              width={160}
              height={160}
              className="w-full h-auto"
            />
          </div>
        </div>

        <div>
          <p className="text-[#14B8A6] text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            The Developer
          </p>
          <h2 className="text-white text-3xl lg:text-4xl font-semibold mb-5 leading-tight">
            Built By Damac Properties
          </h2>
          <p className="text-white/60 leading-relaxed mb-5 max-w-[640px]">
            Damac Properties is one of the Middle East's leading luxury
            real estate developers, with a portfolio spanning
            master-planned residential communities, branded residences and
            mixed-use developments across Dubai and the wider region.
          </p>
          <p className="text-white/60 leading-relaxed mb-8 max-w-[640px]">
            Damac Islands is one of its flagship tropical-themed
            communities — a resort-style neighbourhood of villas and
            townhouses built around lagoons, water adventures and
            island-inspired amenities in the heart of Dubailand.
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="text-white/70 text-xs font-medium border border-white/15 rounded-full px-4 py-2">
              Leading Dubai Developer
            </span>
            <span className="text-white/70 text-xs font-medium border border-white/15 rounded-full px-4 py-2">
              Master-Planned Communities
            </span>
            <span className="text-white/70 text-xs font-medium border border-white/15 rounded-full px-4 py-2">
              Island-Themed Living
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
