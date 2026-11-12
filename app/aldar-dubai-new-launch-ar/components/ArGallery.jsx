"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

const IMAGES = [
  {
    src: "/assets/aldar-dubai-launch/images/aerial-canal-daytime.webp",
    alt: "منظر جوي لمجتمع فيلات على الواجهة المائية مع أفق مدينة دبي في الخلفية",
    caption: "منظر جوي، مجتمع على الواجهة المائية",
  },
  {
    src: "/assets/aldar-dubai-launch/images/villa-exterior-rear.webp",
    alt: "تصميم تخيلي للواجهة الخلفية لفيلا وتاون هاوس",
    caption: "واجهة خارجية للوحدة، تصميم تمثيلي",
  },
  {
    src: "/assets/aldar-dubai-launch/images/interior-lifestyle.webp",
    alt: "تصميم تخيلي لغرفة معيشة داخلية",
    caption: "مساحة معيشة داخلية، تصميم تمثيلي",
  },
  {
    src: "/assets/aldar-dubai-launch/images/masterplan-aerial.webp",
    alt: "تصميم جوي ليلي للمخطط الرئيسي للمجتمع المعلن",
    caption: "المخطط الرئيسي المعلن",
  },
];

export default function ArGallery({ onOpenEnquiry }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? IMAGES.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === IMAGES.length - 1 ? 0 : i + 1));

  return (
    <section className="bg-[#F7F3EB] py-16 sm:py-24 px-5 sm:px-8 scroll-mt-24" id="gallery">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[#A9874F] text-xs font-bold tracking-[0.2em] uppercase mb-3">
              الموقع ونمط الحياة
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[#101820] text-3xl sm:text-4xl font-semibold max-w-[600px]">
              الصور والتصاميم
            </h2>
          </div>
          <p className="font-[family-name:var(--font-display)] text-[#8A8275] text-xl">
            {String(index + 1).padStart(2, "0")} / {String(IMAGES.length).padStart(2, "0")}
          </p>
        </div>

        <div className="relative aspect-[16/9] sm:aspect-[21/9] mb-4 overflow-hidden rounded-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={IMAGES[index].src}
                alt={IMAGES[index].alt}
                fill
                sizes="(max-width: 1320px) 100vw, 1320px"
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 sm:p-7 flex items-end justify-between">
            <p className="text-white font-medium">{IMAGES[index].caption}</p>
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="الصورة السابقة"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
              >
                <IoArrowForward />
              </button>
              <button
                onClick={next}
                aria-label="الصورة التالية"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
              >
                <IoArrowBack />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-10">
          {IMAGES.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setIndex(i)}
              className={`relative flex-shrink-0 w-24 sm:w-28 aspect-[4/3] overflow-hidden rounded-sm transition-opacity ${
                i === index ? "opacity-100 ring-2 ring-[#C6A46A]" : "opacity-40 hover:opacity-70"
              }`}
            >
              <Image src={img.src} alt="" fill sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-white border border-[#E5DECB] rounded-sm p-6 sm:p-7">
          <p className="text-[#5B5547] text-sm leading-relaxed max-w-[520px]">
            لمحة عن نمط الحياة المتاح. سجّل الآن لتكون أول من يحصل على
            المعرض الكامل والتصاميم الرسمية فور إصدارها من ألدار.
          </p>
          <button
            onClick={() =>
              onOpenEnquiry({
                eyebrow: "معرض الصور",
                title: "طلب المعرض الكامل",
                subtitle: "سنرسل لك المعرض الرسمي والتصاميم فور إصدارها من ألدار.",
                ctaLabel: "أعلمني عند التوفر",
              })
            }
            className="bg-gradient-to-r from-[#C6A46A] to-[#A9874F] hover:brightness-110 text-[#071321] font-bold px-6 py-3 rounded-sm text-sm whitespace-nowrap transition-all"
          >
            أعلمني عند التوفر
          </button>
        </div>
      </div>
    </section>
  );
}
