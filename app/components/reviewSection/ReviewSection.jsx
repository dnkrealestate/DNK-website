"use client";
import React, { useState } from "react";
import avatar from "@/public/assets/icons/google-logo.webp";
import quotes01 from "@/public/assets/icons/quotes01.webp";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import quotes from "@/public/assets/icons/quotes.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import { WWURL } from "@/url/axios";

export default function ReviewSection({ reviewData }) {
  const [expandedMessages, setExpandedMessages] = useState({});
  
  const imageUrl = avatar;
  // const imageUrl = reviewData?.image ? `${WWURL}${reviewData.image}` : avatar;
  
  

    const toggleReadMore = (id) => {
      setExpandedMessages((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
  };
  
  return (
    <div className="w-full bg-[#040406] flex items-center justify-center px-4 xl:px-0">
      <div className="ReviewSection container max-w-[1240px] py-5  px-4  md:py-9">
        <h2 className="m-auto w-fit">What Our Clients Say's</h2>
        <p className="text-center m-auto w-[100%] md:w-[80%]">
          We would love to learn what our satisfied clients have to say about
          our services.
        </p>
        <Swiper
          slidesPerView={1}
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          initialSlide={1}
          watchSlidesProgress={true}
          observer={true}
          observeParents={true}
          loop={true}
          autoplay={{ delay: 3500 }}
          speed={1000}
          spaceBetween={3}
        >
          {reviewData.length > 0
            ? reviewData.map((data) => {
              const isExpanded = expandedMessages[data._id];
              const isLongText = data.message.length > 250;
                return (
                  <SwiperSlide key={data._id}>
                    <div className="p-4">
                      <div className="mx-auto w-[50px] h-[50px] md:w-[70px] md:h-[70px] mt-5 mb-3">
                        <Image
                          src={imageUrl}
                          alt="Google logo, Top real estate companies in dubai, River side living"
                          className="rounded-full"
                          width={80}
                          height={80}
                          quality={75}
                        />
                      </div>
                      <div className="relative">
                        <div className="w-[40px] h-[40px] absolute left-7 top-0 animate-wiggle animate-once z-0 opacity-25 md:opacity-100">
                          <Image
                            src={quotes}
                            alt="Dubai hills villas for sale, Real estate inverstment"
                            className=""
                            width={20}
                            height={20}
                            quality={75}
                          />
                        </div>

                        <p
                          className={`text-center m-auto w-[100%] md:w-[80%] mb-0 relative z-40  ${
                            !isExpanded ? "line-clamp-3" : ""
                          }`}
                        >
                          {data.message}
                        </p>
                        {isLongText && (
                          <p
                            onClick={() => toggleReadMore(data._id)}
                            className="text-center text-blue-400 cursor-pointer mb-0"
                          >
                            {isExpanded ? "Read less" : "Read more"}
                          </p>
                        )}

                        <div className="w-[40px] h-[40px] absolute right-7 bottom-0 animate-wiggle z-0 opacity-25 md:opacity-100">
                          <Image
                            src={quotes01}
                            alt="3 bedroom villa for sale in dubai, Dubai Downtown, Dubai South"
                            className=""
                            width={80}
                            height={80}
                            quality={75}
                          />
                        </div>
                      </div>

                      <div className="relative m-auto w-[270px] mt-4">
                        <span className="h-[0.1rem] w-[270px] bg-white m-auto rounded absolute"></span>
                      </div>

                      <p className="m-auto text-white text-[1rem] w-fit pt-4">
                        {data.name}
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })
            : 
                  <div className="p-1">
                    <div className="relative animate-pulse h-[200px]">
                      <div className="mx-auto w-[50px] h-[50px] md:w-[70px] md:h-[70px] mt-5 mb-3 bg-gray-600 rounded-full"></div>
                      <div className="pl-2">
                        <div className="m-auto h-6 bg-gray-500 rounded w-3/4 mb-2"></div>
                        <div className="m-auto h-4 bg-gray-500 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
              }
          {/* Custom Navigation Buttons */}
          <div className="custom-prev">
            <IoIosArrowDropleftCircle />
          </div>
          <div className="custom-next">
            <IoIosArrowDroprightCircle />
          </div>
        </Swiper>
      </div>
    </div>
  );
}
