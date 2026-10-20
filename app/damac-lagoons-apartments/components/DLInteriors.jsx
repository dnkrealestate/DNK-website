import React from "react";
import Image from "next/image";

export default function DLInteriors() {
  return (
    <section className="bg-[#F5F1E8] pb-16 lg:pb-24 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[#1C6B82] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
              <span>02</span>
              <span className="w-8 h-px bg-[#1C6B82]" />
              <span>Inside The Residences</span>
            </p>
            <h2 className="text-[#151A19] text-3xl lg:text-4xl font-extrabold max-w-[560px]">
              Contemporary in Design, Mediterranean at Heart
            </h2>
          </div>
          <p className="text-[#5B6460] max-w-[360px] leading-relaxed">
            Elegant curves, bright interiors and calming natural tones.
            Studios and 1-bedroom apartments pair thoughtful layouts with
            light-filled living spaces.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-auto md:row-span-2">
            <Image
              src="/assets/damac-lagoons/gallery/gallery-04.webp"
              alt="Light-filled living room at Sorrento Lagoon Views"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
            <Image
              src="/assets/damac-lagoons/gallery/gallery-06.webp"
              alt="Open-plan kitchen, dining and living at Sorrento Lagoon Views"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white text-sm font-semibold">
                Open-plan kitchen, dining and living
              </p>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
            <Image
              src="/assets/damac-lagoons/unit-1br.webp"
              alt="Bedroom opening onto the balcony at Sorrento Lagoon Views"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white text-sm font-semibold">
                Bedroom opening onto the balcony
              </p>
            </div>
          </div>
        </div>

        <p className="text-[#8A8F8B] text-xs text-center mt-6">
          Interior renders from Damac's official Sorrento marketing.
          Finishes and layouts per the official floor plans for each unit
          type.
        </p>
      </div>
    </section>
  );
}
