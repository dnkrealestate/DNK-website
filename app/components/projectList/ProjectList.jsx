"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { URL, WWURL } from "@/url/axios";
import Link from "next/link";
import Image from "next/image";
import DemoImage from "@/public/assets/icons/image_demo.webp";

export default function ProjectList({ projects }) {

  const generateSlug = (name) => name.replace(/\s+/g, "-").toLowerCase();
  const offPlan = `/off-plan-project`;

  return (
    <div className="w-full bg-[#040406] flex items-center justify-center px-4 xl:px-0">
      <div className="featureProject container max-w-[1240px] py-5 px-4 md:py-9">
        <div className="flex flex-col md:flex-row">
          <div className="basis-4/5">
            <h2 className="text-white">Discover Featured Off-Plan Projects</h2>
            <div className="flex items-end justify-start mb-2">
              <h3 className="load-text m-0 text-white">In Dubai</h3>
              <span className="loadDot dot1"></span>
              <span className="loadDot dot2"></span>
              <span className="loadDot dot2"></span>
            </div>
          </div>
          <div className="basis-1/5">
            <Link
              href={offPlan}
              className="flex items-center gap-4 text-white font-normal text-[0.9rem] mt-4 md:text-[1rem] p-2"
            >
              View More
              <MdOutlineKeyboardDoubleArrowRight
                className="arrow-r-bounce text-[0.9rem] md:text-[1.3rem]"
                aria-label="off-plan project"
              />
            </Link>
          </div>
        </div>

          <Swiper
            slidesPerView={3}
            modules={[Navigation]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            initialSlide={0}
            watchSlidesProgress={true}
            observer={true}
            observeParents={true}
            loop={true}
            spaceBetween={4}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              480: { slidesPerView: 1.5 },
              640: {
                slidesPerView: 2,
              },
              768: { slidesPerView: 2.5 },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {projects.length > 0
              ? projects.slice(0, 6).map((data, index) => {
                  const slug = generateSlug(data.projectname);
                  return (
                    <SwiperSlide key={data._id}>
                      <div className="p-4 overflow-hidden">
                        <Link href={`/projects/${slug}`}>
                          <div className="relative max-w-[350px] overflow-hidden border rounded-[10px] shadow bg-[#040406] cursor-pointer">
                            <div className="relative w-full h-[266px]">
                              <Image
                                src={
                                  data.thumbnail
                                    ? WWURL + data.thumbnail
                                    : DemoImage
                                }
                                onError={(e) => (e.target.src = DemoImage)}
                                alt={
                                  data.projectname
                                    ? `${data.projectname} in Dubai by ${data.developer}`
                                    : "Project in Dubai"
                                }
                                fill
                                priority={index < 6} 
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                                quality={75}
                                formats={["image/webp"]}
                                style={{
                                  objectFit: "cover",
                                  display: "block",
                                }}
                              />
                              {data.runingstatus === "newlaunch" && (
                                <div className="card-status-tag  bg-[#B30000] text-[#ffffff] rotate-[-40deg] w-fit px-9 absolute top-8 left-[-35px]">
                                  <h2 className="text-[0.8rem] font-normal m-0 px-1 py-1">
                                    New Launch
                                  </h2>
                                </div>
                              )}

                              {data.runingstatus === "soldout" && (
                                <div className="card-status-tag bg-[#FF9900] text-[#000000] rotate-[-40deg] w-fit px-12 absolute top-8 left-[-35px]">
                                  <h2 className="text-[0.8rem] font-normal m-0 px-1 py-1">
                                    SOLD OUT
                                  </h2>
                                </div>
                              )}
                              <div className="bg-[#0000006b] backdrop-blur-sm border border-[#fff] rounded-full w-fit px-5 py-0 absolute top-2 right-2">
                                <h2 className="line-clamp-1 text-[#fff] text-[0.8rem] font-normal m-0 py-1">
                                  Under Construction
                                </h2>
                              </div>
                              {data.startingprice && (
                                <div className="bg-[#FFC700] border border-[#fff] rounded-l-full rounded-r-none w-fit px-5 py-0 absolute bottom-[-10px] right-0">
                                  <h2 className="line-clamp-1 text-[0.8rem] font-normal m-0 px-1 py-1 text-[#000]">
                                    Starting From: {data.startingprice}
                                  </h2>
                                </div>
                              )}
                            </div>
                            <div className="p-5">
                              <h2 className="mb-2 text-2xl font-bold tracking-tight text-white line-clamp-1">
                                {data.projectname}
                              </h2>
                              <p className="m-0 font-normal text-gray-400 line-clamp-1">
                                {data.developer.replace(/-/g, " ")}
                              </p>
                              {data?.locationname && (
                                <div className="flex items-center">
                                  <MdLocationPin
                                    className="text-gray-400 text-[1rem]"
                                    aria-label="location"
                                  />
                                  <p className="m-0 font-normal text-gray-400 line-clamp-1">
                                    {data.locationname}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  );
                })
              : [...Array(3)].map((_, index) => (
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
    </div>
  );
}
