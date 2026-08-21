"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import yachtImg from "@/public/assets/other/PJimg02.webp";
import aerialImg from "@/public/assets/other/PJimg03.webp";
import villaExteriorImg from "@/public/assets/other/PJimg04.webp";
import villaInteriorImg from "@/public/assets/other/PJimg05.webp";
import coverImg from "@/public/assets/other/PJimg01.webp";

// Placeholder imagery only — Palm Jebel Ali has no official renders in this
// project yet, so these are stand-ins to convey the intended mood (private
// marina, villa architecture, interiors) until real assets are supplied.
const GALLERY = [
  { src: coverImg, alt: "Aerial view of a private beachfront island community", span: "col-span-2 sm:row-span-2" },
  { src: villaExteriorImg, alt: "Modern luxury villa exterior with private pool" },
  { src: villaInteriorImg, alt: "Elegant luxury villa living room interior" },
  { src: yachtImg, alt: "Private yacht on turquoise waters" },
  { src: aerialImg, alt: "Beachfront resort walkway lined with palm trees" },
];

export default function PJGallery() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-20 bg-white" id="gallery">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="text-center mb-4">
          <p className="text-[#79644A] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            The Vision
          </p>
          <h2
            className="text-[#14181B] text-3xl lg:text-4xl mb-4 font-semibold"
            style={{ fontFamily: "var(--font-pj-display), serif" }}
          >
            A Glimpse of Island Living
          </h2>
        </div>
        <p className="text-black/35 text-xs text-center mb-10 italic">
          Imagery for illustration purposes only — indicative of the intended
          style and lifestyle, not final Palm Jebel Ali renderings.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 auto-rows-[160px] sm:auto-rows-[180px]">
          {GALLERY.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(item)}
              className={`relative rounded-2xl overflow-hidden border border-black/10 hover:border-[#79644A]/40 transition-all duration-300 group ${item.span || ""}`}
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

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <IoClose className="text-xl" />
          </button>
          <div className="relative w-full max-w-4xl h-[70vh]">
            <Image
              src={selected.src}
              alt={selected.alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
