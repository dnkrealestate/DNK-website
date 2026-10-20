import React from "react";
import Image from "next/image";
import DLContactForm from "./DLContactForm";

export default function DLFinalCTA() {
  return (
    <section className="relative py-16 lg:py-24 px-4 overflow-hidden" id="enquire-footer">
      <Image
        src="/assets/damac-lagoons/gallery/gallery-01.webp"
        alt="Sorrento Lagoon Views at Damac Lagoons"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
            Don't Wait Until Launch Day. Explore Sorrento.
          </h2>
          <p className="text-white/70 mb-6 max-w-[480px]">
            Register your interest now to receive the official apartment
            information, EOI instructions and launch updates.
          </p>
          <div className="inline-flex items-center gap-3 bg-[#0D1210]/60 border border-white/10 rounded-2xl px-5 py-3 mb-6">
            <span className="w-10 h-10 rounded-full bg-[#1C6B82] text-white text-sm font-extrabold flex items-center justify-center flex-shrink-0">
              0%
            </span>
            <span className="text-white text-sm">
              <span className="font-semibold">4% DLD Fee Waiver</span>
              <br />
              <span className="text-white/60 text-xs">Damac covers the 4% DLD fee.</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Damac%20Lagoons%20-%20Sorrento%20Lagoon%20Views"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:brightness-110 text-white font-semibold px-6 py-3 rounded-full text-sm flex items-center gap-2 transition-all"
            >
              WhatsApp Us
            </a>
            <a
              href="tel:+971555769195"
              className="border border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
            >
              +971 55 576 9195
            </a>
          </div>
        </div>

        <div className="bg-[#0D1210]/95 backdrop-blur-md border border-white/10 rounded-3xl p-6 lg:p-7 shadow-2xl">
          <h3 className="text-white font-extrabold text-xl mb-4">
            Register for Sorrento Early Access
          </h3>
          <DLContactForm heading="Register for Sorrento Early Access" />
        </div>
      </div>
    </section>
  );
}
