"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

const IMAGES = [
  { src: "/assets/yas-riva-reserve/gallery/gallery-4br.webp", alt: "4 Bedroom villa living space at Yas Riva Reserve", caption: "4-bedroom villa, living space" },
  { src: "/assets/yas-riva-reserve/units/villa-5br-rear.webp", alt: "5 Bedroom waterfront villa rear at Yas Riva Reserve", caption: "5-bedroom waterfront villa, rear" },
  { src: "/assets/yas-riva-reserve/amenities/feature-3.webp", alt: "Padel courts at Yas Riva Reserve", caption: "Padel courts" },
  { src: "/assets/yas-riva-reserve/gallery/gallery-walkway.webp", alt: "Community walkway at Yas Riva Reserve", caption: "Canal-side walkway" },
  { src: "/assets/yas-riva-reserve/units/unit-waterfront.webp", alt: "Waterfront villa at Yas Riva Reserve", caption: "Waterfront villa" },
  { src: "/assets/yas-riva-reserve/amenities/feature-1.webp", alt: "Residents' clubhouse at Yas Riva Reserve", caption: "Residents' clubhouse" },
  { src: "/assets/yas-riva-reserve/gallery/gallery-kids.webp", alt: "Kids' play area at Yas Riva Reserve", caption: "Kids' play area" },
  { src: "/assets/yas-riva-reserve/units/villa-6br-rear.webp", alt: "6 Bedroom waterfront villa rear at Yas Riva Reserve", caption: "6-bedroom waterfront villa, rear" },
  { src: "/assets/yas-riva-reserve/amenities/waterfront-terrace.webp", alt: "Canal viewing deck at Yas Riva Reserve", caption: "Canal viewing deck" },
  { src: "/assets/yas-riva-reserve/amenities/linear-parks.webp", alt: "Jogging tracks and parks at Yas Riva Reserve", caption: "Jogging tracks and parks" },
];

export default function YRGallery() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? IMAGES.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === IMAGES.length - 1 ? 0 : i + 1));

  return (
    <section className="bg-[#1C1915] py-16 lg:py-28 px-5 sm:px-8" id="gallery">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[#D9C098] text-xs font-bold tracking-[0.2em] uppercase mb-3">
              05 &mdash; Gallery
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-white text-3xl sm:text-5xl font-semibold">
              Renders &amp; lifestyle
            </h2>
          </div>
          <p className="font-[family-name:var(--font-display)] text-white/40 text-xl">
            {String(index + 1).padStart(2, "0")} / {String(IMAGES.length).padStart(2, "0")}
          </p>
        </div>

        <div className="relative aspect-[16/9] sm:aspect-[21/9] mb-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={IMAGES[index].src}
                alt={IMAGES[index].alt}
                fill
                sizes="(max-width: 1400px) 100vw, 1400px"
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 sm:p-7 flex items-end justify-between">
            <p className="text-white font-medium">{IMAGES[index].caption}</p>
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous image"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
              >
                <IoArrowBack />
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
              >
                <IoArrowForward />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {IMAGES.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setIndex(i)}
              className={`relative flex-shrink-0 w-24 sm:w-28 aspect-[4/3] overflow-hidden transition-opacity ${
                i === index ? "opacity-100 ring-2 ring-[#B08D57]" : "opacity-40 hover:opacity-70"
              }`}
            >
              <Image src={img.src} alt="" fill sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>

        <p className="text-white/30 text-xs text-center mt-10">
          Renders from Aldar's official Yas Riva Reserve marketing. Finishes
          and layouts per the official floor plans for each villa type.
        </p>
      </div>
    </section>
  );
}
