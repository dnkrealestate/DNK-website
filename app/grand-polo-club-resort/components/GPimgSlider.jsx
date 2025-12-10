"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";


import slidImg1 from "@/public/assets/pojects/grandPolo/slider02.webp";
import slidImg2 from "@/public/assets/pojects/addressVilla/sliderImg02.webp";
import slidImg3 from "@/public/assets/pojects/addressVilla/sliderImg03.webp";
import slidImg4 from "@/public/assets/pojects/addressVilla/sliderImg04.webp";
import slidImg5 from "@/public/assets/pojects/addressVilla/sliderImg05.webp";
import slidImg6 from "@/public/assets/pojects/grandPolo/slider01.webp";
import GPmodel from "./GPmodel";

const GPimgSlider = () => {
  const [ShowPopup, setShowPopup] = useState(false);

  const images = [slidImg1, slidImg2, slidImg3, slidImg4, slidImg5, slidImg6];

  return (
    <div className="container max-w-[1240px] py-6 px-4 m-auto">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={5}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className={`w-full h-[300px] md:h-[450px] bg-no-repeat bg-cover bg-center cursor-pointer ${
                index % 2 === 0 ? "pt-[60px]" : ""
              }`}
              style={{ backgroundImage: `url(${img.src})` }}
              onClick={() => setShowPopup(true)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {ShowPopup && <GPmodel onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default GPimgSlider;
