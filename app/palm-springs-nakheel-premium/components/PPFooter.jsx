import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaLinkedin } from "react-icons/fa";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import { WHATSAPP_NUMBER, WHATSAPP_TEXT } from "../constants";

const LINKS = [
  { name: "Overview", id: "overview" },
  { name: "Residences", id: "residences" },
  { name: "Lifestyle", id: "lifestyle" },
  { name: "Gallery", id: "gallery" },
  { name: "Location", id: "location" },
  { name: "Investment", id: "investment" },
];

export default function PPFooter() {
  return (
    <footer className="bg-[#102B46] text-white px-4 sm:px-6 lg:px-10 py-14 sm:py-16">
      <div className="grid sm:grid-cols-3 gap-10 mb-12">
        <div>
          <Image
            src="/assets/palm-springs-nakheel/logos/nakheel-logo-ink.webp"
            alt="Nakheel"
            width={3840}
            height={667}
            className="h-6 w-auto brightness-0 invert mb-4"
          />
          <p className="text-white/45 text-sm leading-relaxed max-w-[280px]">
            A private waterfront presentation marketed by DNK Real Estate.
          </p>
        </div>

        <div>
          <p className="text-white/40 text-xs font-semibold tracking-[0.15em] uppercase mb-4">Quick Links</p>
          <ul className="space-y-2.5">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-white/65 hover:text-[#8DB6D3] text-sm transition-colors">
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white/40 text-xs font-semibold tracking-[0.15em] uppercase mb-4">Contact Us</p>
          <ul className="space-y-3">
            <li>
              <a href="tel:+971555769195" className="flex items-center gap-2 text-white/65 hover:text-[#8DB6D3] text-sm transition-colors">
                <IoCallOutline /> +971 55 576 9195
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/65 hover:text-[#8DB6D3] text-sm transition-colors"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </li>
            <li>
              <a href="mailto:info@dnkre.com" className="flex items-center gap-2 text-white/65 hover:text-[#8DB6D3] text-sm transition-colors">
                <IoMailOutline /> info@dnkre.com
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-3 mt-5">
            <a href="https://www.instagram.com/dnk_re/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/50 hover:text-[#8DB6D3] transition-colors">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/dnkrealestate1/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/50 hover:text-[#8DB6D3] transition-colors">
              <FaFacebookF />
            </a>
            <a href="https://www.linkedin.com/company/dnkrealestate/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/50 hover:text-[#8DB6D3] transition-colors">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10">
        <p className="text-white/35 text-xs leading-relaxed max-w-[760px]">
          This is an independent marketing presentation produced by DNK Real
          Estate to promote Palm Springs by Nakheel, an advertised Dubai
          residential launch. It is not Nakheel&apos;s official website.
          Prices shown in USD are an approximate conversion from the
          advertised AED figures and are provided for reference only.
          Project details, pricing, availability and specifications are
          subject to confirmation by Nakheel or an authorized representative.
        </p>
        <p className="text-white/25 text-xs mt-4">
          &copy; {new Date().getFullYear()} DNK Real Estate. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
