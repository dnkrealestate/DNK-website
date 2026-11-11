"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_NUMBER } from "../../palm-springs-nakheel-premium/constants";
import { WHATSAPP_TEXT_AR } from "../arLabels";

export default function ArWhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent(WHATSAPP_TEXT_AR)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
      className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(37,39,34,0.3)] hover:scale-105 transition-transform"
    >
      <FaWhatsapp className="text-2xl" />
    </a>
  );
}
