"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import PJPopupModel from "./PJPopupModel";

const NAV_LINKS = [
  { label: "Villas", id: "villas" },
  { label: "Lifestyle", id: "lifestyle" },
  { label: "Amenities", id: "masterplan" },
  { label: "EOI Process", id: "eoi" },
  { label: "Location", id: "location" },
  { label: "Developer", id: "developer" },
  { label: "Contact", id: "contact" },
];

export default function PJHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <div
        role="banner"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0C0E]/95 backdrop-blur-md shadow-lg  border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/palmjebelali/beach-villas" className="flex-shrink-0">
            <div className="relative h-9 w-[130px]">
              <Image
                src="/assets/other/palmjebelali-titile01.webp"
                alt="Palm Jebel Ali"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm px-3 py-2 rounded-lg transition-all duration-150 tracking-wide text-white/75 hover:text-[#C4A57F] hover:bg-white/10"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <a
              href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Palm%20Jebel%20Ali%20Beach%20Villas"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#25D366] text-sm font-medium hover:opacity-80 transition-opacity"
            >
              <FaWhatsapp className="text-lg" />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>
            <button
              onClick={() => setShowPopup(true)}
              className="bg-gradient-to-r from-[#79644A] to-[#9C8564] text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-200 hover:brightness-110"
            >
              Register Interest
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden text-2xl p-1 flex-shrink-0 text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`md:hidden overflow-y-auto transition-all duration-300 ${
            mobileOpen
              ? "max-h-[calc(100vh-64px)] opacity-100 border-t border-white/10"
              : "max-h-0 opacity-0 overflow-hidden"
          } bg-[#0A0C0E]/98 backdrop-blur-md`}
        >
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="w-full text-left text-white/70 hover:text-[#C4A57F] text-sm px-3 py-3 rounded-lg hover:bg-white/5 transition-all border-b border-white/5 last:border-0"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 flex gap-3">
              <a
                href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Palm%20Jebel%20Ali%20Beach%20Villas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 border border-[#25D366]/30 text-[#25D366] text-sm font-medium py-2.5 rounded-xl"
              >
                <FaWhatsapp /> WhatsApp
              </a>
              <button
                onClick={() => {
                  setShowPopup(true);
                  setMobileOpen(false);
                }}
                className="flex-1 bg-gradient-to-r from-[#79644A] to-[#9C8564] text-white text-sm font-semibold py-2.5 rounded-xl"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPopup && <PJPopupModel onClose={() => setShowPopup(false)} />}
    </>
  );
}
