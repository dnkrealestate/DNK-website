"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import slidImg1 from "@/public/assets/lavioleta/aminitimg1.webp";
import slidImg2 from "@/public/assets/lavioleta/aminitimg2.webp";
import slidImg3 from "@/public/assets/lavioleta/aminitimg3.webp";
import slidImg4 from "@/public/assets/lavioleta/aminitimg4.webp";
import slidImg5 from "@/public/assets/lavioleta/aminitimg5.webp";
import GPmodel from "./GPmodel";

const GPAmenitiesImg = () => {
  const [showPopup, setShowPopup] = useState(false);

  const slides = [
    { img: slidImg1, title: "Outdoor Pool" },
    { img: slidImg2, title: "Green Land" },
    { img: slidImg3, title: "Mosque" },
    { img: slidImg4, title: "Kids Play Area" },
    { img: slidImg5, title: "Gym" },
  ];

  return (
    <div id="Amenities" className="container max-w-[1240px] py-6 px-4 m-auto">
      <h1 className="text-[#fff] m-auto w-fit">Community Amenities</h1>
      <p className="w-full md:w-[80%] text-center m-auto mb-6">
        Experience a lifestyle of convenience and luxury with our world-class
        amenities, including a state-of-the-art fitness centre, swimming pools,
        lush green parks, and a vibrant community center for social gatherings
        and events.
      </p>

      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        autoplay={{ delay: 3000 }}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 2 },
          992: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
        }}
        modules={[Autoplay]}
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-[300px] md:h-[450px] bg-no-repeat bg-cover bg-center rounded-lg relative overflow-hidden"
              style={{ backgroundImage: `url(${item.img.src})` }}
              onClick={() => setShowPopup(true)}
            >
              <div className="w-full h-[160px] absolute left-0 bottom-0 bg-gradient-to-t from-[#000000] flex items-end justify-center">
                <h3 className="text-white text-[1.2rem] font-semibold pb-6">
                  {item.title}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {showPopup && <GPmodel onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default GPAmenitiesImg;
