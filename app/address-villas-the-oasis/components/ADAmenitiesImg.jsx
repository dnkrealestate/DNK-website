"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import slidImg1 from "@/public/assets/lavioleta/aminitimg1.webp";
import slidImg2 from "@/public/assets/lavioleta/aminitimg2.webp";
import slidImg3 from "@/public/assets/lavioleta/aminitimg3.webp";
import slidImg4 from "@/public/assets/lavioleta/aminitimg4.webp";
import slidImg5 from "@/public/assets/lavioleta/aminitimg5.webp";
import ADmodel from "./ADmodel";

const ADAmenitiesImg = () => {
  const [ShowPopup, setShowPopup] = useState(false);

  const slideData = [
    { image: slidImg1, label: "Outdoor Pool" },
    { image: slidImg2, label: "Green Land" },
    { image: slidImg3, label: "Mosque" },
    { image: slidImg4, label: "Kids Play Area" },
    { image: slidImg5, label: "Gym" },
  ];

  return (
    <div id="Amenities" className="container max-w-[1240px] py-6 px-4 m-auto">
      <h1 className="text-[#fff] m-auto w-fit">Community Amenities</h1>
      <p className="w-[100%] md:w-[80%] text-center m-auto mb-[20px] md:mb-[30px]">
        Experience a lifestyle of convenience and luxury with our world-class
        amenities, including a state-of-the-art fitness centre, swimming pools,
        lush green parks, and a vibrant community center for social gatherings
        and events.
      </p>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={5}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 2 },
          992: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
        }}
      >
        {slideData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-[300px] md:h-[450px] bg-no-repeat bg-cover bg-center rounded-lg relative overflow-hidden"
              style={{ backgroundImage: `url(${slide.image.src})` }}
              onClick={() => setShowPopup(true)}
            >
              <div className="w-full h-[160px] absolute left-0 bottom-0 bg-gradient-to-t from-[#000000] flex items-end justify-center">
                <h3 className="text-[#fff] text-[1.2rem] font-semibold pb-6">
                  {slide.label}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {ShowPopup && <ADmodel onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default ADAmenitiesImg;
