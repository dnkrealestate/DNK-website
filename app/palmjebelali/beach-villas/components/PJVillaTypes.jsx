"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MdCheckCircle, MdArrowForward, MdBed, MdSquareFoot } from "react-icons/md";
import { PiRulerBold } from "react-icons/pi";
import beachVillaImg from "@/public/assets/other/beach-villas.webp";
import coralVillaImg from "@/public/assets/other/coral-villas.webp";
import PJPopupModel from "./PJPopupModel";

const VILLAS = [
  {
    name: "Beach Villas",
    tagline: "Your private shoreline",
    featured: true,
    image: beachVillaImg,
    imageAlt: "Contemporary beachfront villa exterior at twilight — for illustration purposes only",
    bedrooms: "5 – 6 BR",
    price: "AED 30M – 33M",
    priceNote: "Approx.",
    plot: "7,300 – 8,800 sqft",
    bua: "7,600 – 8,600 sqft",
    eoi: "AED 1,000,000",
    points: [
      "Direct private beach frontage",
      "Uninterrupted Arabian Gulf views",
      "Signature indoor–outdoor living",
      "Dedicated staff & family wings",
    ],
  },
  {
    name: "Coral Villas",
    tagline: "Elevated island grandeur",
    featured: false,
    image: coralVillaImg,
    imageAlt: "Luxury villa exterior with private pool — for illustration purposes only",
    bedrooms: "6 – 7 BR",
    price: "AED 48M – 54M",
    priceNote: "Approx.",
    plot: "16,000 – 21,000 sqft",
    bua: "11,600 – 12,800 sqft",
    eoi: "AED 1,000,000",
    points: [
      "Among the largest plots on the island",
      "Expansive multi-level entertaining spaces",
      "Private pool, garden & water frontage",
      "Ultimate privacy on oversized grounds",
    ],
  },
];

export default function PJVillaTypes() {
  const [popupUnit, setPopupUnit] = useState(null);

  return (
    <section className="py-20 bg-[#F7F5F1]" id="villas">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#79644A] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            The Collection
          </p>
          <h2
            className="text-[#14181B] text-3xl lg:text-4xl mb-4 font-semibold"
            style={{ fontFamily: "var(--font-pj-display), serif" }}
          >
            Two Villas. One Standard of Excellence.
          </h2>
          <p className="text-black/50 text-base max-w-xl mx-auto leading-relaxed">
            Choose between the intimacy of the Beach Villas or the sheer
            scale of the Coral Villas — both crafted to the same exacting
            standard of privacy and design.
          </p>
          <p className="text-black/35 text-xs italic mt-3">
            Imagery for illustration purposes only — not final Palm Jebel Ali renderings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {VILLAS.map((villa) => (
            <div
              key={villa.name}
              className={`relative rounded-3xl border overflow-hidden transition-all duration-300 ${
                villa.featured
                  ? "bg-gradient-to-b from-[#79644A]/[0.06] to-white border-[#79644A]/35 shadow-xl shadow-black/5"
                  : "bg-white border-black/10 hover:border-[#79644A]/25 shadow-sm"
              }`}
            >
              {/* Villa image */}
              <div className="relative w-full h-64 lg:h-72">
                <Image
                  src={villa.image}
                  alt={villa.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority={villa.featured}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/10" />
                {villa.featured && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-[#79644A] to-[#9C8564] text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
                    Most Requested
                  </span>
                )}
              </div>

              <div className="p-7 lg:p-9">
              <p className="text-[#79644A] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                {villa.tagline}
              </p>
              <h3
                className="text-[#14181B] text-3xl lg:text-4xl font-semibold mb-6"
                style={{ fontFamily: "var(--font-pj-display), serif" }}
              >
                {villa.name}
              </h3>

              {/* Price */}
              <div className="mb-7">
                <p className="text-black/40 text-xs uppercase tracking-wider mb-1">
                  Starting From
                </p>
                <p className="text-[#79644A] text-3xl lg:text-[2.25rem] font-bold leading-none">
                  {villa.price}
                </p>
                <p className="text-black/30 text-xs mt-1">{villa.priceNote}</p>
              </div>

              {/* Spec grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-7">
                <div className="bg-[#FAF9F6] border border-black/[0.07] rounded-xl p-2.5 sm:p-3 text-center">
                  <MdBed className="text-[#79644A] text-base sm:text-lg mx-auto mb-1" />
                  <p className="text-[#14181B] text-xs sm:text-sm font-semibold m-0 leading-tight">
                    {villa.bedrooms}
                  </p>
                  <p className="text-black/40 text-[0.62rem] sm:text-[0.7rem] mt-0.5 m-0">
                    Bedrooms
                  </p>
                </div>
                <div className="bg-[#FAF9F6] border border-black/[0.07] rounded-xl p-2.5 sm:p-3 text-center">
                  <PiRulerBold className="text-[#79644A] text-base sm:text-lg mx-auto mb-1" />
                  <p className="text-[#14181B] text-xs sm:text-sm font-semibold m-0 leading-tight">
                    {villa.plot}
                  </p>
                  <p className="text-black/40 text-[0.62rem] sm:text-[0.7rem] mt-0.5 m-0">
                    Plot Size
                  </p>
                </div>
                <div className="bg-[#FAF9F6] border border-black/[0.07] rounded-xl p-2.5 sm:p-3 text-center">
                  <MdSquareFoot className="text-[#79644A] text-base sm:text-lg mx-auto mb-1" />
                  <p className="text-[#14181B] text-xs sm:text-sm font-semibold m-0 leading-tight">
                    {villa.bua}
                  </p>
                  <p className="text-black/40 text-[0.62rem] sm:text-[0.7rem] mt-0.5 m-0">
                    BUA
                  </p>
                </div>
              </div>

              {/* Points */}
              <ul className="space-y-2.5 mb-8">
                {villa.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <MdCheckCircle className="text-[#79644A] text-lg flex-shrink-0 mt-0.5" />
                    <span className="text-black/60 text-sm leading-snug">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              {/* EOI + CTA */}
              <div className="flex items-center justify-between gap-4 pt-6 border-t border-black/10">
                <div>
                  <p className="text-black/40 text-xs uppercase tracking-wider m-0">
                    Expression of Interest
                  </p>
                  <p className="text-[#14181B] font-bold text-lg m-0">
                    {villa.eoi}
                  </p>
                </div>
                <button
                  onClick={() => setPopupUnit(villa.name)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    villa.featured
                      ? "bg-gradient-to-r from-[#79644A] to-[#9C8564] text-white hover:brightness-110"
                      : "border border-[#79644A]/35 text-[#79644A] hover:bg-[#79644A]/10"
                  }`}
                >
                  Register
                  <MdArrowForward />
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {popupUnit && (
        <PJPopupModel unitInterest={popupUnit} onClose={() => setPopupUnit(null)} />
      )}
    </section>
  );
}
