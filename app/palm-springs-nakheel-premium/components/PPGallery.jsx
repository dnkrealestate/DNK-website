"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose, IoArrowBack, IoArrowForward } from "react-icons/io5";

const IMAGES = [
  {
    src: "/assets/palm-springs-nakheel/images/townhouse-community-pool.png",
    alt: "Townhouses community pool at Palm Springs by Nakheel",
    caption: "Townhouses — Community Pool",
    span: "sm:col-span-2",
    height: "h-[220px] sm:h-[260px]",
  },
  {
    src: "/assets/palm-springs-nakheel/images/community-lagoon-aerial-day.png",
    alt: "Aerial daytime view of the Palm Springs by Nakheel community lagoon",
    caption: "Community lagoon aerial view",
    span: "",
    height: "h-[220px] sm:h-[260px]",
  },
  {
    src: "/assets/palm-springs-nakheel/images/villa-5br-pool-loungers.png",
    alt: "5 Bedroom Villa pool with loungers at Palm Springs by Nakheel",
    caption: "5BR Villa — Pool",
    span: "",
    height: "h-[220px] sm:h-[260px]",
  },
  {
    src: "/assets/palm-springs-nakheel/images/community-amenities-walkway.png",
    alt: "Shaded amenities walkway at Palm Springs by Nakheel",
    caption: "Community amenities walkway",
    span: "",
    height: "h-[220px] sm:h-[260px]",
  },
  {
    src: "/assets/palm-springs-nakheel/images/community-pool-dusk.png",
    alt: "Community pool at dusk at Palm Springs by Nakheel",
    caption: "Community pool at dusk",
    span: "",
    height: "h-[220px] sm:h-[260px]",
  },
  {
    src: "/assets/palm-springs-nakheel/images/villa-4br-living-dining-1.webp",
    alt: "4 Bedroom Villa living and dining area at Palm Springs by Nakheel",
    caption: "4BR Villa — Living & Dining",
    span: "",
    height: "h-[220px] sm:h-[260px]",
  },
  {
    src: "/assets/palm-springs-nakheel/images/townhouse-4plex-street-evening.png",
    alt: "4-Plex Townhouse street view at Palm Springs by Nakheel",
    caption: "Townhouse — Street View",
    span: "",
    height: "h-[220px] sm:h-[260px]",
  },
  {
    src: "/assets/palm-springs-nakheel/images/villa-5br-street-golfcart.png",
    alt: "5 Bedroom Villa street view at Palm Springs by Nakheel",
    caption: "5BR Villa — Street View",
    span: "",
    height: "h-[220px] sm:h-[260px]",
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

      <div className="grid sm:grid-cols-3 gap-4">
        {IMAGES.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setOpen(i)}
            className={`relative rounded-[1.5rem] overflow-hidden group shadow-[0_8px_24px_rgba(16,43,70,0.08)] w-full ${img.height} ${img.span}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={img.span ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
              quality={90}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D30]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
