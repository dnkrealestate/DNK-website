"use client";

import React, { useState } from "react";
import Image from "next/image";
import masterplanImg from "@/public/assets/other/palmjebelaliImg.webp";

// Coordinates (percent) matched against the real amenity pin positions on
// palmjebelali.ae's own aerial photo, so they land on the same real
// locations across the island rather than being scattered arbitrarily.
const AMENITIES = [
  { n: 1, label: "Signature Yacht Club", x: 13.33, y: 64.3 },
  { n: 2, label: "Town Center (Crescent A)", x: 21.03, y: 55.75 },
  { n: 3, label: "Luxury Lifestyle Mall", x: 23.03, y: 60.66 },
  { n: 4, label: "Beach Clubs", x: 28.43, y: 60.66 },
  { n: 5, label: "Leisure Park", x: 30.73, y: 62.48 },
  { n: 6, label: "Sunset Beach Promenade", x: 33.83, y: 59.57 },
  { n: 7, label: "Family Club Beach", x: 35.73, y: 61.57 },
  { n: 8, label: "Iconic Tower — 360° Panoramic Views", x: 37.53, y: 56.3 },
  { n: 9, label: "Sunset Waterfront Promenade", x: 42.03, y: 52.11 },
  { n: 10, label: "Sports & Wellness Club", x: 51.83, y: 57.21 },
  { n: 11, label: "Family Resort", x: 56.03, y: 52.48 },
  { n: 12, label: "Signature Wellness Resort", x: 61.73, y: 54.66 },
  { n: 13, label: "Celebration Village", x: 68.83, y: 54.11 },
  { n: 14, label: "Iconic Towers", x: 70.13, y: 50.66 },
  { n: 15, label: "Eco Resort", x: 80.03, y: 57.39 },
  { n: 16, label: "Sunrise Waterfront Promenade", x: 91.93, y: 61.93 },
  { n: 17, label: "Town Center (Crescent E)", x: 67.73, y: 73.75 },
];

export default function PJMasterplan() {
  const [active, setActive] = useState(null);
  const activeAmenity = AMENITIES.find((a) => a.n === active);

  return (
    <section className="w-full bg-white scroll-mt-20" id="masterplan">
      {/* Photo, locked to its native aspect ratio so the pin percentages
          below never drift out of place due to object-cover cropping */}
      <div className="relative w-full aspect-[1920/1068]">
        <Image
          src={masterplanImg}
          alt="Aerial view of Palm Jebel Ali"
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
        {/* All pins sit below the vertical midpoint, so the top band is
            free for the heading — darkened here for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/5 to-black/10" />

        <div className="absolute top-4 sm:top-8 lg:top-12 left-0 right-0 text-center px-4">
          <p className="text-[#C4A57F] text-[0.6rem] sm:text-xs font-semibold tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-1.5 sm:mb-4">
            Leading Lifestyle Amenities
          </p>
          <h2
            className="text-white text-base sm:text-2xl lg:text-4xl font-semibold tracking-[0.01em] sm:tracking-[0.02em] max-w-2xl mx-auto leading-snug"
            style={{ fontFamily: "var(--font-pj-display), serif" }}
          >
            Discover This World-Class Lifestyle Destination
          </h2>
        </div>

        {AMENITIES.map((p) => (
          <button
            key={p.n}
            onMouseEnter={() => setActive(p.n)}
            onFocus={() => setActive(p.n)}
            onMouseLeave={() => setActive(null)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(active === p.n ? null : p.n)}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-4 h-4"
            aria-label={p.label}
          >
            <span
              className={`absolute inline-flex h-full w-full rounded-full bg-white/50 ${
                active === p.n ? "animate-ping" : ""
              }`}
            />
            <span
              className={`relative w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 transition-all duration-200 ${
                active === p.n
                  ? "bg-[#C4A57F] border-white scale-125"
                  : "bg-white/80 border-white/90"
              }`}
            />
          </button>
        ))}

        {activeAmenity && (
          <div
            style={{ left: `${activeAmenity.x}%`, top: `${activeAmenity.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-[calc(100%+10px)] pointer-events-none whitespace-nowrap bg-white text-[#0A0C0E] text-[0.7rem] sm:text-xs font-semibold tracking-wide px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg"
          >
            {activeAmenity.label}
          </div>
        )}
      </div>

      {/* Full legend */}
      {/* <div className="py-14">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1">
            {AMENITIES.map((a) => (
              <button
                key={a.n}
                onMouseEnter={() => setActive(a.n)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(a.n)}
                onBlur={() => setActive(null)}
                className={`flex items-center gap-3 text-left py-2.5 border-b transition-colors duration-200 ${
                  active === a.n ? "border-[#C9A876]/40" : "border-white/[0.06]"
                }`}
              >
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[0.65rem] font-bold border transition-all duration-200 ${
                    active === a.n
                      ? "bg-gradient-to-r from-[#C9A876] to-[#E0C596] text-[#0A0C0E] border-[#C9A876]"
                      : "text-[#C9A876] border-[#C9A876]/30"
                  }`}
                >
                  {a.n}
                </span>
                <span
                  className={`text-sm leading-snug transition-colors duration-200 ${
                    active === a.n ? "text-white" : "text-white/55"
                  }`}
                >
                  {a.label}
                </span>
              </button>
            ))}
          </div>
          <p className="text-white/25 text-xs italic text-center mt-8">
            Marker positions are approximate.
          </p>
        </div>
      </div> */}
    </section>
  );
}
