"use client";

import React, { useState } from "react";
import Image from "next/image";
import DLPopupModal from "./DLPopupModal";

const UNITS = [
  {
    type: "1 Bedroom",
    price: "AED 1.353M",
    size: "Up to 1,418 sq.ft",
    image: "/assets/damac-lagoons/unit-1br.webp",
  },
  {
    type: "2 Bedroom",
    price: "AED 1.801M",
    size: "Up to 1,797 sq.ft",
    image: "/assets/damac-lagoons/unit-2br.webp",
  },
];

export default function DLUnitTypes() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section className="bg-[#F7F5F1] py-16 lg:py-24 px-4" id="units">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#0F766E] text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            Unit Types
          </p>
          <h2 className="text-[#151A19] text-3xl lg:text-4xl font-semibold">
            Apartments Designed For Lagoon Living
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {UNITS.map((unit) => (
            <div
              key={unit.type}
              className="group relative rounded-3xl overflow-hidden border border-[#EBE8E2] bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={unit.image}
                  alt={`${unit.type} apartment at Lagoon Views, Damac Lagoons`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 lg:p-8">
                <h3 className="text-[#151A19] text-2xl font-semibold mb-1">
                  {unit.type} Apartment
                </h3>
                <p className="text-[#8A8F8B] text-sm mb-4">{unit.size}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#8A8F8B] text-xs uppercase tracking-wider">
                      Starting From
                    </p>
                    <p className="text-[#B68A2E] text-2xl font-bold">
                      {unit.price}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPopup(true)}
                    className="bg-[#151A19] hover:bg-[#B68A2E] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all duration-200"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[#8A8F8B] text-xs text-center mt-8">
          Prices and availability correct as of publication and subject to
          change by the developer.
        </p>
      </div>

      {showPopup && <DLPopupModal onClose={() => setShowPopup(false)} />}
    </section>
  );
}
