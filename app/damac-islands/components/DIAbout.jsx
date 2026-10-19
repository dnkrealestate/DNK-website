import React from "react";
import Image from "next/image";

const FACTS = [
  { label: "Developer", value: "Damac Properties" },
  { label: "Community", value: "Dubailand, Dubai" },
  { label: "Residence Types", value: "Villas & Townhouses" },
  { label: "Starting Price", value: "AED 2.75M" },
  { label: "Signature Amenities", value: "7 Island Experiences" },
  { label: "Theme", value: "Maldives & Seychelles-Inspired" },
];

export default function DIAbout() {
  return (
    <section className="bg-white py-16 lg:py-28 px-4" id="about">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-[3/4] order-2 lg:order-1 shadow-xl shadow-black/5">
            <Image
              src="/assets/damac-islands/gallery/gallery-01.webp"
              alt="Damac Islands villas and lagoons in Dubailand"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-[#0F766E] text-sm font-semibold tracking-[0.3em] uppercase mb-4">
              About The Project
            </p>
            <h2 className="text-[#151A19] text-3xl lg:text-4xl font-semibold mb-6 leading-tight">
              A World Of Islands,
              <br />
              Brought To Dubailand
            </h2>
            <p className="text-[#5B6460] leading-relaxed mb-4">
              Imagine waking up each day to the blissful vibes of the
              world's most enchanting islands, from the serenity of the
              Maldives to the charm of Seychelles. Damac Islands isn't just
              a place to live; it's a perpetual journey through the world's
              most beautiful island destinations.
            </p>
            <p className="text-[#5B6460] leading-relaxed mb-8">
              Discover experiences designed to elevate your senses, where
              tranquil lagoons, lush jungle rivers, exhilarating water
              adventures and serene escapes come together to create an
              idyllic paradise — all within Dubailand, Dubai.
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-5 bg-[#F7F5F1] rounded-2xl p-6 border border-[#EBE8E2]">
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <p className="text-[#8A8F8B] text-xs uppercase tracking-wider mb-0.5">
                    {fact.label}
                  </p>
                  <p className="text-[#151A19] font-semibold">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
