"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoBookOutline, IoDocumentsOutline, IoMapOutline, IoLockClosedOutline } from "react-icons/io5";

const DOCUMENTS = [
  {
    icon: IoBookOutline,
    title: "كتيب المشروع",
    text: "كل ما تحتاج معرفته عن هذا الإطلاق الجديد الاستثنائي.",
    image: "/assets/aldar-dubai-launch/images/interior-lifestyle.webp",
    document: "Brochure",
    cta: "الحصول على الكتيب",
  },
  {
    icon: IoDocumentsOutline,
    title: "المخططات",
    text: "شاهد نموذج التصميم أدناه، ثم اطلب المجموعة الكاملة من مخططات التاون هاوس والفيلات.",
    image: "/assets/aldar-dubai-launch/images/floor-plan-sample.webp",
    document: "Floor Plans",
    cta: "طلب المخططات",
  },
  {
    icon: IoMapOutline,
    title: "المخطط الرئيسي",
    text: "استكشف تصميم المجتمع واكتشف موقع قطعتك المثالية.",
    image: "/assets/aldar-dubai-launch/images/masterplan-aerial.webp",
    document: "Master Plan",
    cta: "طلب المخطط الرئيسي",
  },
];

export default function ArDocuments({ onOpenEnquiry }) {
  return (
    <section className="bg-[#F7F3EB] py-16 sm:py-24 px-5 sm:px-8 scroll-mt-24" id="documents">
      <div className="max-w-[1320px] mx-auto">
        <p className="text-[#A9874F] text-xs font-bold tracking-[0.2em] uppercase mb-3">
          الكتيب والمخططات
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-[#101820] text-3xl sm:text-4xl font-semibold mb-4 max-w-[600px]">
          اطلب أحدث مستندات المشروع
        </h2>
        <p className="text-[#5B5547] max-w-[600px] mb-12 leading-relaxed">
          كل ما تحتاجه لاتخاذ قرار واثق &mdash; اطلب الكتيب أو المخططات
          أو المخطط الرئيسي أدناه واحصل عليه مباشرة من أحد مستشاري DNK
          العقارية.
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          {DOCUMENTS.map((doc, i) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white border border-[#E5DECB] rounded-sm overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-[#101820]">
                <Image
                  src={doc.image}
                  alt={`معاينة: ${doc.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/70 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-[#101820]/80 text-white/90 text-[0.6rem] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm flex items-center gap-1.5">
                  <IoLockClosedOutline /> معاينة
                </span>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <doc.icon className="text-[#A9874F] text-3xl mb-5" />
                <h3 className="font-[family-name:var(--font-display)] text-[#101820] text-xl font-semibold mb-2">
                  {doc.title}
                </h3>
                <p className="text-[#5B5547] text-sm leading-relaxed mb-5 flex-1">{doc.text}</p>
                <button
                  onClick={() =>
                    onOpenEnquiry({
                      eyebrow: "طلب مستند",
                      title: doc.cta,
                      subtitle: `سنرسل لك ${doc.title} كاملاً مباشرة.`,
                      document: doc.document,
                      ctaLabel: doc.cta,
                    })
                  }
                  className="bg-[#101820] hover:bg-[#071321] text-white font-semibold px-5 py-3 rounded-sm text-sm transition-colors"
                >
                  {doc.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
