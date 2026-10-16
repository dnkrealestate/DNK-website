import React from "react";
import Image from "next/image";
import { FaPlane, FaCity, FaUmbrellaBeach, FaShoppingBag } from "react-icons/fa";

const CONNECTIVITY = [
  { icon: FaCity, label: "Damac Hills", distance: "Adjacent community" },
  { icon: FaPlane, label: "Al Maktoum International Airport", distance: "Approx. 25 min*" },
  { icon: FaCity, label: "Downtown Dubai", distance: "Approx. 30 min*" },
  { icon: FaUmbrellaBeach, label: "Dubai Marina", distance: "Approx. 30 min*" },
  { icon: FaShoppingBag, label: "Dubai Outlet Mall", distance: "Approx. 15 min*" },
  { icon: FaPlane, label: "Dubai International Airport (DXB)", distance: "Approx. 35 min*" },
];

const HIGHLIGHTS = [
  {
    title: "Within Damac Lagoons",
    text: "Part of Damac's flagship Mediterranean-themed master community — lagoons, white-sand beaches, landscaped waterways and clustered neighbourhoods on your doorstep.",
  },
  {
    title: "Dubailand District",
    text: "Positioned within Dubailand, one of Dubai's largest planned development districts, with major road networks connecting the rest of the city.",
  },
  {
    title: "Well Connected",
    text: "Convenient access to Al Qudra Road and the wider Dubailand road network, linking the community to central Dubai and both international airports.",
  },
];

export default function DLLocation() {
  return (
    <section className="bg-white py-16 lg:py-24 px-4" id="location">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#0F766E] text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            Location
          </p>
          <h2 className="text-[#151A19] text-3xl lg:text-4xl font-semibold mb-4">
            Dubailand, Minutes From Everywhere That Matters
          </h2>
          <p className="text-[#5B6460] max-w-[640px] mx-auto leading-relaxed">
            Damac Lagoons sits in the heart of Dubailand, right beside the
            established Damac Hills community — close enough to the city's
            key destinations, yet wrapped in its own private lagoon
            setting away from the bustle.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-14">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl shadow-black/5">
            <Image
              src="/assets/damac-lagoons/gallery/gallery-08.webp"
              alt="Damac Lagoons community location in Dubailand, Dubai"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="bg-[#F7F5F1] rounded-3xl border border-[#EBE8E2] p-6 lg:p-8">
            <h3 className="text-[#151A19] font-semibold text-lg mb-5">
              Connectivity
            </h3>
            <div className="space-y-4">
              {CONNECTIVITY.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 border-b border-[#EBE8E2] last:border-0 pb-4 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white border border-[#EBE8E2] flex items-center justify-center text-[#B68A2E] flex-shrink-0">
                      <item.icon className="text-sm" />
                    </div>
                    <span className="text-[#151A19] text-sm font-medium">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[#5B6460] text-sm font-semibold whitespace-nowrap">
                    {item.distance}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[#8A8F8B] text-[0.65rem] mt-5">
              * Approximate drive times by car, for general orientation only.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[#EBE8E2] p-6"
            >
              <h4 className="text-[#151A19] font-semibold mb-2">
                {item.title}
              </h4>
              <p className="text-[#5B6460] text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
