"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const BRANDED_SPACES = [
  "Manchester City Training Academy",
  "City Lounge",
  "City Cafe",
  "Match Day Terrace",
  "Tactical Room",
];

export default function MCPartnership() {
  return (
    <section className="relative bg-[#070C16] pb-12 lg:pb-20 px-4 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden border border-white/10"
        >
          <div className="relative aspect-[16/9] sm:aspect-[21/9]">
            <Image
              src="/assets/manchester-city-yas/renders/render-academy.webp"
              alt="Manchester City Training Academy at Yas Residences"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover w-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050810]/80 via-transparent to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-12">
              <div className="flex items-center gap-4 sm:gap-5 mb-5">
                <Image
                  src="/assets/manchester-city-yas/logos/logo-ohana-wordmark.png"
                  alt="Ohana Development"
                  width={850}
                  height={224}
                  className="h-7 sm:h-8 w-auto brightness-0 invert"
                />
                <span className="w-px h-8 sm:h-10 bg-white/30" />
                <Image
                  src="/assets/manchester-city-yas/logos/logo-mancity-crest.png"
                  alt="Manchester City F.C."
                  width={283}
                  height={224}
                  className="h-12 sm:h-14 w-auto brightness-0 invert"
                />
              </div>

              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 max-w-[640px] leading-tight">
                A partnership built on shared excellence
              </h2>
              <p className="text-white/70 max-w-[600px] mb-6 leading-relaxed">
                Ohana Development and Manchester City F.C. have brought the
                club's standard of excellence to Yas Island — including a
                dedicated Training Academy, City Lounge and Match Day
                Terrace. Manchester City star{" "}
                <span className="text-[#6CABDD] font-semibold">
                  Erling Haaland
                </span>{" "}
                is a homeowner at the development.
              </p>

              <div className="flex flex-wrap gap-2">
                {BRANDED_SPACES.map((space) => (
                  <span
                    key={space}
                    className="rounded-full px-3.5 py-1.5 text-xs font-semibold bg-white/10 border border-white/20 text-white backdrop-blur-sm"
                  >
                    {space}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-12 lg:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#6CABDD] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
              <span className="w-8 h-px bg-[#6CABDD]" />
              <span>Backed By The Club</span>
            </p>
            <h3 className="text-white text-2xl sm:text-3xl font-extrabold mb-4 leading-tight">
              Where Manchester City's Players Call Home
            </h3>
            <p className="text-white/60 leading-relaxed max-w-[480px]">
              Manchester City star Erling Haaland is a confirmed homeowner
              at the development — a reflection of the club's own
              confidence in this partnership and in Yas Island as a home
              for its players.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[6/5]"
          >
            <Image
              src="/assets/manchester-city-yas/renders/players-mancity.webp"
              alt="Manchester City first-team players in club kit"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-contain"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#070C16] to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
