"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import slidImg1 from "@/public/assets/other/islandsSlider1.webp";
import slidImg2 from "@/public/assets/other/islandsSlider2.webp";
import slidImg3 from "@/public/assets/other/islandsSlider3.webp";
import slidImg4 from "@/public/assets/other/islandsSlider4.webp";
import slidImg5 from "@/public/assets/other/islandsSlider5.webp";
import slidImg6 from "@/public/assets/other/islandsSlider6.webp";
import ADmodel from "./ADmodel";


const ADimgSlider = () => {
  const [ShowPopup, setShowPopup] = useState(false);

  const sliderImages = [
    slidImg1,
    slidImg2,
    slidImg3,
    slidImg4,
    slidImg5,
    slidImg6,
  ];

  return (
    <div className="container max-w-[1240px] py-6 px-4 m-auto">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={5}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
        loop={true}
        className="w-full"
      >
        {sliderImages.map((img, index) => (
          <SwiperSlide
            key={index}
            className={index % 2 === 0 ? "pt-[60px]" : ""}
          >
            <div
              className="w-full h-[300px] md:h-[450px] bg-no-repeat bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url(${img.src})` }}
              onClick={() => setShowPopup(true)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {ShowPopup && <ADmodel onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default ADimgSlider;
