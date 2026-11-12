"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ArIntro() {
  return (
    <section className="bg-[#F7F3EB] py-16 sm:py-24 px-5 sm:px-8 scroll-mt-24" id="overview">
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[940/1015] max-w-[420px] mx-auto rounded-sm overflow-hidden shadow-2xl shadow-black/20 border border-[#101820]/10">
            <Image
              src="/assets/aldar-dubai-launch/images/masterplan-pin.webp"
              alt="تصميم جوي للمخطط الرئيسي لمجتمع ألدار المعلن، مع تحديد موقعه بدبوس ألدار"
              fill
              sizes="(max-width: 1024px) 60vw, 420px"
              className="object-cover"
            />
          </div>
        </motion.div>

        <div>
          <p className="text-[#A9874F] text-xs font-bold tracking-[0.2em] uppercase mb-3">
            نظرة عامة
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-display)] text-[#101820] text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold mb-6 leading-tight"
          >
            مكان تفخر بامتلاكه. وفرصة تستحق الاستكشاف.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#5B5547] leading-relaxed mb-5 max-w-[480px]"
          >
            يطرح إطلاق ألدار الجديد والمُعلن في دبي مجموعة من تاون هاوس
            وفيلات بثلاث غرف نوم، في موقع قريب من شارع العين (E66) وشارع
            الشيخ محمد بن زايد (E311)، وعلى مقربة من واحة دبي للسيليكون
            ومدينة الأكاديميين ووسط مدينة دبي.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[#5B5547] leading-relaxed mb-8 max-w-[480px]"
          >
            يجري حاليًا من قِبل ألدار وضع اللمسات الأخيرة على اسم المشروع
            النهائي وموقعه ومخططاته ومواصفاته &mdash; سجّل الآن وسيقوم
            فريقنا بتسليمك كل التفاصيل المؤكدة أولًا بأول.
          </motion.p>

          <button
            onClick={() => document.getElementById("residences")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 bg-[#101820] hover:bg-[#071321] text-white font-semibold px-7 py-3.5 rounded-sm text-sm transition-colors"
          >
            اكتشف وحدتك السكنية
          </button>
        </div>
      </div>
    </section>
  );
}
