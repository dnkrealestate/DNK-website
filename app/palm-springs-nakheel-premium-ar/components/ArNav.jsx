"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoCallOutline, IoArrowBack, IoMenu, IoClose } from "react-icons/io5";

const LINKS = [
  { name: "نظرة عامة", id: "overview" },
  { name: "الوحدات السكنية", id: "residences" },
  { name: "المخططات", id: "floor-plans" },
  { name: "المرافق", id: "lifestyle" },
  { name: "معرض الصور", id: "gallery" },
  { name: "الموقع", id: "location" },
  { name: "الاستثمار", id: "investment" },
  { name: "خطة الدفع", id: "payment-plan" },
  { name: "الكتيب", id: "brochure" },
];

export default function ArNav({ onOpenEnquiry }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div role="banner" className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <div className="sm:px-6 lg:px-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6 flex justify-center">
          <div className="relative w-full max-w-[1260px] pointer-events-auto">
            <div
              className={`w-full flex items-center justify-between gap-3 rounded-full border border-[#102B46]/10 pr-5 pl-2.5 py-2.5 transition-all duration-500 ${
                scrolled
                  ? "bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(16,43,70,0.12)]"
                  : "bg-white/90 backdrop-blur-xl"
              }`}
            >
              <Image
                src="/assets/palm-springs-nakheel/logos/palm-springs-logo.webp"
                alt="بالم سبرينغز من نخيل"
                width={1317}
                height={324}
                priority
                className="h-7 sm:h-8 w-auto flex-shrink-0"
              />

              <nav className="hidden xl:flex items-center gap-4">
                {LINKS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => goTo(l.id)}
                    className="text-[#252D36]/65 hover:text-[#102B46] text-[0.72rem] font-medium tracking-wide whitespace-nowrap transition-colors"
                  >
                    {l.name}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <a
                  href="tel:+971555769195"
                  aria-label="اتصل بنا"
                  className="hidden sm:flex w-9 h-9 rounded-full border border-[#102B46]/15 items-center justify-center text-[#102B46]/70 hover:border-[#367BA8] hover:text-[#367BA8] transition-colors flex-shrink-0"
                >
                  <IoCallOutline />
                </a>
                <button
                  onClick={() => onOpenEnquiry({ title: "طلب الكتيب", interest: "Brochure", ctaLabel: "الحصول على الكتيب" })}
                  className="hidden md:block text-[#102B46] text-[0.8rem] font-semibold px-4 whitespace-nowrap"
                >
                  طلب الكتيب
                </button>
                <button
                  onClick={() => onOpenEnquiry({ title: "طلب استشارة خاصة", interest: "Private Consultation", ctaLabel: "طلب استشارة خاصة" })}
                  aria-label="طلب استشارة خاصة"
                  className="w-10 h-10 rounded-full bg-[#102B46] text-white flex items-center justify-center hover:bg-[#174A73] transition-colors flex-shrink-0"
                >
                  <IoArrowBack />
                </button>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-label="فتح القائمة"
                  className="xl:hidden w-10 h-10 rounded-full border border-[#102B46]/15 flex items-center justify-center text-[#102B46] flex-shrink-0"
                >
                  {menuOpen ? <IoClose /> : <IoMenu />}
                </button>
              </div>
            </div>

            {menuOpen && (
              <div className="xl:hidden absolute top-[calc(100%+8px)] left-0 right-0 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#102B46]/10 shadow-xl p-4 max-h-[70vh] overflow-y-auto">
                {LINKS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => goTo(l.id)}
                    className="block w-full text-right text-[#252D36]/80 py-3 border-b border-[#102B46]/10 last:border-b-0 text-sm font-medium"
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
