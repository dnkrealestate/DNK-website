"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import PJContactForm from "./PJContactForm";
import { gtag_report_conversion } from "./gtagReportConversion";

export default function PJFormPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 px-4">
      {/* Same dark video backdrop as the main hero */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #05070A 0%, #0A1416 35%, #0F2224 65%, #123531 100%)",
        }}
      />
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/other/bannerVideo.webm" type="video/webm" />
      </video>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 100%, rgba(121,100,74,0.16) 0%, rgba(121,100,74,0) 60%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <Link href="/palmjebelali/beach-villas" className="flex justify-center mb-6">
          <div className="relative h-10 w-[145px]">
            <Image
              src="/assets/other/palmjebelali-titile01.webp"
              alt="Palm Jebel Ali"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <div className="bg-white/[0.04] backdrop-blur-md border border-[#79644A]/20 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/50">
          <div className="text-center mb-6">
           
            <h1
              className="text-white font-semibold text-2xl sm:text-3xl mb-0"
              style={{ fontFamily: "var(--font-pj-display), serif" }}
            >
              Reserve Your Villa
            </h1>
             <p className="text-[#C4A57F] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Palm Jebel Ali Beach & Coral Villas
            </p>
            <p className="text-white/55 text-sm leading-relaxed">
              Register your Expression of Interest to receive floor plans, pricing &amp;
              priority allocation.
            </p>
          </div>

          <PJContactForm unitInterest="Beach Villas" />
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <a
            href="tel:+971555769195"
            onClick={() => gtag_report_conversion()}
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
          >
            <FaPhoneAlt className="text-xs" /> Call Us
          </a>
         
        </div>
      </div>
    </div>
  );
}
