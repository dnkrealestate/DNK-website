"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoBookOutline, IoDocumentsOutline, IoMapOutline, IoLockClosedOutline } from "react-icons/io5";

const DOCUMENTS = [
  {
    icon: IoBookOutline,
    title: "Project Brochure",
    text: "See the kind of detail, finishes and lifestyle presentation you'll receive. Request now and we'll send the confirmed Palm Springs brochure the moment Nakheel releases it.",
    image: "/assets/palm-springs-nakheel/images/brochure-sample.png",
    interest: "Brochure",
    cta: "Get the Brochure",
  },
  {
    icon: IoDocumentsOutline,
    title: "Floor Plans",
    text: "A sample layout showing the level of detail our floor-plan packs include. Register to be first to receive the confirmed Palm Springs residence plans.",
    image: "/assets/palm-springs-nakheel/images/floor-plan-sample.png",
    interest: "Floor Plans",
    cta: "Request Floor Plans",
  },
  {
    icon: IoMapOutline,
    title: "Location & Masterplan",
    text: "Explore the reference map and register for the verified masterplan.",
    image: "/assets/palm-springs-nakheel/images/location-map-reference.png",
    interest: "Masterplan",
    cta: "Request Master Plan",
  },
];

export default function PSDocuments({ onOpenEnquiry }) {
  return (
    <section className="bg-[#011945] py-16 sm:py-24 px-5 sm:px-8 scroll-mt-24" id="brochure">
      <div className="max-w-[1320px] mx-auto">
        <p className="text-[#C6A66B] text-xs font-bold tracking-[0.2em] uppercase mb-3">
          Brochure &amp; Plans
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-white text-3xl sm:text-4xl font-semibold mb-4 max-w-[600px]">
          Your First Step Towards Something Exceptional
        </h2>
        <p className="text-white/50 max-w-[600px] mb-12 leading-relaxed">
          Request the latest project information below and receive it
          directly from a DNK Real Estate advisor as soon as it's available.
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          {DOCUMENTS.map((doc, i) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#0A2458]/40 border border-white/10 rounded-sm overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-[#010D30]">
                <Image
                  src={doc.image}
                  alt={`Preview: ${doc.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010D30]/70 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 bg-[#010D30]/80 text-white/90 text-[0.6rem] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm flex items-center gap-1.5">
                  <IoLockClosedOutline /> Preview
                </span>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <doc.icon className="text-[#C6A66B] text-3xl mb-5" />
                <h3 className="font-[family-name:var(--font-display)] text-white text-xl font-semibold mb-2">
                  {doc.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5 flex-1">{doc.text}</p>
                <button
                  onClick={() =>
                    onOpenEnquiry({
                      eyebrow: "Document Request",
                      title: doc.cta,
                      subtitle: `We'll send the ${doc.title.toLowerCase()} directly to you as soon as it's available.`,
                      interest: doc.interest,
                      ctaLabel: doc.cta,
                    })
                  }
                  className="bg-gradient-to-r from-[#C6A66B] to-[#A9874F] hover:brightness-110 text-[#011945] font-semibold px-5 py-3 rounded-sm text-sm transition-all"
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
