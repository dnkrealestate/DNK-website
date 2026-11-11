"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoLockClosedOutline, IoDownloadOutline } from "react-icons/io5";

export default function ArBrochure({ onOpenEnquiry }) {
  return (
    <section id="brochure" className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 scroll-mt-28">
      <div className="rounded-[1.75rem] sm:rounded-[2rem] bg-[#102B46] overflow-hidden grid lg:grid-cols-2 items-stretch">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          className="relative min-h-[280px] lg:min-h-full"
        >
          <Image
            src="/assets/palm-springs-nakheel/images/brochure-sample.png"
            alt="نموذج معاينة للكتيب يُظهر أسلوب العرض لبالم سبرينغز من نخيل"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102B46]/60 via-transparent to-transparent" />
          <span className="absolute top-4 right-4 bg-[#102B46]/85 text-white text-[0.6rem] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <IoLockClosedOutline /> نموذج تقريبي
          </span>
        </motion.div>

        <div className="p-8 sm:p-14 flex flex-col justify-center text-white">
          <p className="text-[#8DB6D3] text-xs font-bold tracking-[0.25em] uppercase mb-4">
            تحميل الكتيب
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold leading-tight mb-5 max-w-[440px]">
            خطوتك الأولى نحو شيء استثنائي
          </h2>
          <p className="text-white/60 leading-relaxed mb-8 max-w-[440px]">
            النموذج المعروض هنا يعكس مستوى التفاصيل واللمسات النهائية
            وأسلوب عرض نمط الحياة الذي يمكنك توقعه. اطلب الكتيب وسنرسل لك
            نسخة بالم سبرينغز المؤكدة فور إصدارها من نخيل.
          </p>
          <button
            onClick={() =>
              onOpenEnquiry({
                eyebrow: "طلب الكتيب",
                title: "تحميل الكتيب",
                subtitle: "سنرسل لك كتيب بالم سبرينغز المؤكد مباشرة فور توفره.",
                interest: "Brochure",
                ctaLabel: "الحصول على الكتيب",
              })
            }
            className="inline-flex items-center gap-2 bg-[#8DB6D3] hover:brightness-110 text-[#102B46] font-bold px-7 py-3.5 rounded-full text-sm transition-all self-start"
          >
            تحميل الكتيب <IoDownloadOutline />
          </button>
        </div>
      </div>
    </section>
  );
}
