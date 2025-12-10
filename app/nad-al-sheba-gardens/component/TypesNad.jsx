"use client"; // if using app router

import React, { useState } from "react";
import Image from "next/image";
import { IoBed } from "react-icons/io5";
import { FaRegSquare } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Image imports (use public folder or import statically)
import nad4br from "@/public/assets/pojects/NadAlSheba/nad-villa-4br.webp";
import nad5br from "@/public/assets/pojects/NadAlSheba/nad-villa-5br.webp";
import nad6br from "@/public/assets/pojects/NadAlSheba/nad-villa-6br.webp";
import nad7br from "@/public/assets/pojects/NadAlSheba/nad-villa-7br.webp";

import PopupNad from "./PopupNad";

const villas = [
  {
    title: "4 Bedroom Villa",
    price: "11.4M",
    area: "445.52 SQM",
    image: nad4br,
  },
  {
    title: "5 Bedroom Villa",
    price: "13.9M",
    area: "525.01 SQM",
    image: nad5br,
  },
  {
    title: "6 Bedroom Villa",
    price: "17.7M",
    area: "638.51 SQM",
    image: nad6br,
  },
  {
    title: "7 Bedroom Villa",
    price: "24.8M",
    area: "808.81 SQM",
    image: nad7br,
  },
];

export const TypesNad = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <div
      className="w-full bg-[#040406] flex items-center justify-center px-4 xl:px-0"
      id="units"
    >
      <div className="featureProject container max-w-[1240px] py-5 px-4 md:py-9">
        <div className="flex flex-col md:flex-row">
          <div className="w-full">
            <h2 className="m-0 text-center">Premium Villas</h2>
            <h3 className="m-0 text-[#258493] text-center mb-2">
              Nad Al Sheba Gardens
            </h3>
          </div>
        </div>

        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          loop
          autoplay={{ delay: 7000 }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          {villas.map((villa, index) => (
            <SwiperSlide key={index}>
              <div
                className="p-1 cursor-pointer"
                onClick={() => setIsPopupVisible(true)}
              >
                <div className="max-w-full overflow-hidden border border-[#fff] rounded-[10px] shadow bg-[#040406]">
                  <div className="relative w-full h-[266px]">
                    <Image
                      src={villa.image}
                      alt={villa.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-[10px]"
                      priority={index === 0}
                    />
                    <div className="bg-[#FFC700] border border-[#fff] rounded-l-full rounded-r-none w-fit px-5 py-0 absolute bottom-[-10px] right-0">
                      <h6 className="line-clamp-1 text-[#000]">
                        Starting From: {villa.price}
                      </h6>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center">
                      <IoBed className="text-white text-2xl mb-1" />
                      <h5 className="mb-1 text-2xl font-bold tracking-tight text-white line-clamp-1">
                        {villa.title}
                      </h5>
                    </div>
                    <div className="flex items-center">
                      <FaRegSquare className="text-gray-400 text-[1rem]" />
                      <p className="m-1 font-normal text-gray-400 line-clamp-1">
                        TOTAL AREA: {villa.area}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsPopupVisible(true)}
                      className="bg-[#FFFF] hover:bg-[#258493] text-[#000000] hover:text-[#FFFF] w-full px-4 py-1 rounded duration-100 flex justify-center text-[0.6rem] sm:text-[0.9rem]"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {isPopupVisible && (
          <PopupNad onClose={() => setIsPopupVisible(false)} />
        )}
      </div>
    </div>
  );
};

export default TypesNad;
