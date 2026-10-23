"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const RESIDENCES = [
  {
    type: "Townhouse",
    image: "/assets/aldar-dubai-launch/images/townhouse-exterior-row.webp",
    imageCaption: "Representative exterior imagery",
    price: "AED 2.875M",
    bedrooms: "3",
  },
  {
    type: "Villa",
    image: "/assets/aldar-dubai-launch/images/villa-exterior-rear.webp",
    imageCaption: "Representative exterior imagery",
    price: "AED 3.95M",
    bedrooms: "3",
  },
];

export default function AResidences({ onOpenEnquiry }) {
  return (
    <section className="bg-[#101820] py-16 sm:py-24 px-5 sm:px-8 scroll-mt-24" id="residences">
      <div className="max-w-[1320px] mx-auto">
        <p className="text-[#C6A46A] text-xs font-bold tracking-[0.2em] uppercase mb-3">
          Residences
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-white text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 max-w-[640px]">
          The Residence Collection
        </h2>
        <p className="text-white/50 max-w-[600px] mb-12 leading-relaxed">
          Two exceptional residence styles, crafted for modern Dubai
          living. Register today and be first in line to receive full
          specifications, floor plans and pricing the moment Aldar
          releases them.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {RESIDENCES.map((res, i) => (
            <motion.div
              key={res.type}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative border border-white/10 hover:border-[#C6A46A]/40 bg-gradient-to-br from-white/[0.04] to-transparent transition-colors overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={res.image}
                  alt={`${res.imageCaption} for Aldar's advertised ${res.type.toLowerCase()}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-transparent to-transparent" />
                <p className="absolute bottom-3 left-4 text-white/60 text-[0.65rem] uppercase tracking-wider">
                  {res.imageCaption}
                </p>
              </div>

              <div className="p-8 sm:p-10">
                <p className="text-white/50 text-xs uppercase tracking-[0.2em] mb-2">
                  {res.bedrooms}-Bedroom
                </p>
                <h3 className="font-[family-name:var(--font-display)] text-white text-3xl sm:text-4xl font-semibold mb-6">
                  {res.type}
                </h3>

                <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-white/10">
                  <span className="text-white/40 text-xs uppercase tracking-wider">
                    Starting from
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-[#C6A46A] text-2xl sm:text-3xl font-semibold">
                    {res.price}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() =>
                      onOpenEnquiry({
                        eyebrow: `${res.type} Enquiry`,
                        title: `Request ${res.type} Floor Plans`,
                        subtitle: `We'll send the sample floor plan and the latest available layouts for the ${res.bedrooms}-bedroom ${res.type.toLowerCase()}.`,
                        document: "Floor Plans",
                        property: res.type,
                        ctaLabel: `Request ${res.type} Floor Plans`,
                      })
                    }
                    className="flex-1 bg-gradient-to-r from-[#C6A46A] to-[#A9874F] hover:brightness-110 text-[#071321] font-bold px-5 py-3 rounded-sm text-sm text-center transition-all"
                  >
                    Request Floor Plans
                  </button>
                  <button
                    onClick={() =>
                      onOpenEnquiry({
                        eyebrow: `${res.type} Enquiry`,
                        title: `Enquire About the ${res.type}`,
                        property: res.type,
                        ctaLabel: "Enquire About Availability",
                      })
                    }
                    className="flex-1 border border-white/25 hover:border-[#C6A46A] text-white font-semibold px-5 py-3 rounded-sm text-sm text-center transition-colors"
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
