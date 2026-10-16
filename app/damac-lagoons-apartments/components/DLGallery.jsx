"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const GALLERY = [
  { src: "/assets/damac-lagoons/gallery/gallery-01.webp", alt: "Lagoon Views community aerial view, Damac Lagoons", span: "col-span-2 sm:row-span-2" },
  { src: "/assets/damac-lagoons/gallery/gallery-02.webp", alt: "Lagoon Views apartment exterior facade" },
  { src: "/assets/damac-lagoons/gallery/gallery-03.webp", alt: "Lagoon Views waterfront walkway" },
  { src: "/assets/damac-lagoons/gallery/gallery-04.webp", alt: "Lagoon Views apartment interior living space" },
  { src: "/assets/damac-lagoons/gallery/gallery-05.webp", alt: "Lagoon Views lagoon and landscaping" },
  { src: "/assets/damac-lagoons/gallery/gallery-06.webp", alt: "Lagoon Views apartment bedroom interior" },
  { src: "/assets/damac-lagoons/gallery/gallery-07.webp", alt: "Lagoon Views community lifestyle view" },
  { src: "/assets/damac-lagoons/gallery/gallery-08.webp", alt: "Lagoon Views balcony view over the lagoon" },
  { src: "/assets/damac-lagoons/gallery/gallery-09.webp", alt: "Lagoon Views apartment kitchen interior" },
  { src: "/assets/damac-lagoons/gallery/gallery-10.webp", alt: "Lagoon Views evening ambience" },
  { src: "/assets/damac-lagoons/gallery/gallery-11.webp", alt: "Lagoon Views community amenities view" },
  { src: "/assets/damac-lagoons/gallery/gallery-12.webp", alt: "Lagoon Views master bedroom view" },
];

export default function DLGallery() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-16 lg:py-24 bg-white" id="gallery">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-[#0F766E] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Gallery
          </p>
          <h2 className="text-[#151A19] text-3xl lg:text-4xl font-semibold">
            A Glimpse of Lagoon Living
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 auto-rows-[160px] sm:auto-rows-[180px]">
          {GALLERY.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(item)}
              className={`relative rounded-2xl overflow-hidden border border-[#EBE8E2] hover:border-[#B68A2E]/50 shadow-sm transition-all duration-300 group ${item.span || ""}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            aria-label="Close"
          >
            <IoClose className="text-xl" />
          </button>
          <div className="relative w-full max-w-4xl h-[70vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selected.src}
              alt={selected.alt}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
