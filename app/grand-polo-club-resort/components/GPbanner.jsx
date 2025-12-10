"use client"; 

import Image from "next/image";
import projectCover from "@/public/assets/pojects/grandPolo/grandpoloCover.webp";

const GPbanner = () => {
  return (
    <div className="relative w-full">
      <div className="relative w-full h-[300px] md:h-[500px] lg:h-[700px]">
        <Image
          src={projectCover}
          alt="Grand Polo Club Cover"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Optional container for banner text or content */}
      <div className="absolute inset-0 flex items-end md:items-center justify-start z-10 container max-w-[1240px] px-4">
        <div className="banner-content h-[300px] md:h-[500px] lg:h-[700px]">
          {/* Add text, CTA or overlay here if needed */}
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 w-full h-[50px] md:h-[100px] z-20 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};

export default GPbanner;