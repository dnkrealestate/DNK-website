"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { IoMenu, IoClose, IoCallOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

const NAV_ITEMS = [
  { name: "Villas", id: "villas" },
  { name: "Amenities", id: "amenities" },
  { name: "Gallery", id: "gallery" },
  { name: "Location", id: "location" },
  { name: "Details", id: "details" },
];

export default function YRHeader({ onOpenDrawer }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      if (typeof window !== "undefined") window.history.pushState(null, "", `#${id}`);
    }, menuOpen ? 350 : 0);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-[#15130F]/90 backdrop-blur-xl border-b border-white/10 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 flex items-center justify-between">
          <Link href="/yas-riva-reserve" className="flex items-center gap-2.5">
            <Image
              src="/assets/yas-riva-reserve/logos/logo-yas-riva-reserve-light.webp"
              alt="Yas Riva Reserve by Aldar"
              width={657}
              height={180}
              className="h-6 sm:h-7 w-auto"
              priority
            />
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="tel:+971555769195"
              aria-label="Call DNK Real Estate"
              className="hidden sm:flex w-10 h-10 rounded-full border border-white/20 items-center justify-center text-white/80 hover:border-[#B08D57] hover:text-[#D9C098] transition-colors"
            >
              <IoCallOutline />
            </a>
            <button
              onClick={onOpenDrawer}
              className="hidden sm:block border border-white/30 hover:border-[#B08D57] hover:bg-[#B08D57]/10 text-white font-medium px-5 py-2.5 rounded-none text-sm tracking-wide transition-all"
            >
              Register Interest
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex items-center gap-2 text-white text-sm font-medium"
            >
              <span className="hidden sm:inline tracking-widest uppercase text-xs">
                {menuOpen ? "Close" : "Menu"}
              </span>
              {menuOpen ? <IoClose className="text-2xl" /> : <IoMenu className="text-2xl" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-30 bg-[#0E0C09]"
          >
            <div className="h-full flex flex-col justify-center px-8 sm:px-16">
              <nav className="flex flex-col gap-2">
                {NAV_ITEMS.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                    onClick={() => scrollToSection(item.id)}
                    className="font-[family-name:var(--font-display)] text-left text-white/80 hover:text-[#D9C098] text-4xl sm:text-6xl font-medium py-2 transition-colors"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-wrap items-center gap-4 mt-12"
              >
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenDrawer();
                  }}
                  className="bg-gradient-to-r from-[#B08D57] to-[#96713F] text-white font-semibold px-7 py-3.5 text-sm tracking-wide"
                >
                  Register Interest
                </button>
                <a
                  href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Yas%20Riva%20Reserve%20by%20Aldar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white text-sm"
                >
                  <FaWhatsapp className="text-[#25D366]" /> WhatsApp an advisor
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
