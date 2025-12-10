"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ADmodel from "./ADmodel";
import { WWURL } from "@/url/axios";

const ADAmenitiesImg = ({ promotionData }) => {
  const [ShowPopup, setShowPopup] = useState(false);

  const slidImg1 = promotionData?.amenitieImage1 ? `${WWURL}${promotionData.amenitieImage1}` : null;
  const slidImg2 = promotionData?.amenitieImage2 ? `${WWURL}${promotionData.amenitieImage2}` : null;
  const slidImg3 = promotionData?.amenitieImage3 ? `${WWURL}${promotionData.amenitieImage3}` : null;
  const slidImg4 = promotionData?.amenitieImage4 ? `${WWURL}${promotionData.amenitieImage4}` : null;
  const slidImg5 = promotionData?.amenitieImage5 ? `${WWURL}${promotionData.amenitieImage5}` : null;

  const slideData = [
    { image: slidImg1, label: `${promotionData.altAmenitieImage1}` },
    { image: slidImg2, label: `${promotionData.altAmenitieImage2}` },
    { image: slidImg3, label: `${promotionData.altAmenitieImage3}` },
    { image: slidImg4, label: `${promotionData.altAmenitieImage4}` },
    { image: slidImg5, label: `${promotionData.altAmenitieImage5}` },
  ];

  return (
    <div id="Amenities" className="container max-w-[1240px] py-6 px-4 m-auto">
      <h1 className="text-[#fff] m-auto w-fit">{promotionData?.amenitiesSectionTitle}</h1>
      <p className="w-full md:w-[80%] text-center m-auto mb-5 md:mb-[30px]">
       {promotionData?.amenitiesSectionSubTitle}
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
            {slide.image ? (
              <div
                className="w-full h-[300px] md:h-[450px] bg-no-repeat bg-cover bg-center rounded-lg relative overflow-hidden cursor-pointer"
                style={{ backgroundImage: `url(${slide.image})` }}
                onClick={() => setShowPopup(true)}
              >
                <div className="w-full h-[160px] absolute left-0 bottom-0 bg-gradient-to-t from-black/90 flex items-end justify-center">
                  <h3 className="text-white text-[1.2rem] font-semibold pb-6">{slide.label}</h3>
                </div>
              </div>
            ) : (
              <div className="h-[300px] md:h-[450px] w-full bg-gray-700 animate-pulse rounded-lg"></div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {ShowPopup && <ADmodel promotionData={promotionData} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default ADAmenitiesImg;
