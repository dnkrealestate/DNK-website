"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

export default function DLVideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-white pb-16 lg:pb-24 px-4">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[#1C6B82] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
          <span>10</span>
          <span className="w-8 h-px bg-[#1C6B82]" />
          <span>Film</span>
        </p>
        <h2 className="text-[#151A19] text-3xl lg:text-4xl font-extrabold mb-8">
          Watch the Sorrento Teaser
        </h2>

        <div className="relative rounded-3xl overflow-hidden aspect-video border border-[#E5E0D5] shadow-xl shadow-black/5">
          {playing ? (
            <video
              controls
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source
                src="/assets/damac-lagoons/video/project-video.mp4"
                type="video/mp4"
              />
            </video>
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 w-full h-full"
              aria-label="Play Sorrento Lagoon Views project video"
            >
              <Image
                src="/assets/damac-lagoons/hero-poster.webp"
                alt="Sorrento Lagoon Views at Damac Lagoons — project video preview"
                fill
                sizes="(max-width: 1100px) 100vw, 1100px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#1C6B82] group-hover:scale-110 transition-transform flex items-center justify-center shadow-xl shadow-black/40">
                  <FaPlay className="text-white text-xl ml-1" />
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
