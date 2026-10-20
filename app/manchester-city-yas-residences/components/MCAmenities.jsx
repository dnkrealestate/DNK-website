"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const CATEGORIES = [
  "All",
  "Manchester City Park",
  "Social & Dining",
  "Outdoor & Water",
  "Wellness & Recovery",
  "Sport & Lifestyle",
];

const AMENITIES = [
  { name: "Manchester City Training Academy", category: "Sport & Lifestyle", image: "/assets/manchester-city-yas/renders/render-academy.webp" },
  { name: "Tactical Room", category: "Sport & Lifestyle", image: "/assets/manchester-city-yas/renders/render-tactical-room.webp" },
  { name: "Gym & Fitness Center", category: "Sport & Lifestyle", image: "/assets/manchester-city-yas/renders/render-gym.webp" },
  { name: "Lobby", category: "Social & Dining", image: "/assets/manchester-city-yas/renders/render-lobby.webp" },
  { name: "Match Day Terrace", category: "Social & Dining", image: "/assets/manchester-city-yas/renders/render-match-day-terrace.webp" },
  { name: "City Cafe", category: "Social & Dining", image: "/assets/manchester-city-yas/renders/render-city-cafe.webp" },
  { name: "Fine Dining Restaurant", category: "Social & Dining", image: "/assets/manchester-city-yas/renders/render-fine-dining.webp" },
  { name: "Canal Promenade", category: "Social & Dining", image: "/assets/manchester-city-yas/amenities/amenity-terrace-01.webp" },
  { name: "City Lounge", category: "Social & Dining", image: "/assets/manchester-city-yas/amenities/amenity-terrace-02.webp" },
  { name: "Rooftop & Infinity Pool", category: "Outdoor & Water", image: "/assets/manchester-city-yas/amenities/amenity-rooftop-pool.webp" },
  { name: "Crystal Lagoon", category: "Outdoor & Water", image: "/assets/manchester-city-yas/amenities/amenity-crystal-lagoon.webp" },
  { name: "Karting Area", category: "Manchester City Park", image: "/assets/manchester-city-yas/amenities/amenity-karting.webp" },
  { name: "Park Pavilion", category: "Manchester City Park", image: "/assets/manchester-city-yas/amenities/amenity-terrace-03.webp" },
  { name: "Amphitheatre", category: "Manchester City Park", image: "/assets/manchester-city-yas/amenities/amenity-terrace-04.webp" },
  { name: "SPA & Wellness Center", category: "Wellness & Recovery", image: "/assets/manchester-city-yas/amenities/amenity-spa-wellness.webp" },
  { name: "Longevity Treatment Rooms", category: "Wellness & Recovery", image: "/assets/manchester-city-yas/amenities/amenity-longevity.webp" },
  { name: "Medical Center & Clinics", category: "Wellness & Recovery", image: "/assets/manchester-city-yas/amenities/amenity-medical-center.webp" },
];

export default function MCAmenities() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? AMENITIES : AMENITIES.filter((a) => a.category === active);
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    updateScrollState();
  }, [active]);

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const cardWidth = card ? card.offsetWidth + 16 : 300;
    el.scrollBy({ left: dir * cardWidth * 2, behavior: "smooth" });
  };

  return (
    <section className="bg-[#0A0F1C] pt-4 pb-12 lg:pb-20 px-4" id="amenities">
      <div className="max-w-[1280px] mx-auto">
        <p className="text-[#6CABDD] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
          <span>04</span>
          <span className="w-8 h-px bg-[#6CABDD]" />
          <span>Amenities</span>
        </p>
        <h2 className="text-white text-3xl lg:text-4xl font-extrabold mb-8 max-w-[640px]">
          Amenities Modelled on Elite Sport &amp; Recovery
        </h2>

        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${
                  active === cat
                    ? "bg-[#6CABDD] border-[#6CABDD] text-[#07101E]"
                    : "bg-white/[0.04] border-white/15 text-white/70 hover:border-[#6CABDD]/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll amenities left"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#6CABDD] transition-colors"
            >
              <IoChevronBack />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              disabled={!canScrollRight}
              aria-label="Scroll amenities right"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#6CABDD] transition-colors"
            >
              <IoChevronForward />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={updateScrollState}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {filtered.map((amenity) => (
            <div
              key={amenity.name}
              data-card
              className="group relative rounded-2xl overflow-hidden flex-shrink-0 w-[220px] sm:w-[260px] aspect-[3/4] snap-start"
            >
              <Image
                src={amenity.image}
                alt={`${amenity.name} at Manchester City Yas Residences`}
                fill
                sizes="260px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex items-end p-3.5">
                <h3 className="text-white font-bold text-sm leading-snug">{amenity.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <p className="text-white/30 text-xs text-center mt-8">
          Amenities as shown in Ohana Development's official Manchester City
          Yas Residences marketing. Final specifications are confirmed by
          the developer.
        </p>
      </div>
    </section>
  );
}
