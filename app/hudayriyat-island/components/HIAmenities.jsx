import React from "react";
import {
  MdPool,
  MdSpa,
  MdFitnessCenter,
  MdDirectionsWalk,
  MdDirectionsBike,
  MdRestaurant,
  MdMovieFilter,
  MdPark,
  MdSportsTennis,
  MdHouse,
  MdChildFriendly,
} from "react-icons/md";
import { FaUmbrellaBeach, FaWater } from "react-icons/fa";
import { GiSurfBoard } from "react-icons/gi";

const AMENITIES = [
  { Icon: MdHouse, label: "Club House" },
  { Icon: MdChildFriendly, label: "Kids Play Area" },
  { Icon: FaUmbrellaBeach, label: "Private Beach" },
  { Icon: MdSpa, label: "Spa" },
  { Icon: MdPool, label: "Shared Pool" },
  { Icon: MdFitnessCenter, label: "Shared Gym" },
  { Icon: MdDirectionsWalk, label: "Walking Paths" },
  { Icon: MdMovieFilter, label: "Indoor Cinema" },
  { Icon: MdPark, label: "Landscaped Parks" },
  { Icon: MdDirectionsBike, label: "Cycle Tracks" },
  { Icon: MdSportsTennis, label: "Sports Hubs" },
  { Icon: GiSurfBoard, label: "Surf Park" },
  { Icon: FaWater, label: "Velodrome" },
  { Icon: MdRestaurant, label: "Dining Promenades" },
];

export default function HIAmenities() {
  return (
    <section className="py-20 bg-[#06101C]" id="amenities">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-[#C4973D] text-xs font-semibold tracking-widest uppercase mb-3">
            World-Class Lifestyle
          </p>
          <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4">
            Amenities &amp; Facilities
          </h2>
          <p className="text-[#8BA4BC] text-base max-w-xl mx-auto leading-relaxed">
            Life at Hudayriyat Island is all about waterfront luxury — with
            every amenity curated for your comfort and enjoyment.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {AMENITIES.map(({ Icon, label }, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 lg:p-5 hover:border-[#C4973D]/35 hover:bg-[#C4973D]/[0.05] transition-all duration-300 text-center group cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#C4973D]/10 border border-[#C4973D]/20 flex items-center justify-center text-[#C4973D] text-xl group-hover:bg-[#C4973D]/20 transition-colors">
                <Icon />
              </div>
              <span className="text-white/70 text-xs font-medium leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
