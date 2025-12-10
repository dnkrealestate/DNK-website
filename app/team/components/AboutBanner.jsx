"use client";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import Image from "next/image";
import { WWURL } from "@/url/axios";

export default function AboutBanner({ teamData }) {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (teamData?.length > 0) {
      setSlides(teamData);
      setLoading(false); // Data is ready, hide shimmer
    }
  }, [teamData]);

  const getImageUrl = (sliderimg) => sliderimg ? `${WWURL}${encodeURIComponent(sliderimg)}` : "Loading...";

  return (
    <div className="w-full relative bg-[#040406]">
      <div className="absolute bottom-8 left-0 z-30 w-full">
        <h1 className="w-full text-center m-0">Who we are</h1>
        <p className="w-full text-center mb-2 text-[#ffffff]">
          Get to Know Our Team
        </p>
      </div>

      {loading ? (
        // Shimmer Effect while loading
        <div className="w-full h-[20.5rem] flex items-center justify-center bg-gray-700 animate-pulse"></div>
      ) : (
        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView={6}
          spaceBetween={0}
          loop={true}
          freeMode={true}
          direction="horizontal"
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={3000}
          breakpoints={{
            320: { slidesPerView: 3 },
            480: { slidesPerView: 3 },
            640: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          className="p-4 pb-0 pt-6 relative"
        >
          {slides.map((data, index) => (
            <SwiperSlide key={data._id || `slide-${index}`}>
              <div className="relative">
                <div className="bg-[#050612] opacity-60 w-full absolute top-0 left-0 h-full hover:bg-transparent ease-in-out duration-1000"></div>
                <Image
                  src={getImageUrl(data.sliderimg)}
                  alt="cover img, Real Estate Market, Dubai, Dubai South, Apartment, Villa"
                  width={80}
                  height={100}
                  quality={80}
                  priority={index < 10}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
