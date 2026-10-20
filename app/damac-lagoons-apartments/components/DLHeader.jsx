"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMenu, IoClose, IoCallOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

const NAV_ITEMS = [
  { name: "Apartments", id: "units" },
  { name: "Payment Plan", id: "payment-plan" },
  { name: "Amenities", id: "amenities" },
  { name: "Gallery", id: "gallery" },
  { name: "Location", id: "location" },
  { name: "FAQ", id: "faq" },
];

export default function DLHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `#${id}`);
    }
    setMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-[#0D1210] text-white/80 text-[0.7rem] sm:text-xs py-2 px-4">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 truncate mb-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3D8FA6] flex-shrink-0" />
            <span className="truncate mb-0">
              New Damac Launch · Studio &amp; 1-Bedroom Apartments · 4% DLD Fee
              Waived · EOI Open
            </span>
          </p>
          <button
            onClick={() => scrollToSection("enquire-footer")}
            className="hidden sm:flex items-center gap-1 text-white hover:text-[#3D8FA6] font-medium flex-shrink-0"
          >
            Get the Price List First →
          </button>
        </div>
      </div>

      <header className="bg-[#F5F1E8] border-b border-[#E5E0D5]">
        <div className="max-w-[1280px] mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/damac-lagoons-apartments" className="flex items-center gap-2.5">
            <Image
              src="/assets/damac-lagoons/logo-s-mark-black.png"
              alt="Sorrento Lagoon Views"
              width={34}
              height={34}
              className="h-8 w-auto"
              priority
            />
            <span className="leading-tight">
              <span className="block text-[#151A19] font-semibold text-sm tracking-wide">
                SORRENTO
              </span>
              <span className="block text-[#8A8F8B] text-[0.6rem] tracking-[0.2em] uppercase">
                Lagoon Views
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-[#4B5048] hover:text-[#1C6B82] text-sm font-medium transition-colors"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="tel:+971555769195"
              aria-label="Call DNK Real Estate"
              className="hidden sm:flex w-9 h-9 rounded-full border border-[#D8D4CC] items-center justify-center text-[#4B5048] hover:border-[#1C6B82] hover:text-[#1C6B82] transition-colors"
            >
              <IoCallOutline />
            </a>
            <a
              href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Damac%20Lagoons%20-%20Sorrento%20Lagoon%20Views"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp DNK Real Estate"
              className="hidden sm:flex w-9 h-9 rounded-full border border-[#D8D4CC] items-center justify-center text-[#25D366] hover:border-[#25D366] transition-colors"
            >
              <FaWhatsapp />
            </a>
            <button
              onClick={() => scrollToSection("enquire-footer")}
              className="bg-[#1C6B82] hover:bg-[#17596C] text-white font-semibold px-4 sm:px-5 py-2 rounded-full text-sm transition-colors"
            >
              Register Interest
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-[#151A19] text-2xl"
              aria-label="Toggle menu"
            >
              {menuOpen ? <IoClose /> : <IoMenu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-[#F5F1E8] border-t border-[#E5E0D5] px-4 py-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-[#4B5048] py-3 border-b border-[#E5E0D5] text-sm font-medium"
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
