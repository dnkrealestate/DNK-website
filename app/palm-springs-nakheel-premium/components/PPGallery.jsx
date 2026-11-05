"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose, IoArrowBack, IoArrowForward } from "react-icons/io5";

const IMAGES = [
  {
    src: "/assets/palm-springs-nakheel/images/hero-waterfront-sunset.png",
    alt: "Aerial view of Palm Springs waterfront villas at sunset",
    caption: "Waterfront aerial view",
    span: "sm:row-span-2",
  },
  {
    src: "/assets/palm-springs-nakheel/images/villas-exterior-sunset.png",
    alt: "Palm Springs villa exteriors",
    caption: "Villa exteriors",
    span: "",
  },
  {
    src: "/assets/palm-springs-nakheel/images/interior-living-sunset-view.png",
    alt: "Palm Springs interior living space",
    caption: "Interior living space",
    span: "",
  },
  {
    src: "/assets/palm-springs-nakheel/images/lifestyle-concept-villa.jpg",
    alt: "Waterfront lifestyle concept visual, for inspiration only — not an actual Palm Springs residence",
    caption: "Lifestyle Concept (Inspiration Only)",
    span: "sm:col-span-2",
    concept: true,
  },
];

export default function PPGallery() {
  const [open, setOpen] = useState(null);

  const prev = () => setOpen((i) => (i === 0 ? IMAGES.length - 1 : i - 1));
  const next = () => setOpen((i) => (i === IMAGES.length - 1 ? 0 : i + 1));

  return (
    <section id="gallery" className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 scroll-mt-28">
      <p className="text-[#367BA8] text-xs font-bold tracking-[0.25em] uppercase mb-4">
        Architecture Gallery
      </p>
      <h2 className="font-[family-name:var(--font-display)] text-[#102B46] text-3xl sm:text-4xl font-semibold mb-10 max-w-[560px]">
        Imagery &amp; Renders
      </h2>

      <div className="grid sm:grid-cols-3 auto-rows-[220px] sm:auto-rows-[180px] gap-4">
        {IMAGES.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setOpen(i)}
            className={`relative rounded-[1.5rem] overflow-hidden group ${img.span}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D30]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {img.concept && (
              <span className="absolute top-3 right-3 bg-[#0A1D30]/80 text-white text-[0.6rem] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                Concept
              </span>
            )}
            <p className="absolute bottom-3 left-4 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {img.caption}
            </p>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-[#0A1D30]/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
            onClick={() => setOpen(null)}
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <IoClose className="text-xl" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
              className="absolute left-4 sm:left-8 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <IoArrowBack />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
              className="absolute right-4 sm:right-8 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <IoArrowForward />
            </button>

            <motion.div
              key={open}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-4xl aspect-[16/10] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={IMAGES[open].src} alt={IMAGES[open].alt} fill sizes="90vw" className="object-contain bg-[#0A1D30]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
