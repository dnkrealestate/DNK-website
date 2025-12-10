"use client";
import React from "react";
import Newsimgic from "@/public/assets/icons/image_demo.webp";
import { TbPointFilled } from "react-icons/tb";
import Link from "next/link";
import { URL, WWURL } from "@/url/axios";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function NewsList({ props, mainNews, SliderNews }) {

  const generateSlug = (name) =>
    name ? name.replace(/\s+/g, "-").toLowerCase() : "";

  // Ensure `mainNews` exists before generating the slug
  const slug =
    mainNews && mainNews.newsurl ? generateSlug(mainNews.newsurl) : "";

  return (
    <div className="w-full bg-[#040406] flex items-center justify-center">
      <div className="container max-w-[1240px] py-5  px-4  md:py-9 relative">
        <div className="w-fit pb-4 flex items-start">
          <h2 className="mb-0">DNK News Today</h2>
          <div className="relative">
            <TbPointFilled className="text-[1.6rem] text-[#FF0000] m-auto" />
            <TbPointFilled className="text-[1.9rem] text-[#FF0000] animate-ping absolute top-[-2px] left-[-2.5px]" />
          </div>
        </div>
        <div className="grid  xl:grid-cols-3">
          <div className="xl:col-span-2">
            {mainNews ? (
              <Link
                href={`/news/${slug}`}
                className="block md:grid grid-cols-4 mainNewsSection"
              >
                <div style={{ position: "relative" }}>
                  <Image
                    className="rounded-md w-full h-[200px] md:h-[200px] relative col-span-1"
                    src={
                      mainNews?.newsthumbnail
                        ? WWURL + mainNews.newsthumbnail
                        : Newsimgic
                    }
                    onError={(e) => (e.target.src = Newsimgic)}
                    alt={`${mainNews.alt}, Dubai News, Real estate News, latest news`}
                    width={400}
                    height={400}
                    quality={75}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    formats={["image/webp"]}
                    style={{
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                <div className="md:px-3 py-2 pt-0 flex flex-col justify-between col-span-3">
                  <div>
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-white line-clamp-2">
                      {mainNews.newstitle}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: mainNews?.newspara1,
                      }}
                      className="m-0 font-normal text-gray-400 line-clamp-4"
                    ></div>
                  </div>

                  <div className="flex gap-1">
                    <p className="m-0 font-normal text-gray-400 line-clamp-4 pt-3">
                      Published:
                    </p>
                    <p className="m-0 font-normal text-gray-400 line-clamp-4 pt-3">
                      {mainNews.published}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="p-1">
                <div className="relative grid grid-cols-4 animate-pulse h-[200px]">
                  <div className="h-[190px] bg-gray-600 rounded"></div>
                  <div className="pl-2 flex flex-col justify-between col-span-3">
                    <div>
                      <div className="h-6 bg-gray-500 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-500 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-500 rounded w-3/4"></div>
                    </div>
                    <div className="h-4 bg-gray-500 rounded w-1/2 mb-2"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="hidden xl:block">
            <Swiper
              slidesPerView={3}
              initialSlide={0}
              loop={true}
              spaceBetween={5}
              direction="vertical"
              autoplay={{ delay: 3000 }}
              speed={1000}
              centeredSlides={true}
              watchSlidesProgress={true}
              modules={[Autoplay]}
              className="!h-[200px]"
            >
              {Array.isArray(SliderNews) && SliderNews.length > 0
                ? SliderNews.slice(0, 6).map((data) => {
                    const slug = generateSlug(data.newsurl);
                    return (
                      <SwiperSlide key={data._id}>
                        <div>
                          <Link href={`/news/${slug}`}>
                            <div className="grid grid-cols-5 py-1 border border-x-0 border-t-0 border-[#979797]">
                              <div className="w-[70px] h-[50px] relative">
                                <Image
                                  className="rounded-sm object-cover"
                                  src={
                                    data?.newsthumbnail
                                      ? WWURL + data.newsthumbnail
                                      : Newsimgic
                                  }
                                  alt={`${data.alt}, Dubai News, Real estate News, latest news`}
                                  fill
                                  loading="lazy"
                                  quality={75}
                                />
                              </div>
                              <div className="col-span-4">
                                <h2 className="text-[1rem] font-semibold tracking-tight text-white line-clamp-2 mb-0">
                                  {data.newstitle}
                                </h2>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </SwiperSlide>
                    );
                  })
                : [...Array(3)].map((_, index) => (
                    <SwiperSlide key={index}>
                      <div className="p-1">
                        <div className="relative grid grid-cols-4 border border-x-0 border-t-0 border-[#979797] animate-pulse h-[200px]">
                          <div className="h-[40px] bg-gray-600 rounded"></div>
                          <div className="pl-2 col-span-3">
                            <div className="h-6 bg-gray-500 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-500 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};
