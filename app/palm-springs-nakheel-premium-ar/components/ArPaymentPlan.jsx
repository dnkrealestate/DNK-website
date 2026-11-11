"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoCheckmarkCircleOutline, IoLockClosedOutline } from "react-icons/io5";
import { UNIT_TYPES, PAYMENT_STAGES, DLD_FEE_PERCENT } from "../../palm-springs-nakheel-premium/constants";
import { UNIT_LABELS_AR, ESTIMATED_COMPLETION_AR } from "../arLabels";

const STAGE_LABELS_AR = {
  "Down Payment": "الدفعة الأولى",
  "1st Instalment": "الدفعة 1",
  "2nd Instalment": "الدفعة 2",
  "3rd Instalment": "الدفعة 3",
  "4th Instalment": "الدفعة 4",
  "5th Instalment": "الدفعة 5",
  "6th Instalment": "الدفعة 6",
  Handover: "التسليم",
};

const STAGE_DUE_AR = {
  "On Booking": "عند الحجز",
  "April 2027": "أبريل 2027",
  "September 2027": "سبتمبر 2027",
  "February 2028": "فبراير 2028",
  "July 2028": "يوليو 2028",
  "December 2028": "ديسمبر 2028",
  "May 2029": "مايو 2029",
  "October 2030": "أكتوبر 2030",
};

function formatAed(aed) {
  return aed.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

export default function ArPaymentPlan({ onOpenEnquiry }) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const checkUnlocked = () => {
      try {
        setUnlocked(window.localStorage.getItem("pp_lead_registered") === "true");
      } catch {}
    };
    checkUnlocked();
    window.addEventListener("pp-lead-registered", checkUnlocked);
    return () => window.removeEventListener("pp-lead-registered", checkUnlocked);
  }, []);

  return (
    <section id="payment-plan" className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 scroll-mt-28">
      <div className="rounded-[1.75rem] sm:rounded-[2rem] bg-[#F5F8FB] border border-[#102B46]/8 p-6 sm:p-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div>
            <p className="text-[#367BA8] text-xs font-bold tracking-[0.25em] uppercase mb-4">
              خطة الدفع
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[#102B46] text-3xl sm:text-4xl font-semibold leading-tight max-w-[560px] mb-3">
              60% قبل التسليم، 40% عند التسليم
            </h2>
            <p className="text-[#252D36]/55 leading-relaxed max-w-[560px]">
              جدول الدفعات المؤكد أدناه، مع تسليم تقديري في{" "}
              {ESTIMATED_COMPLETION_AR}. تطبّق رسوم دائرة الأراضي والأملاك بنسبة {DLD_FEE_PERCENT}% من قيمة
              الوحدة، بالإضافة إلى رسوم إدارية أخرى.
            </p>
          </div>
          <button
            onClick={() =>
              onOpenEnquiry({
                eyebrow: "خطة الدفع",
                title: "طلب خطة الدفع",
                interest: "Payment Plan",
                ctaLabel: "طلب خطة الدفع",
              })
            }
            className="bg-[#102B46] hover:bg-[#174A73] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-colors self-start lg:self-auto whitespace-nowrap"
          >
            طلب خطة الدفع
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-8">
          {PAYMENT_STAGES.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`rounded-xl p-3.5 border ${
                s.label === "Handover" ? "bg-[#102B46] border-[#102B46] text-white" : "bg-white border-[#102B46]/8 text-[#102B46]"
              }`}
            >
              <p className={`font-[family-name:var(--font-body)] text-lg font-extrabold mb-1 ${s.label === "Handover" ? "text-[#8DB6D3]" : "text-[#367BA8]"}`}>
                {s.percent}%
              </p>
              <p className="text-xs font-semibold leading-snug">{STAGE_LABELS_AR[s.label] || s.label}</p>
              <p className={`text-[0.65rem] mt-0.5 ${s.label === "Handover" ? "text-white/50" : "text-[#252D36]/45"}`}>{STAGE_DUE_AR[s.due] || s.due}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative rounded-[1.25rem] bg-white border border-[#102B46]/8 overflow-hidden mb-6">
          <div className={`overflow-x-auto ${unlocked ? "" : "blur-sm select-none pointer-events-none"}`}>
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="border-b border-[#102B46]/10">
                  <th className="text-right font-semibold text-[#102B46]/50 text-xs uppercase tracking-wider p-4">الدفعة</th>
                  <th className="text-right font-semibold text-[#102B46]/50 text-xs uppercase tracking-wider p-4">التاريخ</th>
                  {UNIT_TYPES.map((u, i) => (
                    <th key={`${u.label}-${u.sub}`} className="text-left font-semibold text-[#102B46]/50 text-[0.65rem] uppercase tracking-wider p-4 whitespace-nowrap">
                      {UNIT_LABELS_AR[i].label}
                      <span className="block font-normal normal-case text-[#252D36]/35">{UNIT_LABELS_AR[i].sub}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PAYMENT_STAGES.map((s) => (
                  <tr key={s.label} className="border-b border-[#102B46]/8 last:border-b-0">
                    <td className="p-4 font-semibold text-[#102B46] whitespace-nowrap">{STAGE_LABELS_AR[s.label] || s.label}</td>
                    <td className="p-4 text-[#252D36]/55 whitespace-nowrap">{STAGE_DUE_AR[s.due] || s.due}</td>
                    {UNIT_TYPES.map((u) => (
                      <td key={`${u.label}-${u.sub}`} className="p-4 text-left font-[family-name:var(--font-body)] font-bold text-[#102B46] tabular-nums whitespace-nowrap">
                        {unlocked ? formatAed((u.priceAed * s.percent) / 100) : "AED •••,•••"}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-[#F5F8FB]">
                  <td className="p-4 font-bold text-[#102B46]">الإجمالي</td>
                  <td className="p-4 text-[#252D36]/55">100%</td>
                  {UNIT_TYPES.map((u) => (
                    <td key={`${u.label}-${u.sub}`} className="p-4 text-left font-[family-name:var(--font-body)] font-extrabold text-[#102B46] tabular-nums whitespace-nowrap">
                      {unlocked ? formatAed(u.priceAed) : "AED •••,•••"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {!unlocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/30">
              <div className="flex flex-col items-center gap-3 bg-white border border-[#102B46]/10 shadow-[0_20px_50px_rgba(16,43,70,0.12)] rounded-2xl px-7 py-6 text-center max-w-[320px] mx-4">
                <span className="w-11 h-11 rounded-full bg-[#102B46]/5 flex items-center justify-center text-[#102B46] text-lg">
                  <IoLockClosedOutline />
                </span>
                <p className="text-[#102B46] font-semibold text-sm">
                  سجّل لعرض مبالغ الدفعات الدقيقة
                </p>
                <button
                  onClick={() =>
                    onOpenEnquiry({
                      eyebrow: "خطة الدفع",
                      title: "طلب خطة الدفع",
                      interest: "Payment Plan",
                      ctaLabel: "فتح الأسعار",
                    })
                  }
                  className="bg-[#102B46] hover:bg-[#174A73] text-white font-semibold px-5 py-2.5 rounded-full text-xs transition-colors"
                >
                  فتح الأسعار
                </button>
              </div>
            </div>
          )}
        </div>

        <ul className="space-y-2">
          <li className="flex items-start gap-3 text-sm text-[#252D36]/55">
            <IoCheckmarkCircleOutline className="text-[#367BA8] text-lg flex-shrink-0 mt-0.5" />
            جميع المبالغ أعلاه بالدرهم الإماراتي، محسوبة من السعر الابتدائي المعلن لكل نوع وحدة.
          </li>
          <li className="flex items-start gap-3 text-sm text-[#252D36]/55">
            <IoCheckmarkCircleOutline className="text-[#367BA8] text-lg flex-shrink-0 mt-0.5" />
            المسابح والمعالم الطبيعية غير مشمولة وتقع مسؤوليتها على المستخدم النهائي.
          </li>
          <li className="flex items-start gap-3 text-sm text-[#252D36]/55">
            <IoCheckmarkCircleOutline className="text-[#367BA8] text-lg flex-shrink-0 mt-0.5" />
            الأرقام كما هي معلنة وتبقى خاضعة للتأكيد النهائي من نخيل.
          </li>
        </ul>
      </div>
    </section>
  );
}
