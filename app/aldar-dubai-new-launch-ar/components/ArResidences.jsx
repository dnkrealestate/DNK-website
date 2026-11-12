"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const RESIDENCES = [
  {
    type: "تاون هاوس",
    typeEn: "Townhouse",
    image: "/assets/aldar-dubai-launch/images/townhouse-exterior-row.webp",
    imageCaption: "صورة خارجية تمثيلية",
    price: "AED 2.875M",
    bedrooms: "3",
  },
  {
    type: "فيلا",
    typeEn: "Villa",
    image: "/assets/aldar-dubai-launch/images/villa-exterior-rear.webp",
    imageCaption: "صورة خارجية تمثيلية",
    price: "AED 3.95M",
    bedrooms: "3",
  },
];

export default function ArResidences({ onOpenEnquiry }) {
  return (
    <section className="bg-[#101820] py-16 sm:py-24 px-5 sm:px-8 scroll-mt-24" id="residences">
      <div className="max-w-[1320px] mx-auto">
        <p className="text-[#C6A46A] text-xs font-bold tracking-[0.2em] uppercase mb-3">
          الوحدات السكنية
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-white text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 max-w-[640px]">
          مجموعة الوحدات السكنية
        </h2>
        <p className="text-white/50 max-w-[600px] mb-12 leading-relaxed">
          طرازان سكنيان استثنائيان، صُمما لأسلوب الحياة العصري في دبي.
          سجّل اليوم لتكون أول من يحصل على المواصفات الكاملة والمخططات
          والأسعار فور إصدارها من ألدار.
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
                  alt={`${res.imageCaption} لـ ${res.type} ألدار المعلنة`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-transparent to-transparent" />
                <p className="absolute bottom-3 right-4 text-white/60 text-[0.65rem] uppercase tracking-wider">
                  {res.imageCaption}
                </p>
              </div>

              <div className="p-8 sm:p-10">
                <p className="text-white/50 text-xs uppercase tracking-[0.2em] mb-2">
                  {res.bedrooms} غرف نوم
                </p>
                <h3 className="font-[family-name:var(--font-display)] text-white text-3xl sm:text-4xl font-semibold mb-6">
                  {res.type}
                </h3>

                <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-white/10">
                  <span className="text-white/40 text-xs uppercase tracking-wider">
                    يبدأ من
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-[#C6A46A] text-2xl sm:text-3xl font-semibold">
                    {res.price}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() =>
                      onOpenEnquiry({
                        eyebrow: `استفسار ${res.type}`,
                        title: `طلب مخططات ${res.type}`,
                        subtitle: `سنرسل لك نموذج المخطط وأحدث التصاميم المتاحة لـ ${res.type} بـ ${res.bedrooms} غرف نوم.`,
                        document: "Floor Plans",
                        property: res.typeEn,
                        ctaLabel: `طلب مخططات ${res.type}`,
                      })
                    }
                    className="flex-1 bg-gradient-to-r from-[#C6A46A] to-[#A9874F] hover:brightness-110 text-[#071321] font-bold px-5 py-3 rounded-sm text-sm text-center transition-all"
                  >
                    طلب المخططات
                  </button>
                  <button
                    onClick={() =>
                      onOpenEnquiry({
                        eyebrow: `استفسار ${res.type}`,
                        title: `استفسر عن ${res.type}`,
                        property: res.typeEn,
                        ctaLabel: "استفسر عن التوافر",
                      })
                    }
                    className="flex-1 border border-white/25 hover:border-[#C6A46A] text-white font-semibold px-5 py-3 rounded-sm text-sm text-center transition-colors"
                  >
                    استفسر عن التوافر
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
