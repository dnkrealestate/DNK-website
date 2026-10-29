"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

const IMAGES = [
  {
    src: "/assets/palm-springs-nakheel/images/hero-waterfront-sunset.png",
    alt: "Aerial view of a waterfront villa community in Dubai at sunset",
    caption: "Waterfront aerial view",
  },
  {
    src: "/assets/palm-springs-nakheel/images/villas-exterior-sunset.png",
    alt: "Row of contemporary villas with landscaped gardens at sunset",
    caption: "Villa exteriors",
  },
  {
    src: "/assets/palm-springs-nakheel/images/interior-living-sunset-view.png",
    alt: "Open-plan living space with a waterfront sunset view",
    caption: "Interior living space",
  },
  {
    src: "/assets/palm-springs-nakheel/images/location-map-reference.webp",
    alt: "Reference map showing the Palm Springs site relative to Palm Jebel Ali, Palm Jumeirah, Bluewaters Island, Burj Al Arab and DWC Airport",
    caption: "Location reference map",
  },
];

export default function PSGallery({ onOpenEnquiry }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? IMAGES.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === IMAGES.length - 1 ? 0 : i + 1));

  return (
    <section className="bg-[#F7F5EF] py-16 sm:py-24 px-5 sm:px-8 scroll-mt-24" id="gallery">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[#A9874F] text-xs font-bold tracking-[0.2em] uppercase mb-3">
              Gallery
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[#1C211F] text-3xl sm:text-4xl font-semibold max-w-[600px]">
              Imagery &amp; Renders
            </h2>
          </div>
          <p className="font-[family-name:var(--font-display)] text-[#8A8F8B] text-xl">
            {String(index + 1).padStart(2, "0")} / {String(IMAGES.length).padStart(2, "0")}
          </p>
        </div>

        <div className="relative aspect-[16/9] sm:aspect-[21/9] mb-4 overflow-hidden rounded-sm">
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
                sizes="(max-width: 1320px) 100vw, 1320px"
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
              className={`relative flex-shrink-0 w-24 sm:w-28 aspect-[4/3] overflow-hidden rounded-sm transition-opacity ${
                i === index ? "opacity-100 ring-2 ring-[#C6A66B]" : "opacity-40 hover:opacity-70"
              }`}
            >
              <Image src={img.src} alt="" fill sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>

        {/* <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-white border border-[#1C211F]/10 rounded-sm p-6 sm:p-7">
          <p className="text-[#4B534E] text-sm leading-relaxed max-w-[520px]">
            Images shown are representative renders provided for this
            launch, not confirmed photographs of specific units. The full
            gallery and official renders will be shared as they're released
            by Nakheel.
          </p>
          <button
            onClick={() =>
              onOpenEnquiry({
                eyebrow: "Gallery",
                title: "Request the Full Gallery",
                subtitle: "We'll send the official gallery and renders as soon as Nakheel releases them.",
                interest: "Brochure",
                ctaLabel: "Notify Me When Available",
              })
            }
            className="bg-gradient-to-r from-[#C6A66B] to-[#A9874F] hover:brightness-110 text-[#011945] font-bold px-6 py-3 rounded-sm text-sm whitespace-nowrap transition-all"
          >
            Notify Me When Available
          </button>
        </div> */}
      </div>
    </section>
  );
}
