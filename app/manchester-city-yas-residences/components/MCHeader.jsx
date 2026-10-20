"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMenu, IoClose, IoCallOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

const NAV_ITEMS = [
  { name: "Residences", id: "residences" },
  { name: "Payment Plan", id: "payment-plan" },
  { name: "Amenities", id: "amenities" },
  { name: "Gallery", id: "gallery" },
  { name: "Location", id: "location" },
  { name: "FAQ", id: "faq" },
];

export default function MCHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `#${id}`);
    }
    setMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50">
      <header
        className={`transition-colors duration-300 border-b ${
          scrolled
            ? "bg-[#070C16]/95 backdrop-blur-xl border-white/10"
            : "bg-[#070C16] border-white/5"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/manchester-city-yas-residences" className="flex items-center gap-2.5">
            <Image
              src="/assets/manchester-city-yas/logos/logo-yas-by-ohana-white.svg"
              alt="Manchester City Yas Residences by Ohana"
              width={472}
              height={127}
              className="h-7 sm:h-8 w-auto"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white/70 hover:text-[#6CABDD] text-sm font-medium transition-colors"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="tel:+971555769195"
              aria-label="Call DNK Real Estate"
              className="hidden sm:flex w-9 h-9 rounded-full border border-white/15 items-center justify-center text-white/70 hover:border-[#6CABDD] hover:text-[#6CABDD] transition-colors"
            >
              <IoCallOutline />
            </a>
            <a
              href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Manchester%20City%20Yas%20Residences%20by%20Ohana"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp DNK Real Estate"
              className="hidden sm:flex w-9 h-9 rounded-full border border-white/15 items-center justify-center text-[#25D366] hover:border-[#25D366] transition-colors"
            >
              <FaWhatsapp />
            </a>
            <button
              onClick={() => scrollToSection("enquire-footer")}
              className="bg-gradient-to-r from-[#6CABDD] to-[#4E8FC4] hover:brightness-110 text-[#07101E] font-bold px-4 sm:px-5 py-2 rounded-full text-sm transition-all"
            >
              Register Interest
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-white text-2xl"
              aria-label="Toggle menu"
            >
              {menuOpen ? <IoClose /> : <IoMenu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-[#070C16] border-t border-white/10 px-4 py-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-white/70 py-3 border-b border-white/10 text-sm font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}
