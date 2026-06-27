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

const SOCIALS = [
  { Icon: FaInstagram, href: "https://www.instagram.com/dnk_re/", label: "Instagram" },
  { Icon: FaFacebook, href: "https://www.facebook.com/dnkrealestate1/", label: "Facebook" },
  { Icon: FaLinkedin, href: "https://www.linkedin.com/company/dnkrealestate/", label: "LinkedIn" },
  { Icon: FaYoutube, href: "https://www.youtube.com/channel/UCKH7d3Sx2dkfb4pEXXaMpFA", label: "YouTube" },
];

const NAV_IDS = ["about", "amenities", "payment", "location", "contact"];
const NAV_LABELS = ["Overview", "Amenities", "Payment Plan", "Location", "Contact"];

export default function HIFooter() {
  return (
    <footer className="bg-[#030D18] border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div>
            <div className="relative h-10 w-[110px] mb-4">
              <Image
                src="/assets/logo/dnklogo_1.webp"
                alt="DNK Real Estate"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-[#8BA4BC] text-sm leading-relaxed mb-5">
              DNK Real Estate — your trusted partner for premium off-plan
              properties in Dubai and Abu Dhabi.
            </p>
            <div className="flex gap-3 flex-wrap">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#C4973D] hover:border-[#C4973D]/30 transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
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
                    className="text-[#8BA4BC] hover:text-[#C4973D] text-sm transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/"
                  className="text-[#8BA4BC] hover:text-[#C4973D] text-sm transition-colors"
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
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#C4973D] mt-0.5 flex-shrink-0 text-sm" />
                <span className="text-[#8BA4BC] text-sm leading-snug">
                  Suite No: 603, Sama Building, Al Barsha 1, Dubai, UAE
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-[#C4973D] flex-shrink-0 text-sm" />
                <a
                  href="tel:+971555769195"
                  className="text-[#8BA4BC] hover:text-[#C4973D] text-sm transition-colors"
                >
                  +971 555 769 195
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-[#C4973D] flex-shrink-0 text-sm" />
                <a
                  href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Hudayriyat%20Island"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8BA4BC] hover:text-[#C4973D] text-sm transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#C4973D] flex-shrink-0 text-sm" />
                <a
                  href="mailto:info@dnkre.com"
                  className="text-[#8BA4BC] hover:text-[#C4973D] text-sm transition-colors"
                >
                  info@dnkre.com
                </a>
              </li>
            </ul>
          </div>

          {/* Property info */}
          <div>
            <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Hudayriyat Island
            </p>
            <ul className="space-y-2 text-sm">
              {[
                ["Developer", "Modon"],
                ["Location", "Abu Dhabi, UAE"],
                ["Starting Price", "AED 2.3M"],
                ["Payment Plan", "50 / 50"],
                ["Booking", "10%"],
                ["Handover", "Q4 2029"],
              ].map(([key, val]) => (
                <li key={key} className="flex justify-between gap-4">
                  <span className="text-[#8BA4BC]">{key}</span>
                  <span
                    className={
                      key === "Starting Price" || key === "Booking"
                        ? "text-[#C4973D] font-semibold"
                        : "text-white"
                    }
                  >
                    {val}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8BA4BC] text-xs m-0">
            © {new Date().getFullYear()} DNK Real Estate. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy-policy"
              className="text-[#8BA4BC] hover:text-[#C4973D] text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-[#8BA4BC] hover:text-[#C4973D] text-xs transition-colors"
            >
              DNK Real Estate
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
