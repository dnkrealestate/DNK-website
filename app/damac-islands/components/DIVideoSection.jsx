"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

export default function DIVideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-white py-16 lg:py-24 px-4">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-10">
          <p className="text-[#0F766E] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Watch
          </p>
          <h2 className="text-[#151A19] text-3xl lg:text-4xl font-semibold">
            Experience Damac Islands
          </h2>
        </div>

        <div className="relative rounded-3xl overflow-hidden aspect-video border border-[#EBE8E2] shadow-xl shadow-black/5">
          {playing ? (
            <video
              controls
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source
                src="/assets/damac-islands/video/project-video.mp4"
                type="video/mp4"
              />
            </video>
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 w-full h-full"
              aria-label="Play Damac Islands project video"
            >
              <Image
                src="/assets/damac-islands/hero-poster.webp"
                alt="Damac Islands — project video preview"
                fill
                sizes="(max-width: 1100px) 100vw, 1100px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#B68A2E] group-hover:scale-110 transition-transform flex items-center justify-center shadow-xl shadow-black/40">
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
