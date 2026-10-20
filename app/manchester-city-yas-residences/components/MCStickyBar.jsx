"use client";

import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function MCStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById("top");
    const onScroll = () => {
      const threshold = heroEl ? heroEl.offsetHeight : window.innerHeight * 0.9;
      setVisible(window.scrollY > threshold - 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 bg-[#050810]/95 backdrop-blur-xl border-t border-white/10 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-6 text-xs">
          <div>
            <p className="text-white/40 uppercase tracking-wider text-[0.6rem]">Project</p>
            <p className="text-white font-semibold">Manchester City Yas Residences</p>
          </div>
          <div>
            <p className="text-white/40 uppercase tracking-wider text-[0.6rem]">Units</p>
            <p className="text-white font-semibold">Villas, Duplexes &amp; Townhouses</p>
          </div>
          <div>
            <p className="text-white/40 uppercase tracking-wider text-[0.6rem]">From</p>
            <p className="text-white font-semibold">AED 3.5M*</p>
          </div>
          <div>
            <p className="text-white/40 uppercase tracking-wider text-[0.6rem]">Down Payment</p>
            <p className="text-white font-semibold">5%</p>
          </div>
        </div>

        <p className="sm:hidden text-white text-xs font-semibold truncate min-w-0 flex-1">
          From AED 3.5M*
        </p>

        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Manchester%20City%20Yas%20Residences%20by%20Ohana"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-auto sm:px-4 rounded-full bg-[#25D366] hover:brightness-110 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all flex-shrink-0"
          >
            <FaWhatsapp />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <a
            href="#enquire-hero"
            className="rounded-full bg-gradient-to-r from-[#6CABDD] to-[#4E8FC4] hover:brightness-110 text-[#07101E] font-bold px-3.5 sm:px-5 py-2.5 text-xs sm:text-sm transition-all whitespace-nowrap flex-shrink-0"
          >
            Register Interest
          </a>
        </div>
      </div>
    </div>
  );
}
