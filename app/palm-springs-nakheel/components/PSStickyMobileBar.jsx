"use client";

import React, { useEffect, useState } from "react";
import { IoDocumentTextOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function PSStickyMobileBar({ onOpenEnquiry }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const contactEl = document.getElementById("contact");
    if (!contactEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(contactEl);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`sm:hidden fixed bottom-0 inset-x-0 z-30 bg-[#011945]/95 backdrop-blur-xl border-t border-white/10 transition-transform duration-300 ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="grid grid-cols-2 gap-px bg-white/10">
        <button
          onClick={() =>
            onOpenEnquiry({
              title: "Request Information",
              ctaLabel: "Request Information",
            })
          }
          className="bg-[#011945] text-white font-semibold py-4 text-sm flex items-center justify-center gap-2"
        >
          <IoChatbubbleEllipsesOutline /> Enquire
        </button>
        <button
          onClick={() =>
            onOpenEnquiry({
              title: "Request the Brochure",
              interest: "Brochure",
              ctaLabel: "Get the Brochure",
            })
          }
          className="bg-gradient-to-r from-[#C6A66B] to-[#A9874F] text-[#011945] font-bold py-4 text-sm flex items-center justify-center gap-2"
        >
          <IoDocumentTextOutline /> Brochure
        </button>
      </div>
    </div>
  );
}
