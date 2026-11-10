"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoAddOutline, IoRemoveOutline, IoArrowForward } from "react-icons/io5";

const PANELS = [
  {
    title: "Discover Palm Springs",
    text: "A master-planned family community by Nakheel in Jebel Ali, Dubai, close to Palm Jebel Ali.",
    image: "/assets/palm-springs-nakheel/images/hero-waterfront-sunset.png",
  },
  {
    title: "Explore Residences",
    text: "3 and 4 bedroom townhouses and 4 and 5 bedroom villas. Register to receive the floor plans as soon as Nakheel releases them.",
    image: "/assets/palm-springs-nakheel/images/townhouse-6plex-street-day.png",
  },
  {
    title: "Experience the Lifestyle",
    text: "Planned for spacious everyday family living. Amenities and specifications are to be confirmed by Nakheel.",
    image: "/assets/palm-springs-nakheel/images/villa-5br-living-dining-2.webp",
  },
  {
    title: "Understand the Investment",
    text: "Review the advertised price range of AED 3.8M–8.9M and the confirmed 60% before handover / 40% on handover payment plan, running through to handover in October 2030.",
    image: "/assets/palm-springs-nakheel/images/villa-exterior-infinity-pool-dusk.jpg",
  },
  {
    title: "Request a Private Consultation",
    text: "Leave your details and our team will contact you with the latest Palm Springs updates once Nakheel releases the official information.",
    image: "/assets/palm-springs-nakheel/images/villa-4br-master-bedroom.webp",
    cta: true,
  },
];

export default function PPJourney({ onOpenEnquiry }) {
  const [active, setActive] = useState(0);

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
      <p className="text-[#367BA8] text-xs font-bold tracking-[0.25em] uppercase mb-4">
        The Process
      </p>
      <h2 className="font-[family-name:var(--font-display)] text-[#102B46] text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-tight mb-8 sm:mb-10 max-w-[680px]">
        Your Journey to Exceptional Living at Palm Springs.
      </h2>

      <div className="space-y-3">
        {PANELS.map((panel, i) => {
          const isActive = i === active;
          return (
            <motion.div
              layout
              key={panel.title}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-[1.5rem] sm:rounded-[1.75rem] border overflow-hidden transition-colors ${
                isActive ? "bg-white border-[#367BA8]/30 shadow-[0_20px_50px_rgba(16,43,70,0.1)]" : "bg-[#F5F8FB] border-transparent"
              }`}
            >
              <button
                onClick={() => setActive(isActive ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-7 text-left"
              >
                <span className="flex items-center gap-4 sm:gap-6">
                  <span
                    className={`font-[family-name:var(--font-body)] text-xl sm:text-2xl font-extrabold ${
                      isActive ? "text-[#367BA8]" : "text-[#102B46]/30"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-[#102B46] text-lg sm:text-xl font-semibold">
                    {panel.title}
                  </span>
                </span>
                <span
                  className={`w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                    isActive ? "border-[#367BA8] text-[#367BA8]" : "border-[#102B46]/15 text-[#102B46]/50"
                  }`}
                >
                  {isActive ? <IoRemoveOutline /> : <IoAddOutline />}
                </span>
              </button>

              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="grid lg:grid-cols-[1fr_1.1fr] gap-6 px-5 sm:px-7 pb-6 sm:pb-8"
                >
                  <div className="flex flex-col justify-center">
                    <p className="text-[#252D36]/60 leading-relaxed mb-5">{panel.text}</p>
                    {panel.cta && (
                      <button
                        onClick={() =>
                          onOpenEnquiry({
                            title: "Request a Private Consultation",
                            interest: "Private Consultation",
                            ctaLabel: "Request a Private Consultation",
                          })
                        }
                        className="inline-flex items-center gap-2 bg-[#102B46] hover:bg-[#174A73] text-white font-semibold px-6 py-3.5 rounded-full text-sm transition-colors self-start"
                      >
                        Request a Private Consultation <IoArrowForward />
                      </button>
                    )}
                  </div>
                  <div className="relative aspect-[16/10] rounded-[1.25rem] overflow-hidden">
                    <Image
                      src={panel.image}
                      alt={panel.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
