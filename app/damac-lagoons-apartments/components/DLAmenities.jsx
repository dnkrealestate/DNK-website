"use client";

import React, { useState } from "react";
import Image from "next/image";

const CATEGORIES = ["All", "Water Features", "Wellness", "Leisure", "Dining"];

const AMENITIES = [
  {
    name: "Wave Pool",
    category: "Water Features",
    text: "A dynamic pool experience with rolling waves — ride the swell or simply float along in the sun.",
    image: "/assets/damac-lagoons/amenities/wave-pool.webp",
  },
  {
    name: "Boho Lounge",
    category: "Leisure",
    text: "Relax in a rustic haven, where comfort meets tranquility — a space designed for ultimate relaxation.",
    image: "/assets/damac-lagoons/amenities/boho-lounge.webp",
  },
  {
    name: "Floating Amphitheatre",
    category: "Leisure",
    text: "Drift into the evening at the theatre, where performances unfold against a backdrop of still lagoon waters.",
    image: "/assets/damac-lagoons/amenities/floating-amphitheatre.webp",
  },
  {
    name: "Private Beach",
    category: "Water Features",
    text: "Step into paradise and head straight to the white sands. Surf, swim, or relax by the shore — all just beyond your doorstep.",
    image: "/assets/damac-lagoons/amenities/beach.webp",
  },
  {
    name: "Floating Bridge",
    category: "Wellness",
    text: "Walk across a serene path gently suspended over the lagoons, surrounded by the beauty of nature.",
    image: "/assets/damac-lagoons/amenities/floating-bridge.webp",
  },
  {
    name: "Waterfront Clubhouse",
    category: "Dining",
    text: "The elegant clubhouse by the waters invites you to linger — evenings with friends, an impressive menu and five-star service.",
    image: "/assets/damac-lagoons/amenities/clubhouse.webp",
  },
];

export default function DLAmenities() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? AMENITIES : AMENITIES.filter((a) => a.category === active);

  return (
    <section className="bg-white py-16 lg:py-24" id="amenities">
      <div className="max-w-[1200px] mx-auto px-4">
        <p className="text-[#1C6B82] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
          <span>08</span>
          <span className="w-8 h-px bg-[#1C6B82]" />
          <span>Amenities</span>
        </p>
        <h2 className="text-[#151A19] text-3xl lg:text-4xl font-extrabold mb-8 max-w-[600px]">
          Every Day Feels Like a Mediterranean Escape
        </h2>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${
                active === cat
                  ? "bg-[#151A19] border-[#151A19] text-white"
                  : "bg-white border-[#D8D4CC] text-[#4B5048] hover:border-[#1C6B82]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory">
        {filtered.map((amenity) => (
          <div
            key={amenity.name}
            className="group relative rounded-2xl overflow-hidden flex-shrink-0 w-[280px] aspect-[3/4] snap-start"
          >
            <Image
              src={amenity.image}
              alt={`${amenity.name} at Sorrento Lagoon Views, Damac Lagoons`}
              fill
              sizes="280px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5" />
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <h3 className="text-white font-bold text-xl mb-1">{amenity.name}</h3>
              <p className="text-white/60 text-xs leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-300 overflow-hidden">
                {amenity.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[#8A8F8B] text-xs text-center mt-6 px-4">
        Amenities as shown in Damac's Sorrento marketing; the clubhouse,
        lagoons and beaches belong to the wider Damac Lagoons community.
      </p>
    </section>
  );
}
