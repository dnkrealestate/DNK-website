"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const GALLERY = [
  { src: "/assets/damac-lagoons/gallery/gallery-01.webp", alt: "Sorrento Lagoon Views community view with lagoon and residences, Damac Lagoons", caption: "Sorrento: the residences around the lagoon" },
  { src: "/assets/damac-lagoons/gallery/gallery-03.webp", alt: "Sorrento lagoon-front loungers and residences by day", caption: "Resort-style loungers along the lagoon" },
  { src: "/assets/damac-lagoons/gallery/gallery-06.webp", alt: "Open-plan kitchen, dining and living at Sorrento Lagoon Views", caption: "Open-plan kitchen and living" },
  { src: "/assets/damac-lagoons/gallery/gallery-09.webp", alt: "Rooftop terrace lounge and jacuzzi at Sorrento Lagoon Views", caption: "Rooftop terrace lounge and jacuzzi" },
  { src: "/assets/damac-lagoons/gallery/gallery-10.webp", alt: "Evening fire pit lounge beneath palm trees at Sorrento Lagoon Views", caption: "Firepit lounge beneath the palms" },
  { src: "/assets/damac-lagoons/gallery/gallery-12.webp", alt: "Poolside gathering on the floating deck at Sorrento Lagoon Views", caption: "Poolside gatherings on the floating deck" },
];

export default function DLGallery() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-16 lg:py-24 bg-[#F5F1E8]" id="gallery">
      <div className="max-w-[1280px] mx-auto px-4">
        <p className="text-[#1C6B82] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
          <span>09</span>
          <span className="w-8 h-px bg-[#1C6B82]" />
          <span>Gallery</span>
        </p>
        <h2 className="text-[#151A19] text-3xl lg:text-4xl font-extrabold mb-10 max-w-[600px]">
          Sorrento Renders &amp; Lifestyle
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {GALLERY.map((item, i) => (
            <button key={i} onClick={() => setSelected(item)} className="text-left group">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#E5E0D5] shadow-sm">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-[#5B6460] text-xs mt-2 leading-snug">{item.caption}</p>
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
