"use client";

import React, { useEffect, useState } from "react";
import { IoDocumentTextOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function ArStickyMobileBar({ onOpenEnquiry }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Hide the bar while the embedded lead form (#contact) is on screen, so
    // it never overlaps the form's own submit button or fields.
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
      className={`sm:hidden fixed bottom-0 inset-x-0 z-30 bg-[#071321]/95 backdrop-blur-xl border-t border-white/10 transition-transform duration-300 ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="grid grid-cols-2 gap-px bg-white/10">
        <button
          onClick={() =>
            onOpenEnquiry({
              title: "طلب معلومات",
              ctaLabel: "طلب معلومات",
            })
          }
          className="bg-[#071321] text-white font-semibold py-4 text-sm flex items-center justify-center gap-2"
        >
          <IoChatbubbleEllipsesOutline /> استفسار
        </button>
        <button
          onClick={() =>
            onOpenEnquiry({
              title: "طلب الكتيب",
              document: "Brochure",
              ctaLabel: "الحصول على الكتيب",
            })
          }
          className="bg-gradient-to-r from-[#C6A46A] to-[#A9874F] text-[#071321] font-bold py-4 text-sm flex items-center justify-center gap-2"
        >
          <IoDocumentTextOutline /> الكتيب
        </button>
      </div>
    </div>
  );
}
