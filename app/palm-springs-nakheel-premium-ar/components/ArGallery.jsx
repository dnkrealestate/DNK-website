"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose, IoArrowForward, IoArrowBack } from "react-icons/io5";

const IMAGES = [
  {
    src: "/assets/palm-springs-nakheel/images/townhouse-community-pool.png",
    alt: "مسبح مجتمع التاون هاوس في بالم سبرينغز من نخيل",
    caption: "تاون هاوس — مسبح المجتمع",
    span: "sm:col-span-2",
    height: "h-[220px] sm:h-[260px]",
  },
  {
    src: "/assets/palm-springs-nakheel/images/community-lagoon-aerial-day.png",
    alt: "منظر جوي نهاري لبحيرة المجتمع في بالم سبرينغز من نخيل",
    caption: "منظر جوي لبحيرة المجتمع",
    span: "",
    height: "h-[220px] sm:h-[260px]",
  },
  {
    src: "/assets/palm-springs-nakheel/images/villa-5br-pool-loungers.png",
    alt: "مسبح فيلا 5 غرف نوم مع كراسي استلقاء في بالم سبرينغز من نخيل",
    caption: "فيلا 5 غرف نوم — المسبح",
    span: "",
    height: "h-[220px] sm:h-[260px]",
  },
  {
    src: "/assets/palm-springs-nakheel/images/community-amenities-walkway.png",
    alt: "ممشى مرافق مظلل في بالم سبرينغز من نخيل",
    caption: "ممشى مرافق المجتمع",
    span: "",
    height: "h-[220px] sm:h-[260px]",
  },
  {
    src: "/assets/palm-springs-nakheel/images/community-pool-dusk.png",
    alt: "مسبح المجتمع عند الغسق في بالم سبرينغز من نخيل",
    caption: "مسبح المجتمع عند الغسق",
    span: "",
    height: "h-[220px] sm:h-[260px]",
  },
  {
    src: "/assets/palm-springs-nakheel/images/villa-4br-living-dining-1.webp",
    alt: "صالة وغرفة طعام فيلا 4 غرف نوم في بالم سبرينغز من نخيل",
    caption: "فيلا 4 غرف نوم — الصالة والطعام",
    span: "",
    height: "h-[220px] sm:h-[260px]",
  },
  {
    src: "/assets/palm-springs-nakheel/images/townhouse-4plex-street-evening.png",
    alt: "منظر شارع التاون هاوس في بالم سبرينغز من نخيل",
    caption: "تاون هاوس — منظر الشارع",
    span: "",
    height: "h-[220px] sm:h-[260px]",
  },
  {
    src: "/assets/palm-springs-nakheel/images/villa-5br-street-golfcart.png",
    alt: "منظر شارع فيلا 5 غرف نوم في بالم سبرينغز من نخيل",
    caption: "فيلا 5 غرف نوم — منظر الشارع",
    span: "",
    height: "h-[220px] sm:h-[260px]",
  },
];

export default function ArGallery() {
  const [open, setOpen] = useState(null);

  const prev = () => setOpen((i) => (i === 0 ? IMAGES.length - 1 : i - 1));
  const next = () => setOpen((i) => (i === IMAGES.length - 1 ? 0 : i + 1));

  return (
    <section id="gallery" className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 scroll-mt-28">
      <p className="text-[#367BA8] text-xs font-bold tracking-[0.25em] uppercase mb-4">
        معرض العمارة
      </p>
      <h2 className="font-[family-name:var(--font-display)] text-[#102B46] text-3xl sm:text-4xl font-semibold mb-10 max-w-[560px]">
        الصور والتصاميم
      </h2>

      <div className="grid sm:grid-cols-3 gap-4">
        {IMAGES.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setOpen(i)}
            className={`relative rounded-[1.5rem] overflow-hidden group shadow-[0_8px_24px_rgba(16,43,70,0.08)] w-full ${img.height} ${img.span}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={img.span ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
              quality={90}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D30]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="absolute bottom-3 right-4 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {img.caption}
            </p>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-[#0A1D30]/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
            onClick={() => setOpen(null)}
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="إغلاق"
              className="absolute top-5 left-5 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <IoClose className="text-xl" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="السابق"
              className="absolute right-4 sm:right-8 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <IoArrowForward />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="التالي"
              className="absolute left-4 sm:left-8 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <IoArrowBack />
            </button>

            <motion.div
              key={open}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-4xl aspect-[16/10] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={IMAGES[open].src} alt={IMAGES[open].alt} fill sizes="90vw" className="object-contain bg-[#0A1D30]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
