"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const RESIDENCES = [
  {
    type: "Townhouses",
    bedrooms: "3 & 4 Bedroom",
    image: "/assets/palm-springs-nakheel/images/villas-exterior-sunset.png",
    imageCaption: "Representative exterior imagery",
  },
  {
    type: "Villas",
    bedrooms: "4 & 5 Bedroom",
    image: "/assets/palm-springs-nakheel/images/interior-living-sunset-view.png",
    imageCaption: "Representative interior imagery",
  },
];

export default function PSResidences({ onOpenEnquiry }) {
  return (
    <section className="bg-[#F7F5EF] py-16 sm:py-24 px-5 sm:px-8 scroll-mt-24" id="residences">
      <div className="max-w-[1320px] mx-auto">
        <p className="text-[#A9874F] text-xs font-bold tracking-[0.2em] uppercase mb-3">
          Residences
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-[#1C211F] text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 max-w-[640px]">
          Spaces Designed Around the Way You Live
        </h2>
        <p className="text-[#4B534E] max-w-[640px] mb-12 leading-relaxed">
          Two residence collections, priced from AED 3.8M to AED 9M across
          the community &mdash; register today and our advisors will send
          you specifications, floor plans and pricing.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {RESIDENCES.map((res, i) => (
            <motion.div
              key={res.type}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative border border-[#1C211F]/10 hover:border-[#C6A66B]/50 bg-white transition-colors overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={res.image}
                  alt={`${res.imageCaption} for Palm Springs ${res.type.toLowerCase()}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-4 text-white/80 text-[0.65rem] uppercase tracking-wider">
                  {res.imageCaption}
                </p>
              </div>

              <div className="p-8 sm:p-10">
                <p className="text-[#8A8F8B] text-xs uppercase tracking-[0.2em] mb-2">
                  {res.bedrooms}
                </p>
                <h3 className="font-[family-name:var(--font-display)] text-[#1C211F] text-3xl sm:text-4xl font-semibold mb-6">
                  {res.type}
                </h3>

                <div className="mb-8 pb-8 border-b border-[#1C211F]/10">
                  <span className="text-[#8A8F8B] text-xs uppercase tracking-wider block mb-1">
                    Price
                  </span>
                  <span className="font-[family-name:var(--font-body)] text-[#A9874F] text-base sm:text-lg font-bold tracking-tight tabular-nums">
                    Within the advertised AED 3.8M&ndash;9M range
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() =>
                      onOpenEnquiry({
                        eyebrow: `${res.type} Enquiry`,
                        title: `Request ${res.type} Floor Plans`,
                        subtitle: `We'll send the verified floor plans and pricing for the ${res.bedrooms.toLowerCase()} ${res.type.toLowerCase()} as soon as they're released by Nakheel.`,
                        interest: "Floor Plans",
                        propertyType: res.type,
                        ctaLabel: `Request ${res.type} Floor Plans`,
                      })
                    }
                    className="flex-1 bg-gradient-to-r from-[#C6A66B] to-[#A9874F] hover:brightness-110 text-[#011945] font-bold px-5 py-3 rounded-sm text-sm text-center transition-all"
                  >
                    Request Floor Plans
                  </button>
                  <button
                    onClick={() =>
                      onOpenEnquiry({
                        eyebrow: `${res.type} Enquiry`,
                        title: `Enquire About ${res.type}`,
                        interest: "Pricing",
                        propertyType: res.type,
                        ctaLabel: "Enquire About Availability",
                      })
                    }
                    className="flex-1 border border-[#1C211F]/25 hover:border-[#C6A66B] text-[#1C211F] font-semibold px-5 py-3 rounded-sm text-sm text-center transition-colors"
                  >
                    Enquire About Availability
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
