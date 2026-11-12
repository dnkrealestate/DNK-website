"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_TEXT =
  "مرحباً، أنا مهتم بالإطلاق السكني الجديد من ألدار في دبي. يرجى إرسال آخر تفاصيل المشروع والأسعار والمخططات وخطة الدفع.";

export default function ArWhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/+971555769195?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب مع DNK العقارية"
      className="fixed bottom-24 sm:bottom-8 left-5 sm:left-8 z-30 w-14 h-14 rounded-full bg-[#25D366] hover:brightness-110 shadow-xl shadow-black/30 flex items-center justify-center text-white text-2xl transition-all"
    >
      <FaWhatsapp />
    </a>
  );
}
