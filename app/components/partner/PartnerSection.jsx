"use client";
import React, { lazy, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import partnerLogo from "@/public/assets/icons/addlogo.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import Image from "next/image";
import { WWURL } from "@/url/axios";
import Link from "next/link";

export const PartnerSection = ({ partnerData }) => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (partnerData?.length > 0) {
      setSlides(partnerData);
      setLoading(false);
    }
  }, [partnerData]);
  
  const getPartenerUrl = (image) =>
    image ? `${WWURL}${image}` : partnerLogo;
  
  return (
    <div className="w-full bg-[#040406] flex items-center justify-center">
      <div className=" container max-w-[1240px] py-5  px-4  md:py-9">
        <h2 className="m-auto w-fit">Our Partners</h2>
        <p className="text-center m-auto w-[100%] md:w-[80%]">
          We are honoured to have these amazing partners.
        </p>
        <div className="relative">
          <span className="bg-gradient-to-r from-[#040406] from-10% to-transparent absolute left-0 top-0  h-full w-[150px] z-20"></span>
          {loading ? (
            <div className="flex">
              <div className="p-4">
                <div className="relative rounded-[10px] shadow bg-gray-800 animate-pulse h-[70px] w-[160px] flex items-center justify-center">
                  <div className="h-6 bg-gray-500 rounded w-3/4 mb-2"></div>
                </div>
              </div>
              <div className="p-4">
                <div className="relative rounded-[10px] shadow bg-gray-800 animate-pulse h-[70px] w-[160px] flex items-center justify-center">
                  <div className="h-6 bg-gray-500 rounded w-3/4 mb-2"></div>
                </div>
              </div>
              <div className="p-4">
                <div className="relative rounded-[10px] shadow bg-gray-800 animate-pulse h-[70px] w-[160px] flex items-center justify-center">
                  <div className="h-6 bg-gray-500 rounded w-3/4 mb-2"></div>
                </div>
              </div>
              <div className="p-4">
                <div className="relative rounded-[10px] shadow bg-gray-800 animate-pulse h-[70px] w-[160px] flex items-center justify-center">
                  <div className="h-6 bg-gray-500 rounded w-3/4 mb-2"></div>
                </div>
              </div>
              <div className="p-4">
                <div className="relative rounded-[10px] shadow bg-gray-800 animate-pulse h-[70px] w-[160px] flex items-center justify-center">
                  <div className="h-6 bg-gray-500 rounded w-3/4 mb-2"></div>
                </div>
              </div>
            </div>
          ) : (
            <Swiper
              modules={[Autoplay, FreeMode]}
              slidesPerView={6}
              spaceBetween={4}
              loop={true}
              freeMode={true}
              direction="horizontal"
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              speed={3000}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                },
                480: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                992: { slidesPerView: 4 },
                1024: {
                  slidesPerView: 6,
                },
              }}
              className="p-4 pb-0 pt-6 relative"
            >
              {slides.map((data, index) => (
                <SwiperSlide key={data._id || `slide-${index}`}>
                  <div className="mt-4 !flex !items-center !justify-center w-[160px]  h-[70px] px-2 xl:px-0">
                    <Link
                      href={`/developer/${data?.partnername
                        ?.replace(/\s+/g, "-")
                        .toLowerCase()}`}
                    >
                      <Image
                        src={getPartenerUrl(data.image)}
                        alt={data.partnername.replace(/\s+/g, " ")}
                        className="w-fit h-fit opacity-80 hover:opacity-100 m-auto"
                        width={80}
                        height={80}
                        quality={60}
                        priority={index < 6}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                        formats={["image/webp"]}
                        style={{
                          objectFit: "contain",
                          display: "block",
                          height: "100%",
                        }}
                      />
                      <p className="text-[0.01rem]">
                        {data.partnername.replace(/\s+/g, "-")}
                      </p>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <div>
            <Link
              href={"/developer"}
              className="flex items-center gap-4 text-white font-normal text-[0.9rem] mt-1 md:text-[1rem] p-2 w-fit m-auto"
            >
              View More
              <MdOutlineKeyboardDoubleArrowRight
                className="arrow-r-bounce text-[0.9rem] md:text-[1.3rem]"
                aria-label="off-plan project"
              />
            </Link>
          </div>

          <span className="bg-gradient-to-l from-[#040406] from-10% to-transparent absolute right-0 top-0  h-full w-[150px] z-20"></span>
        </div>
      </div>
    </div>
  );
};

export default PartnerSection;
