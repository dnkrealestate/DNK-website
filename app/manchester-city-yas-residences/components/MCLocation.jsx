"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoLocationSharp } from "react-icons/io5";

// Pin coordinates (% of image width/height) sourced from the official
// Ohana project page's interactive masterplan.
const PINS = [
  { num: "1", name: "Manchester City Yas Residences by Ohana", time: "", x: 53.81, y: 58.91, isProject: true },
  { num: "2", name: "Ferrari World", time: "6 min", x: 50.11, y: 17.09 },
  { num: "3", name: "SeaWorld", time: "7 min", x: 67.39, y: 27.09 },
  { num: "4", name: "Yas Waterworld", time: "10 min", x: 50.11, y: 4.09 },
  { num: "5", name: "Yas Marina", time: "6 min", x: 26.11, y: 32.09 },
  { num: "6", name: "Yas Marina Circuit", time: "7 min", x: 40.11, y: 17.09 },
  { num: "7", name: "Yas Links Abu Dhabi", time: "10 min", x: 40.11, y: 7.09 },
  { num: "8", name: "Etihad Arena", time: "4 min", x: 9.11, y: 29.09 },
  { num: "9", name: "Yas Bay", time: "5 min", x: 4.11, y: 20.09 },
  { num: "10", name: "Yas Creative Hub", time: "5 min", x: 11.11, y: 20.09 },
  { num: "11", name: "Sphere Abu Dhabi", time: "5 min", x: 72.89, y: 15.09 },
];

const POINTS_OF_INTEREST = [
  { place: "Yas Island (walking distance)", min: "5 min" },
  { place: "Abu Dhabi International Airport", min: "10–15 min" },
  { place: "Louvre Abu Dhabi, Saadiyat Island", min: "15–20 min" },
  { place: "Sheikh Zayed Grand Mosque", min: "15–20 min" },
  { place: "Al Reem Island", min: "25–30 min" },
  { place: "Al Jurf", min: "25–30 min" },
  { place: "Corniche Abu Dhabi", min: "25–30 min" },
  { place: "Al Maktoum International Airport", min: "45–50 min" },
  { place: "Dubai", min: "50–60 min" },
];

function MapPin({ pin }) {
  const [open, setOpen] = useState(false);
  const flipUp = pin.y > 50;

  return (
    <div
      className="absolute z-10"
      style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: "translate(-50%, -50%)" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 text-white text-xs font-bold flex items-center justify-center transition-colors ${
          pin.isProject
            ? "bg-[#6CABDD] border-white shadow-[0_0_0_4px_rgba(108,171,221,0.3)]"
            : "bg-[#0A0F1C]/90 border-white/60 hover:border-[#6CABDD]"
        }`}
      >
        {pin.num}
      </button>

      {open && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 ${
            flipUp ? "bottom-full mb-2" : "top-full mt-2"
          } bg-[#0A0F1C] border border-white/15 rounded-lg px-3 py-2 whitespace-nowrap shadow-xl z-20`}
        >
          <p className="text-white text-xs font-semibold">{pin.name}</p>
          {pin.time && <p className="text-[#6CABDD] text-[0.65rem] font-bold">{pin.time}</p>}
        </div>
      )}
    </div>
  );
}

export default function MCLocation() {
  return (
    <section className="bg-[#0A0F1C] pb-12 lg:pb-20 px-4" id="location">
      <div className="max-w-[1280px] mx-auto">
        <p className="text-[#6CABDD] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
          <span>06</span>
          <span className="w-8 h-px bg-[#6CABDD]" />
          <span>Location</span>
        </p>
        <h2 className="text-white text-3xl lg:text-4xl font-extrabold mb-4 max-w-[640px]">
          At The Centre Of It All
        </h2>
        <p className="text-white/60 max-w-[680px] mb-10 leading-relaxed">
          Set within one of Abu Dhabi's most dynamic districts on Yas
          Island — immediate access to culture, leisure, sport and
          entertainment, alongside the calm of a composed residential
          setting.*
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 mb-6 aspect-[4/3] sm:aspect-[21/11]"
        >
          <Image
            src="/assets/manchester-city-yas/renders/render-yas-island-map.webp"
            alt="Manchester City Yas Residences masterplan with nearby Yas Island landmarks"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
          {PINS.map((pin) => (
            <MapPin key={pin.num} pin={pin} />
          ))}
        </motion.div>
        <p className="text-white/30 text-xs text-center mb-10">
          Tap or hover a marker for details.
        </p>

        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8">
          <p className="text-[#6CABDD] text-xs font-bold tracking-[0.2em] uppercase mb-5 flex items-center gap-2">
            <IoLocationSharp />
            Points of Interest
          </p>
          <div className="grid sm:grid-cols-2 gap-x-10">
            {POINTS_OF_INTEREST.map((p, i) => (
              <div
                key={p.place}
                className={`flex items-center justify-between gap-4 py-3 ${
                  i !== POINTS_OF_INTEREST.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <p className="text-white/70 text-sm">{p.place}</p>
                <p className="text-white font-semibold text-sm whitespace-nowrap">{p.min}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/30 text-xs text-center mt-6">
          * Approximate drive times by car, for general orientation only.
        </p>
      </div>
    </section>
  );
}
