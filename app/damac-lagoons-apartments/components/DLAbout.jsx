import React from "react";
import Image from "next/image";

const FACTS = [
  { label: "Developer", value: "Damac Properties" },
  { label: "Community", value: "Damac Lagoons, Dubailand" },
  { label: "Phase", value: "Sorrento" },
  { label: "Unit Types", value: "Studio & 1 Bedroom" },
  { label: "Starting Price", value: "AED 680K" },
  { label: "Payment Plan", value: "50/50" },
];

export default function DLAbout() {
  return (
    <section className="bg-white py-16 lg:py-28 px-4" id="about">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-[3/4] order-2 lg:order-1 shadow-xl shadow-black/5">
            <Image
              src="/assets/damac-lagoons/gallery/gallery-01.webp"
              alt="Lagoon Views apartments overlooking the lagoon at Damac Lagoons"
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
              A New Chapter In
              <br />
              Mediterranean Living
            </h2>
            <p className="text-[#5B6460] leading-relaxed mb-4">
              Sorrento Lagoon Views is the newest phase within Damac
              Lagoons, with its top-tier amenities — a collection of Studio
              and 1 Bedroom luxury apartments that bring you elevated
              living inspired by the Mediterranean. Overlooking the lagoon
              and surrounded by lush greenery and stunning water features,
              find a lifestyle wrapped in serenity, with sleek curved
              exteriors and private balconies that offer sublime views.
            </p>
            <p className="text-[#5B6460] leading-relaxed mb-8">
              Close to the charm of Damac Hills, yet hidden away from the
              bustle, Damac Lagoons is a serene Mediterranean-inspired
              community where enchanting apartments, villas and townhouses
              are surrounded by azure lagoons, white sandy beaches and
              tropical vibes.
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
