"use client";

import React from "react";
import Image from "next/image";

export default function PJDeveloper() {
  return (
    <section
      className="relative w-full min-h-[600px] lg:min-h-[720px] flex items-center overflow-hidden scroll-mt-20"
      id="developer"
    >
      {/* Fallback while the video buffers */}
      <div className="absolute inset-0 bg-[#05070a14]" />
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center max-md:object-[70%_center]"
      >
        <source src="/assets/other/PJA_hero_Loop.webm" type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/45 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div></div>
        <div className="">
          <p className="text-[#C4A57F] text-xs font-semibold tracking-[0.25em] uppercase mb-5">
            A Legacy of Landmark Developments
          </p>
          <p className="text-white/70 text-base lg:text-lg leading-relaxed mb-10">
           Nakheel, a member of Dubai Holding Real Estate, has played a defining role in shaping Dubai’s waterfront landscape. From Palm Jumeirah to Palm Jebel Ali and Dubai Islands, Nakheel continues to develop ambitious destinations that bring together exceptional residences, leisure, hospitality and waterfront living.
          </p>
          <div className="relative h-9 sm:h-11 w-[180px] sm:w-[220px]">
            <Image
              src="/assets/other/nakeel_logo.webp"
              alt="Nakheel"
              fill
              className="object-contain object-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
