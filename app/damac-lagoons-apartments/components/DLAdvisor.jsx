import React from "react";
import Image from "next/image";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function DLAdvisor() {
  return (
    <section className="bg-[#F5F1E8] px-4 pb-16 lg:pb-24">
      <div className="max-w-[900px] mx-auto">
        <div className="bg-white rounded-3xl border border-[#E5E0D5] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-[#1C6B82]/10 flex items-center justify-center flex-shrink-0">
            <Image
              src="/assets/logo/dnklogo_1.webp"
              alt="DNK Real Estate"
              width={40}
              height={40}
              className="w-10 h-10 object-contain brightness-0"
              style={{ filter: "invert(32%) sepia(23%) saturate(1200%) hue-rotate(150deg)" }}
            />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <p className="text-[#1C6B82] text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center justify-center sm:justify-start gap-2">
              <span>06</span>
              <span className="w-8 h-px bg-[#1C6B82]" />
              <span>Your Advisor</span>
            </p>
            <h3 className="text-[#151A19] text-xl font-extrabold mb-1">
              Speak Directly With DNK Real Estate
            </h3>
            <p className="text-[#5B6460] text-xs mb-2">
              Licensed Dubai Real Estate Brokerage
            </p>
            <p className="text-[#5B6460] text-sm italic">
              "From your first enquiry to the launch process, you'll deal
              directly with our team."
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full sm:w-auto flex-shrink-0">
            <a
              href="https://wa.me/+971555769195?text=Hello,%20I%20am%20interested%20in%20Damac%20Lagoons%20-%20Sorrento%20Lagoon%20Views"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:brightness-110 text-white font-semibold px-6 py-2.5 rounded-full text-sm flex items-center justify-center gap-2 transition-all"
            >
              <FaWhatsapp /> WhatsApp Us
            </a>
            <a
              href="tel:+971555769195"
              className="border border-[#D8D4CC] hover:border-[#1C6B82] text-[#151A19] font-semibold px-6 py-2.5 rounded-full text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <FaPhoneAlt className="text-xs" /> Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
