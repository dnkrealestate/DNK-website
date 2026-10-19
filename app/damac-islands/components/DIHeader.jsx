"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMenu, IoClose } from "react-icons/io5";

const NAV_ITEMS = [
  { name: "About", id: "top" },
  { name: "Amenities", id: "amenities" },
  { name: "Gallery", id: "gallery" },
  { name: "Location", id: "location" },
  { name: "FAQ", id: "faq" },
];

export default function DIHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        solid ? "bg-white shadow-sm border-b border-[#EBE8E2]" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/damac-islands" className="flex items-center gap-3">
          <Image
            src="/assets/logo/dnklogo_1.webp"
            alt="DNK Real Estate"
            width={110}
            height={40}
            className={`h-9 w-auto transition-all ${solid ? "brightness-0" : ""}`}
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-medium transition-colors ${
                solid ? "text-[#4B5048] hover:text-[#B68A2E]" : "text-white/85 hover:text-white"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection("enquire-footer")}
            className="hidden sm:inline-flex bg-gradient-to-r from-[#B68A2E] to-[#D4AF6A] text-white font-semibold px-5 py-2 rounded-xl text-sm hover:brightness-110 transition-all shadow-sm"
          >
            Enquire Now
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden text-2xl ${solid ? "text-[#151A19]" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-[#EBE8E2] px-4 py-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left text-[#4B5048] py-3 border-b border-[#EBE8E2] text-sm font-medium"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
