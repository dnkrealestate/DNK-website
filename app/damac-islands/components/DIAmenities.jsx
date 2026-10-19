import React from "react";
import Image from "next/image";

const AMENITIES = [
  {
    name: "Central Hub Fountain",
    text: "At the heart of paradise, experience a mesmerising display where water, light, and fire unite in a breathtaking spectacle of harmony.",
    image: "/assets/damac-islands/amenities/central-hub-fountain.webp",
  },
  {
    name: "Water Platform",
    text: "Elevated above serene waters, these dynamic spaces offer tranquil retreats by day and transform into lively social hubs after dark.",
    image: "/assets/damac-islands/amenities/water-platform.webp",
  },
  {
    name: "Paddling",
    text: "Drift through glowing waters and vibrant nightlife, uncovering the community's most captivating wonders from a fresh perspective.",
    image: "/assets/damac-islands/amenities/paddling.webp",
  },
  {
    name: "Lagoon Waterfalls",
    text: "Let the gentle cascade of water wash over your senses, offering a tranquil escape where the day's adventures melt into serenity.",
    image: "/assets/damac-islands/amenities/lagoon-waterfalls.webp",
  },
  {
    name: "Aqua Park",
    text: "Dive into a world of fun with thrilling slides and tranquil retreats, offering unforgettable adventures for all ages.",
    image: "/assets/damac-islands/amenities/aqua-park.webp",
  },
  {
    name: "Jungle River",
    text: "Experience a lush journey through vibrant retreats, hidden nooks, and thrilling rapids, where every twist brings new wonder.",
    image: "/assets/damac-islands/amenities/jungle-river.webp",
  },
  {
    name: "Jungle Swings",
    text: "Soar gently above shimmering waters and lush greenery, where every swing brings a new perspective of the enchanting beauty around.",
    image: "/assets/damac-islands/amenities/jungle-swings.webp",
  },
];

export default function DIAmenities() {
  return (
    <section className="bg-white py-16 lg:py-24 px-4" id="amenities">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#0F766E] text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            Island Experiences
          </p>
          <h2 className="text-[#151A19] text-3xl lg:text-4xl font-semibold">
            Every Day Feels Like An Escape
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AMENITIES.map((amenity) => (
            <div
              key={amenity.name}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-sm"
            >
              <Image
                src={amenity.image}
                alt={`${amenity.name} at Damac Islands, Dubailand`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <h3 className="text-white font-semibold text-lg mb-1">
                  {amenity.name}
                </h3>
                <p className="text-white/60 text-xs leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-300 overflow-hidden">
                  {amenity.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
