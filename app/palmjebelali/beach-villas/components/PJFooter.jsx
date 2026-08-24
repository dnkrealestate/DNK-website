import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { gtag_report_conversion } from "./gtagReportConversion";

const SOCIALS = [
  { Icon: FaInstagram, href: "https://www.instagram.com/dnk_re/", label: "Instagram" },
  { Icon: FaFacebook, href: "https://www.facebook.com/dnkrealestate1/", label: "Facebook" },
  { Icon: FaLinkedin, href: "https://www.linkedin.com/company/dnkrealestate/", label: "LinkedIn" },
  { Icon: FaYoutube, href: "https://www.youtube.com/channel/UCKH7d3Sx2dkfb4pEXXaMpFA", label: "YouTube" },
];

const NAV_IDS = ["villas", "lifestyle", "eoi", "location", "contact"];
const NAV_LABELS = ["Villas", "Lifestyle", "EOI Process", "Location", "Contact"];

export default function PJFooter() {
  return (
    <footer className="bg-[#050708] border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <div className="relative h-9 w-[230px] mb-4">
              <Image
                src="/assets/other/palmjebelali-titile01.webp"
                alt="Palm Jebel Ali"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-white/45 text-sm leading-relaxed mb-5">
              Marketed by DNK Real Estate — your trusted partner for
              ultra-luxury off-plan properties in Dubai.
            </p>
            {/* <div className="flex gap-3 flex-wrap">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#C4A57F] hover:border-[#79644A]/30 transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div> */}
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Quick Links
            </p>
            <ul className="space-y-2">
              {NAV_LABELS.map((label, i) => (
                <li key={label}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById(NAV_IDS[i])
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-white/45 hover:text-[#C4A57F] text-sm transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/"
                  className="text-white/45 hover:text-[#C4A57F] text-sm transition-colors"
                >
                  Main Website
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Contact Us
            </p>
            <ul className="space-y-3">
              {/* <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#C4A57F] mt-0.5 flex-shrink-0 text-sm" />
                <span className="text-white/45 text-sm leading-snug">
                  Suite No: 603, Sama Building, Al Barsha 1, Dubai, UAE
                </span>
              </li> */}
              <li className="flex items-center gap-3">
                <FaPhone className="text-[#C4A57F] flex-shrink-0 text-sm" />
                <a
                  href="tel:+971555769195"
                  onClick={() => gtag_report_conversion()}
                  className="text-white/45 hover:text-[#C4A57F] text-sm transition-colors"
                >
                  +971 555 769 195
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-[#C4A57F] flex-shrink-0 text-sm" />
                <a
                  href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Palm%20Jebel%20Ali%20Beach%20Villas"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => gtag_report_conversion()}
                  className="text-white/45 hover:text-[#C4A57F] text-sm transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#C4A57F] flex-shrink-0 text-sm" />
                <a
                  href="mailto:info@dnkre.com"
                  className="text-white/45 hover:text-[#C4A57F] text-sm transition-colors"
                >
                  info@dnkre.com
                </a>
              </li>
            </ul>
          </div>

          {/* Property info */}
          <div>
            <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Beach Villas
            </p>
            <table className="w-full text-sm border-collapse border border-white/15">
              <tbody>
                {[
                  ["Developer", "Nakheel"],
                  ["Location", "Dubai, UAE"],
                  ["Bedrooms", "5 – 6 BR"],
                  ["Starting Price", "AED 30M"],
                  ["EOI", "AED 1M"],
                ].map(([key, val]) => (
                  <tr key={key} className="border border-white/15">
                    <td className="text-white/45 py-2 px-3 border border-white/15">
                      {key}
                    </td>
                    <td
                      className={`py-2 px-3 border border-white/15 text-right ${
                        key === "Starting Price" || key === "EOI"
                          ? "text-[#C4A57F] font-semibold"
                          : "text-white"
                      }`}
                    >
                      {val}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs m-0">
            © {new Date().getFullYear()} DNK Real Estate. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy-policy"
              className="text-white/40 hover:text-[#C4A57F] text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-white/40 hover:text-[#C4A57F] text-xs transition-colors"
            >
              DNK Real Estate
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
