"use client";

import React from "react";
import Image from "next/image";

const ROW_1 = [
  { src: "/assets/manchester-city-yas/renders/render-aerial-canal.webp", alt: "Aerial view of Yas Canal at Manchester City Yas Residences" },
  { src: "/assets/manchester-city-yas/renders/render-lobby.webp", alt: "Residence lobby at Manchester City Yas Residences" },
  { src: "/assets/manchester-city-yas/units/unit-4br-pool.webp", alt: "4 Bedroom Villa pool at Manchester City Yas Residences" },
  { src: "/assets/manchester-city-yas/renders/render-match-day-terrace.webp", alt: "Match Day Terrace at Manchester City Yas Residences" },
  { src: "/assets/manchester-city-yas/amenities/amenity-crystal-lagoon.webp", alt: "Crystal Lagoon at Manchester City Yas Residences" },
  { src: "/assets/manchester-city-yas/units/unit-5br-master-bedroom.webp", alt: "5 Bedroom Villa master bedroom at Manchester City Yas Residences" },
  { src: "/assets/manchester-city-yas/renders/render-city-cafe.webp", alt: "City Cafe at Manchester City Yas Residences" },
  { src: "/assets/manchester-city-yas/amenities/amenity-rooftop-pool.webp", alt: "Rooftop infinity pool at Manchester City Yas Residences" },
  { src: "/assets/manchester-city-yas/renders/render-academy.webp", alt: "Manchester City Training Academy at Yas Residences" },
  { src: "/assets/manchester-city-yas/units/unit-townhouse-2br-front.webp", alt: "2 Bedroom Townhouse exterior at Manchester City Yas Residences" },
];

const ROW_2 = [
  { src: "/assets/manchester-city-yas/renders/render-fine-dining.webp", alt: "Fine dining restaurant at Manchester City Yas Residences" },
  { src: "/assets/manchester-city-yas/units/unit-duplex-front.webp", alt: "Duplex exterior at Manchester City Yas Residences" },
  { src: "/assets/manchester-city-yas/renders/render-gym.webp", alt: "Gym and fitness center at Manchester City Yas Residences" },
  { src: "/assets/manchester-city-yas/units/unit-5br-formal-living.webp", alt: "5 Bedroom Villa formal living room at Manchester City Yas Residences" },
  { src: "/assets/manchester-city-yas/amenities/amenity-spa-wellness.webp", alt: "Spa and wellness center at Manchester City Yas Residences" },
  { src: "/assets/manchester-city-yas/renders/render-tactical-room.webp", alt: "Tactical Room at Manchester City Yas Residences" },
  { src: "/assets/manchester-city-yas/units/unit-5br-kitchen.webp", alt: "5 Bedroom Villa kitchen at Manchester City Yas Residences" },
  { src: "/assets/manchester-city-yas/renders/render-skybox-lounge.webp", alt: "City Lounge at Manchester City Yas Residences" },
  { src: "/assets/manchester-city-yas/units/unit-5br-family-living.webp", alt: "5 Bedroom Villa family living room at Manchester City Yas Residences" },
  { src: "/assets/manchester-city-yas/amenities/amenity-karting.webp", alt: "Karting area at Manchester City Yas Residences" },
];

function MarqueeRow({ images, direction, speed }) {
  const doubled = [...images, ...images];
  return (
    <div className="relative overflow-hidden group">
      <div
        className={`flex gap-4 w-max ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        } group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((img, i) => (
          <MarqueeTile key={`${img.src}-${i}`} img={img} />
        ))}
      </div>
    </div>
  );
}

function MarqueeTile({ img }) {
  return (
    <div className="relative w-[260px] sm:w-[320px] aspect-[4/3] rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="320px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    </div>
  );
}

export default function MCGallery() {
  return (
    <section className="bg-[#070C16] pb-12 lg:pb-20" id="gallery">
      <div className="max-w-[1280px] mx-auto px-4 mb-10">
        <p className="text-[#6CABDD] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
          <span>05</span>
          <span className="w-8 h-px bg-[#6CABDD]" />
          <span>Gallery</span>
        </p>
        <h2 className="text-white text-3xl lg:text-4xl font-extrabold max-w-[640px]">
          Renders &amp; Lifestyle on Yas Island
        </h2>
      </div>

      <div className="space-y-4">
        <MarqueeRow images={ROW_1} direction="left" speed={48} />
        <MarqueeRow images={ROW_2} direction="right" speed={54} />
      </div>

      <p className="text-white/30 text-xs text-center mt-8 px-4">
        Renders from Ohana Development's official Manchester City Yas
        Residences marketing. Finishes and layouts per the official floor
        plans for each unit type.
      </p>

      <style jsx global>{`
        @keyframes marquee-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-marquee-left {
          animation: marquee-left linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right linear infinite;
        }
      `}</style>
    </section>
  );
}
