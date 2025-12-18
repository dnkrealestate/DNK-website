"use client";

import React, { useEffect, useState } from "react";
import Newsimgic from "@/public/assets/icons/image_demo.webp";
import { TbPointFilled } from "react-icons/tb";
import Link from "next/link";
import { WWURL } from "@/url/axios";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function NewsList({ mainNews, SliderNews }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ⛔ Prevent SSR + hydration mismatch
  if (!mounted) return null;

  const generateSlug = (name) =>
    name ? name.replace(/\s+/g, "-").toLowerCase() : "";

  const slug =
    mainNews && mainNews.newsurl ? generateSlug(mainNews.newsurl) : "";

  return (
    <div className="w-full bg-[#040406] flex items-center justify-center">
      <div className="container max-w-[1240px] py-5 px-4 md:py-9 relative">
        <div className="w-fit pb-4 flex items-start">
          <h2 className="mb-0">DNK News Today</h2>
          <div className="relative">
            <TbPointFilled className="text-[1.6rem] text-[#FF0000] m-auto" />
            <TbPointFilled className="text-[1.9rem] text-[#FF0000] animate-ping absolute top-[-2px] left-[-2.5px]" />
          </div>
        </div>

        <div className="grid xl:grid-cols-3">
          {/* MAIN NEWS */}
          <div className="xl:col-span-2">
            {mainNews && (
              <Link
                href={`/news/${slug}`}
                className="block md:grid grid-cols-4 mainNewsSection"
              >
                <div className="relative">
                  <Image
                    className="rounded-md w-full h-[200px] object-cover"
                    src={
                      mainNews?.newsthumbnail
                        ? WWURL + mainNews.newsthumbnail
                        : Newsimgic
                    }
                    alt={mainNews.alt || "Dubai real estate news"}
                    width={400}
                    height={200}
                    priority
                  />
                </div>

                <div className="md:px-3 py-2 flex flex-col justify-between col-span-3">
                  <div>
                    <h3 className="mb-2 font-bold text-white line-clamp-2">
                      {mainNews.newstitle}
                    </h3>

                    <p
                      className="text-gray-400 line-clamp-4"
                      dangerouslySetInnerHTML={{
                        __html: mainNews?.newspara1,
                      }}
                    />
                  </div>

                  <div className="flex gap-1 pt-3 text-gray-400">
                    <p>Published:</p>
                    <p>{mainNews.published}</p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* SLIDER NEWS */}
          <div className="hidden xl:block">
            <Swiper
              slidesPerView={3}
              loop
              spaceBetween={5}
              direction="vertical"
              autoplay={{ delay: 3000 }}
              speed={1000}
              centeredSlides
              modules={[Autoplay]}
              className="!h-[200px]"
            >
              {Array.isArray(SliderNews) &&
                SliderNews.slice(0, 6).map((data) => {
                  const slideSlug = generateSlug(data.newsurl);
                  return (
                    <SwiperSlide key={data._id}>
                      <Link href={`/news/${slideSlug}`}>
                        <div className="grid grid-cols-5 py-1 border-b border-[#979797]">
                          <div className="w-[70px] h-[50px] relative">
                            <Image
                              src={
                                data?.newsthumbnail
                                  ? WWURL + data.newsthumbnail
                                  : Newsimgic
                              }
                              alt={data.alt || "News"}
                              fill
                              className="object-cover rounded-sm"
                            />
                          </div>
                          <div className="col-span-4">
                            <h3 className="text-white text-sm font-semibold line-clamp-2">
                              {data.newstitle}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
