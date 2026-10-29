import React from "react";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const SOCIALS = [
  { icon: FaInstagram, url: "https://www.instagram.com/dnk_re/", label: "Instagram" },
  { icon: FaFacebookF, url: "https://www.facebook.com/dnkrealestate1/", label: "Facebook" },
  { icon: FaLinkedinIn, url: "https://www.linkedin.com/company/dnkrealestate/", label: "LinkedIn" },
  { icon: FaYoutube, url: "https://www.youtube.com/channel/UCKH7d3Sx2dkfb4pEXXaMpFA", label: "YouTube" },
];

const QUICK_LINKS = [
  { name: "Overview", id: "overview" },
  { name: "Residences", id: "residences" },
  { name: "Location", id: "location" },
  { name: "Gallery", id: "gallery" },
  { name: "FAQ", id: "faq" },
];

export default function PSFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#010D30] pt-14 pb-28 sm:pb-8 px-5 sm:px-8">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid md:grid-cols-[1.3fr_1fr_1fr] gap-10 pb-10 border-b border-white/10">
          <div>
            <div className="mb-5">
              
              <div className="flex items-center gap-2.5">
                <p className="font-[family-name:var(--font-display)] text-[#C6A66B] text-2xl sm:text-3xl font-semibold tracking-[0.04em] mb-2">
                Palm Springs
              </p>
                <span className="text-white/40 text-[0.65rem] tracking-[0.2em] uppercase">A Residence by</span>
              </div>
               <Image
                  src="/assets/palm-springs-nakheel/logos/nakheel-logo-ink.webp"
                  alt="Nakheel"
                  width={3840}
                  height={667}
                  className="h-4 w-auto brightness-0 invert opacity-90"
                />
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-[360px] mb-5">
             Discover the upcoming residential development by Nakheel. Register your interest to receive the latest confirmed project details, pricing, floor plans and launch updates as soon as they become available.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C6A66B] flex items-center justify-center text-white/60 hover:text-[#011945] transition-all"
                >
                  <s.icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-white/50 hover:text-[#C6A66B] text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#C6A66B] mt-1 flex-shrink-0" />
                <span className="text-white/50 text-sm">
                  Suite No: 603, Sama Building, Al Barsha 1, Dubai, UAE
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#C6A66B] flex-shrink-0" />
                <a href="tel:+971555769195" className="text-white/50 hover:text-white text-sm transition-colors">
                  +971 55 576 9195
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#C6A66B] flex-shrink-0" />
                <a href="mailto:info@dnkre.com" className="text-white/50 hover:text-white text-sm transition-colors">
                  info@dnkre.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-[#25D366] flex-shrink-0" />
                <a
                  href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Palm%20Springs%20by%20Nakheel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 space-y-3">
          <p className="text-white/35 text-xs leading-relaxed max-w-[900px]">
            This page is provided for early interest registration for Palm Springs by Nakheel. Official project details, including location, pricing and specifications, are subject to confirmation by Nakheel.
          </p>
          <p className="text-white/25 text-xs">© {year} DNK Real Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
