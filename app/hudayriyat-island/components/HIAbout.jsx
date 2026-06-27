import React from "react";
import Image from "next/image";
import { MdLocationOn, MdVerified } from "react-icons/md";
import aboutImg from "@/public/assets/other/hudayriyatAbout.webp";

const FEATURES = [
  "Waterfront villas, townhouses & apartments",
  "Panoramic sea views & private gardens",
  "Contemporary architectural elegance",
  "Connected to the heart of Abu Dhabi",
  "World-class island leisure facilities",
  "Strong capital appreciation potential",
];

export default function HIAbout() {
  return (
    <section className="py-20 bg-[#091825]" id="about">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

          {/* ── Left: visual placeholder ── */}
          <div className="w-full lg:w-[480px] flex-shrink-0">
            <div
              className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #0D2035 0%, #1A3050 50%, #0D2035 100%)",
              }}
            >
              {/* Dot pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(196,151,61,0.8) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />

               {/* Background image */}
                    <Image
                      src={aboutImg}
                      alt="Hudayriyat Island - About"
                      fill
                      className="object-cover object-center"
                      priority
                    />

              {/* Concentric rings */}
              {/* <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-56 h-56 rounded-full border border-[#C4973D]/10" />
                  <div className="absolute w-40 h-40 rounded-full border border-[#C4973D]/15" />
                  <div className="absolute w-24 h-24 rounded-full border border-[#C4973D]/25" />
                  <div className="w-16 h-16 rounded-full bg-[#C4973D]/20 border-2 border-[#C4973D]/50 flex items-center justify-center">
                    <MdLocationOn className="text-[#C4973D] text-3xl" />
                  </div>
                </div>
              </div> */}

              {/* Bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm p-5">
                <div className="flex items-center gap-2">
                  <MdVerified className="text-[#C4973D] text-xl flex-shrink-0" />
                  <p className="text-white text-sm font-medium m-0">
                    Developed by{" "}
                    <span className="text-[#C4973D] font-semibold">Modon</span>{" "}
                    — Abu Dhabi&apos;s Trusted Developer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: content ── */}
          <div className="flex-1">
            <p className="text-[#C4973D] text-xs font-semibold tracking-widest uppercase mb-3">
              About the Project
            </p>
            <h2 className="text-white text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              An Iconic Island Destination,
              <br />
              <span className="text-[#C4973D]">Connected to Abu Dhabi</span>
            </h2>
            <p className="text-[#8BA4BC] text-base leading-relaxed mb-5">
              Hudayriyat Island is Abu Dhabi&apos;s newest landmark community — a
              world-class waterfront destination that blends serene natural
              surroundings with contemporary luxury. Featuring a curated mix of
              residential units, from stylish apartments to spacious villas and
              townhouses, this island offers a lifestyle beyond compare.
            </p>
            <p className="text-[#8BA4BC] text-base leading-relaxed mb-8">
              With breathtaking panoramic views, private beach access, and a
              vibrant community of leisure attractions — including the iconic
              Surf Park, Velodrome, and waterfront dining promenades —
              Hudayriyat Island redefines modern island living in the UAE.
            </p>

            {/* Feature checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FEATURES.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C4973D]/15 border border-[#C4973D]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-[#C4973D] rounded-full" />
                  </div>
                  <span className="text-white/70 text-sm leading-snug">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
