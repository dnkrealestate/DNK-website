"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMenu, IoClose, IoCallOutline } from "react-icons/io5";

const NAV_ITEMS = [
  { name: "Overview", id: "overview" },
  { name: "Residences", id: "residences" },
  { name: "Payment Plan", id: "payment-plan" },
  { name: "Location", id: "location" },
  { name: "Gallery", id: "gallery" },
  { name: "Contact", id: "contact" },
];

export default function AHeader({ onOpenEnquiry }) {
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
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled || menuOpen
          ? "bg-[#071321]/95 backdrop-blur-xl border-b border-white/10 py-3"
          : "bg-gradient-to-b from-[#071321]/80 to-transparent py-5"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 flex items-center justify-between">
        <Link href="/aldar-dubai-new-launch" className="flex items-center gap-3">
          <Image
            src="/assets/aldar-dubai-launch/logos/logo-aldar-ink.svg"
            alt="Aldar"
            width={461}
            height={461}
            className="h-8 w-auto brightness-0 invert"
          />
          <span className="flex flex-col leading-none border-l border-white/20 pl-3">
            <span className="font-[family-name:var(--font-display)] text-white text-base font-semibold tracking-wide">
              ALDAR
            </span>
            <span className="text-[#B7B0A5] text-[0.6rem] tracking-[0.25em] uppercase">
              New Launch &middot; Dubai
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-white/70 hover:text-[#C6A46A] text-sm font-medium transition-colors"
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+971555769195"
            aria-label="Call DNK Real Estate"
            className="hidden sm:flex w-10 h-10 rounded-full border border-white/20 items-center justify-center text-white/80 hover:border-[#C6A46A] hover:text-[#C6A46A] transition-colors"
          >
            <IoCallOutline />
          </a>
          <button
            onClick={() =>
              onOpenEnquiry({
                title: "Request the Brochure",
                document: "Brochure",
                ctaLabel: "Get the Brochure",
              })
            }
            className="hidden sm:block bg-gradient-to-r from-[#C6A46A] to-[#A9874F] hover:brightness-110 text-[#071321] font-bold px-5 py-2.5 rounded-sm text-sm transition-all"
          >
            Request Brochure
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
        <div className="lg:hidden bg-[#071321] border-t border-white/10 px-5 py-4">
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
              onOpenEnquiry({ title: "Request the Brochure", document: "Brochure", ctaLabel: "Get the Brochure" });
            }}
            className="w-full mt-4 bg-gradient-to-r from-[#C6A46A] to-[#A9874F] text-[#071321] font-bold px-5 py-3 rounded-sm text-sm"
          >
            Request Brochure
          </button>
        </div>
      )}
    </header>
  );
}
