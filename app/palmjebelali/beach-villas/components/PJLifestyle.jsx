import React from "react";
import { MdSpa, MdRestaurant, MdSailing, MdGolfCourse } from "react-icons/md";

const AMENITIES = [
  { icon: MdSailing, label: "Private Marina & Beach Club" },
  { icon: MdSpa, label: "Wellness & Spa Pavilion" },
  { icon: MdRestaurant, label: "Curated Fine Dining" },
  { icon: MdGolfCourse, label: "Leisure & Recreation Facilities" },
];

export default function PJLifestyle() {
  return (
    <section className="py-20 bg-white" id="lifestyle">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left: visual — a dark video card intentionally stands apart
              from the light page background for contrast */}
          <div className="w-full lg:w-[460px] flex-shrink-0 order-2 lg:order-1">
            <div className="h-[420px] rounded-3xl relative overflow-hidden border border-black/10 shadow-lg shadow-black/5">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/assets/other/aboutVideo.webm" type="video/webm" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[#C4A57F] text-xs font-semibold uppercase tracking-wide mb-0.5">
                  Palm Jebel Ali
                </p>
                <p className="text-white text-sm">
                  Dubai&apos;s next waterfront icon
                </p>
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div className="flex-1 order-1 lg:order-2">
            <p className="text-[#79644A] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Island Living, Redefined
            </p>
            <h2
              className="text-[#14181B] text-3xl lg:text-4xl mb-5 leading-tight font-semibold"
              style={{ fontFamily: "var(--font-pj-display), serif" }}
            >
              A Lifestyle Reserved for the{" "}
              <span className="text-[#79644A] italic">Few</span>
            </h2>
            <p className="text-black/50 text-base leading-relaxed mb-8">
              Palm Jebel Ali is Nakheel&apos;s next generation of waterfront
              living — a fully-realized island destination offering the
              privacy of a private estate with the amenities of a five-star
              resort. Every villa is positioned to command uninterrupted sea
              views, framed by curated landscaping and world-class leisure
              facilities just steps from your door.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AMENITIES.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-[#FAF9F6] border border-black/[0.07] rounded-xl p-4 hover:border-[#79644A]/30 transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#79644A]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="text-[#79644A] text-lg" />
                    </div>
                    <p className="text-[#14181B]/85 text-sm font-medium m-0">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
