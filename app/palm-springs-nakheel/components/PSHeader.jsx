"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMenu, IoClose, IoCallOutline } from "react-icons/io5";

const NAV_ITEMS = [
  { name: "Overview", id: "overview" },
  { name: "Residences", id: "residences" },
  { name: "Lifestyle", id: "lifestyle" },
  { name: "Location", id: "location" },
  { name: "Gallery", id: "gallery" },
];

export default function PSHeader({ onOpenEnquiry }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    if (typeof window !== "undefined") window.history.pushState(null, "", `#${id}`);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 border-b ${
        scrolled || menuOpen
          ? "bg-[#010D30]/97 backdrop-blur-xl border-white/10 py-3 shadow-lg shadow-black/20"
          : "bg-[#010D30]/70 backdrop-blur-md border-[#C6A66B]/20 py-5"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 flex items-center justify-between">
        <Link href="/palm-springs-nakheel" className="flex items-center">
          <Image
            src="/assets/palm-springs-nakheel/logos/nakheel-logo-ink.webp"
            alt="Nakheel"
            width={3840}
            height={667}
            priority
            className="h-6 sm:h-7 w-auto brightness-0 invert"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-white/70 hover:text-[#C6A66B] text-sm font-medium transition-colors"
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+971555769195"
            aria-label="Call DNK Real Estate"
            className="hidden sm:flex w-10 h-10 rounded-full border border-white/20 items-center justify-center text-white/80 hover:border-[#C6A66B] hover:text-[#C6A66B] transition-colors"
          >
            <IoCallOutline />
          </a>
          <button
            onClick={() =>
              onOpenEnquiry({
                title: "Request a Private Presentation",
                interest: "Private Consultation",
                ctaLabel: "Request a Private Presentation",
              })
            }
            className="hidden sm:block bg-gradient-to-r from-[#C6A66B] to-[#A9874F] hover:brightness-110 text-[#011945] font-bold px-5 py-2.5 rounded-sm text-sm transition-all"
          >
            Request a Private Presentation
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden text-white text-2xl"
          >
            {menuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#011945] border-t border-white/10 px-5 py-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left text-white/70 py-3 border-b border-white/10 text-sm font-medium"
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              onOpenEnquiry({
                title: "Request a Private Presentation",
                interest: "Private Consultation",
                ctaLabel: "Request a Private Presentation",
              });
            }}
            className="w-full mt-4 bg-gradient-to-r from-[#C6A66B] to-[#A9874F] text-[#011945] font-bold px-5 py-3 rounded-sm text-sm"
          >
            Request a Private Presentation
          </button>
        </div>
      )}
    </header>
  );
}
