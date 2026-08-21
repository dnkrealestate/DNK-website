import React from "react";
import {
  MdLocationOn,
  MdTrain,
  MdLocalMall,
  MdFlightTakeoff,
  MdLocationCity,
  MdDirectionsBoat,
} from "react-icons/md";
import { GiPalmTree } from "react-icons/gi";

// Approximate, presented as such — exact drive times will vary with the
// island's internal road network still under development.
const DESTINATIONS = [
  { name: "Life Pharmacy Metro Station", time: "~16 min", icon: MdTrain },
  { name: "Ibn Battuta Mall", time: "~19 min", icon: MdLocalMall },
  { name: "Al Maktoum International Airport (DWG)", time: "~24 min", icon: MdFlightTakeoff },
  { name: "Expo City", time: "~24 min", icon: MdLocationCity },
  { name: "Dubai marina", time: "~25 min", icon: MdDirectionsBoat },
  { name: "Palm Jumeirah", time: "~27 min", icon: GiPalmTree },
];

export default function PJLocation() {
  return (
    <section className="py-20 bg-white" id="location">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left: content */}
          <div className="flex-1">
            <p className="text-[#79644A] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Prime Position
            </p>
            <h2
              className="text-[#14181B] text-3xl lg:text-4xl mb-5 leading-tight font-semibold"
              style={{ fontFamily: "var(--font-pj-display), serif" }}
            >
              Secluded, Yet{" "}
              <span className="text-[#79644A] italic">Connected</span>
            </h2>
            <p className="text-black/50 text-base leading-relaxed mb-8">
              Palm Jebel Ali sits along Dubai&apos;s southern coastline,
              within easy reach of Al Maktoum International Airport, Expo
              City, and Dubai&apos;s established beachfront districts —
              offering the seclusion of a private island without sacrificing
              access to the city.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DESTINATIONS.map((dest, i) => {
                const Icon = dest.icon;
                return (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-[#FAF9F6] border border-black/[0.07] rounded-xl p-4 hover:border-[#79644A]/30 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#79644A]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-[#79644A] text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#14181B] text-sm font-medium truncate m-0">
                      {dest.name}
                    </p>
                    <p className="text-[#79644A] text-xs font-semibold m-0">
                      {dest.time}
                    </p>
                  </div>
                </div>
                );
              })}
            </div>
          </div>

          {/* Right: visual map card */}
          <div className="w-full lg:w-[480px] flex-shrink-0">
            <div className="h-[400px] rounded-3xl relative overflow-hidden border border-black/10 shadow-lg shadow-black/5">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/assets/other/map.webm" type="video/webm" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

              {/* <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#C9A876]/20 border-2 border-[#C9A876]/50 flex items-center justify-center shadow-lg shadow-[#C9A876]/20 backdrop-blur-sm">
                  <MdLocationOn className="text-[#C9A876] text-3xl" />
                </div>
              </div> */}

              <div className="absolute bottom-0 left-0 right-0 bg-black/45 backdrop-blur-sm p-5">
                <p className="text-[#C4A57F] text-xs font-semibold uppercase tracking-wide mb-0.5">
                  Palm Jebel Ali
                </p>
                <p className="text-white text-sm">Dubai · United Arab Emirates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
