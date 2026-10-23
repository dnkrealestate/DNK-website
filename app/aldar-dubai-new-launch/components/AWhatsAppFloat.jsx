"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_TEXT =
  "Hello, I am interested in the new Aldar residential launch in Dubai. Please share the latest project details, pricing, floor plans and payment plan.";

export default function AWhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/+971555769195?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp DNK Real Estate"
      className="fixed bottom-24 sm:bottom-8 right-5 sm:right-8 z-30 w-14 h-14 rounded-full bg-[#25D366] hover:brightness-110 shadow-xl shadow-black/30 flex items-center justify-center text-white text-2xl transition-all"
    >
      <FaWhatsapp />
    </a>
  );
}
