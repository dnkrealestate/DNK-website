"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoBookOutline, IoDocumentsOutline, IoMapOutline, IoLockClosedOutline } from "react-icons/io5";

const DOCUMENTS = [
  {
    icon: IoBookOutline,
    title: "Project Brochure",
    text: "Everything you need to know about this exceptional new launch.",
    image: "/assets/aldar-dubai-launch/images/interior-lifestyle.webp",
    document: "Brochure",
    cta: "Get the Brochure",
  },
  {
    icon: IoDocumentsOutline,
    title: "Floor Plans",
    text: "Preview a sample layout below, then request the complete set of townhouse and villa floor plans.",
    image: "/assets/aldar-dubai-launch/images/floor-plan-sample.webp",
    document: "Floor Plans",
    cta: "Request Floor Plans",
  },
  {
    icon: IoMapOutline,
    title: "Master Plan",
    text: "Explore the community layout and discover your ideal plot position.",
    image: "/assets/aldar-dubai-launch/images/masterplan-aerial.webp",
    document: "Master Plan",
    cta: "Request Master Plan",
  },
];

export default function ADocuments({ onOpenEnquiry }) {
  return (
    <section className="bg-[#F7F3EB] py-16 sm:py-24 px-5 sm:px-8 scroll-mt-24" id="documents">
      <div className="max-w-[1320px] mx-auto">
        <p className="text-[#A9874F] text-xs font-bold tracking-[0.2em] uppercase mb-3">
          Brochure &amp; Plans
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-[#101820] text-3xl sm:text-4xl font-semibold mb-4 max-w-[600px]">
          Request the Latest Project Documents
        </h2>
        <p className="text-[#5B5547] max-w-[600px] mb-12 leading-relaxed">
          Everything you need to make a confident decision &mdash; request
          the brochure, floor plans or master plan below and receive it
          directly from a DNK Real Estate advisor.
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          {DOCUMENTS.map((doc, i) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white border border-[#E5DECB] rounded-sm overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-[#101820]">
                <Image
                  src={doc.image}
                  alt={`Preview: ${doc.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/70 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 bg-[#101820]/80 text-white/90 text-[0.6rem] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm flex items-center gap-1.5">
                  <IoLockClosedOutline /> Preview
                </span>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <doc.icon className="text-[#A9874F] text-3xl mb-5" />
                <h3 className="font-[family-name:var(--font-display)] text-[#101820] text-xl font-semibold mb-2">
                  {doc.title}
                </h3>
                <p className="text-[#5B5547] text-sm leading-relaxed mb-5 flex-1">{doc.text}</p>
                <button
                  onClick={() =>
                    onOpenEnquiry({
                      eyebrow: "Document Request",
                      title: doc.cta,
                      subtitle: `We'll send the full ${doc.title.toLowerCase()} directly to you.`,
                      document: doc.document,
                      ctaLabel: doc.cta,
                    })
                  }
                  className="bg-[#101820] hover:bg-[#071321] text-white font-semibold px-5 py-3 rounded-sm text-sm transition-colors"
                >
                  {doc.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
