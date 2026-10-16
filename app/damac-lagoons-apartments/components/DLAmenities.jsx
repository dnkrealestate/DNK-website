import React from "react";
import Image from "next/image";

const AMENITIES = [
  {
    name: "Wave Pool",
    text: "A dynamic pool experience with rolling waves — ride the swell or simply float along in the sun.",
    image: "/assets/damac-lagoons/amenities/wave-pool.webp",
  },
  {
    name: "Boho Lounge",
    text: "Relax in a rustic haven, where comfort meets tranquility — a space designed for ultimate relaxation.",
    image: "/assets/damac-lagoons/amenities/boho-lounge.webp",
  },
  {
    name: "Floating Amphitheatre",
    text: "Drift into the evening at the theatre, where performances unfold against a backdrop of still lagoon waters.",
    image: "/assets/damac-lagoons/amenities/floating-amphitheatre.webp",
  },
  {
    name: "Private Beach",
    text: "Step into paradise and head straight to the white sands. Surf, swim, or relax by the shore — all just beyond your doorstep.",
    image: "/assets/damac-lagoons/amenities/beach.webp",
  },
  {
    name: "Floating Bridge",
    text: "Walk across a serene path gently suspended over the lagoons, surrounded by the beauty of nature.",
    image: "/assets/damac-lagoons/amenities/floating-bridge.webp",
  },
  {
    name: "Waterfront Clubhouse",
    text: "The elegant clubhouse by the waters invites you to linger — evenings with friends, an impressive menu and five-star service.",
    image: "/assets/damac-lagoons/amenities/clubhouse.webp",
  },
];

export default function DLAmenities() {
  return (
    <section className="bg-white py-16 lg:py-24 px-4" id="amenities">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#0F766E] text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            Resort-Style Amenities
          </p>
          <h2 className="text-[#151A19] text-3xl lg:text-4xl font-semibold">
            Every Day Feels Like A Getaway
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
                alt={`${amenity.name} at Lagoon Views, Damac Lagoons`}
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
