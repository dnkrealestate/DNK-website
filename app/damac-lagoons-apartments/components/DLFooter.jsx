import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const QUICK_LINKS = [
  { name: "About", id: "about" },
  { name: "Unit Types", id: "units" },
  { name: "Amenities", id: "amenities" },
  { name: "Gallery", id: "gallery" },
  { name: "Location", id: "location" },
  { name: "FAQ", id: "faq" },
];

const SOCIALS = [
  { icon: FaInstagram, url: "https://www.instagram.com/dnk_re/", label: "Instagram" },
  { icon: FaFacebookF, url: "https://www.facebook.com/dnkrealestate1/", label: "Facebook" },
  { icon: FaLinkedinIn, url: "https://www.linkedin.com/company/dnkrealestate/", label: "LinkedIn" },
  { icon: FaYoutube, url: "https://www.youtube.com/channel/UCKH7d3Sx2dkfb4pEXXaMpFA", label: "YouTube" },
];

export default function DLFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1210] pt-16 pb-8 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-[1.2fr_1fr_1fr] gap-10 pb-10 border-b border-white/10">
          <div>
            <Image
              src="/assets/logo/dnklogo_1.webp"
              alt="DNK Real Estate"
              width={120}
              height={44}
              className="h-10 w-auto mb-5"
            />
            <p className="text-white/50 text-sm leading-relaxed max-w-[320px] mb-5">
              DNK Real Estate is your trusted partner for Sorrento Lagoon
              Views at Damac Lagoons — guiding you from enquiry to handover
              with transparent, expert advice.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#B68A2E] flex items-center justify-center text-white/60 hover:text-white transition-all"
                >
                  <s.icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-white/50 hover:text-[#B68A2E] text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#B68A2E] mt-1 flex-shrink-0" />
                <span className="text-white/50 text-sm">
                  Suite No: 603, Sama Building, Al Barsha 1, Dubai, UAE
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#B68A2E] flex-shrink-0" />
                <a href="tel:+971555769195" className="text-white/50 hover:text-white text-sm transition-colors">
                  +971 55 576 9195
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#B68A2E] flex-shrink-0" />
                <a href="mailto:info@dnkre.com" className="text-white/50 hover:text-white text-sm transition-colors">
                  info@dnkre.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-[#25D366] flex-shrink-0" />
                <a
                  href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Damac%20Lagoons%20-%20Sorrento%20Lagoon%20Views"
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

        <div className="pt-6 flex items-center justify-center">
          <p className="text-white/30 text-xs text-center">
            © {year} DNK Real Estate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
