"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import userProfile from "@/public/assets/icons/userprofile.webp";
import { WWURL } from "@/url/axios";
import Image from "next/image";

export default function TeamSection({ teamData }) {
 const getThumbnailUrl = (image) => (image ? `${WWURL}${image}` : userProfile);
  
  return (
    <div className="w-full bg-[#040406] flex items-center justify-center px-4 xl:px-0">
      <div className="serviceSection container max-w-[1240px] py-5  px-4  md:py-9">
        <h2 className="m-auto w-fit">Our Exclusive Team</h2>
        <p className="text-center m-auto w-[100%] md:w-[80%]">
          We at DNK Real Estate, as dedicated professionals, provide
          unparalleled real estate service, and pride ourselves on our
          knowledge, experience and skills, which enable us to help a wide
          variety of clients.
        </p>
        <div>
          <Swiper
            slidesPerView={4}
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            initialSlide={0}
            watchSlidesProgress={true}
            observer={true}
            observeParents={true}
            loop={true}
            autoplay={{ delay: 3500 }}
            speed={1000}
            spaceBetween={4}
            className="!h-fit"
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              480: { slidesPerView: 2 },
              640: {
                slidesPerView: 3,
              },
              768: { slidesPerView: 3 },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {teamData.length > 0
              ? teamData.map((data) => {
                  const slug = data._id;
                  return (
                    <SwiperSlide key={data._id}>
                      <Link
                        className="p-4"
                        key={data._id}
                        href={`/team/${slug}`}
                      >
                        <div className="max-w-[250px] bg-[#040406] cursor-pointer team-card m-auto">
                          <div className="relative  m-auto">
                            <Image
                              className=" m-auto"
                              src={getThumbnailUrl(data.image)}
                              alt={`${data.position}, 'Real estate, Dubai Real estate, real estate money, make money, millionaire'`}
                              width={800}
                              height={1034.71}
                              loading="lazy"
                              quality={80}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                              formats={["image/webp"]}
                              style={{
                                objectFit: "contain",
                                display: "block",
                              }}
                            />
                          </div>

                          <div className="text-center pt-1">
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
                              {data.name}
                            </h2>
                            <p className="m-0 font-normal text-gray-400">
                              {data.position}
                            </p>
                            <p className="m-0 font-normal text-gray-400">
                              {data.language}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })
              : [...Array(4)].map((_, index) => (
                  <SwiperSlide key={index}>
                    <div className="p-4">
                      <div className="relative border rounded-[10px] shadow bg-gray-800 animate-pulse">
                        <div className="h-[250px] bg-gray-600 rounded-t-lg"></div>
                        <div className="p-5">
                          <div className="h-6 bg-gray-500 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-500 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            {/* Custom Navigation Buttons */}
            <div className="custom-prev">
              <IoIosArrowDropleftCircle />
            </div>
            <div className="custom-next">
              <IoIosArrowDroprightCircle />
            </div>
          </Swiper>
        </div>
        <Link
          href="/team"
          className="flex items-center gap-4 text-[#ffff] font-normal text-[0.9rem] mt-4 md:text-[1rem] m-auto w-fit"
        >
          View More
          <MdOutlineKeyboardDoubleArrowRight className="arrow-r-bounce text-[0.9rem] md:text-[1.3rem]" />
        </Link>
      </div>
    </div>
  );
}
