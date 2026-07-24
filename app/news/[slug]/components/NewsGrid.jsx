"use client";
import React from "react";
import { WWURL } from "@/url/axios";
import Image from "next/image";
import Link from "next/link";
import { MdDateRange } from "react-icons/md";

export default function NewsGrid({ newsList }) {
  const generateSlug = (name) =>
    name ? name.replace(/\s+/g, "-").toLowerCase() : "";
  return (
    <div className="mb-5">
      <div className="hidden md:block">
        {newsList.length > 0
          ? newsList.slice(0, 10).map((data) => {
              const slug = generateSlug(data.newsurl);
              return (
                <div key={data.newsurl}>
                  <Link href={`/news/${slug}`} onClick={() => {
                            if (typeof window !== "undefined" && window.snaptr) {
                              window.snaptr("track", "NEWS_CLICK");
                            }
                          }}>
                    <div className="flex flex-col overflow-hidden border border-[#ffff] rounded-md shadow bg-[#040406] cursor-pointer mb-4">
                      <div className="relative h-[160px] w-full">
                        {data.newsthumbnail ? (
                          <Image
                            src={`${WWURL}${data.newsthumbnail}`}
                            alt={data.alt || "Dubai Real Estate News"}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            loading="lazy"
                            quality={80}
                            style={{
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-600 animate-pulse"></div>
                        )}
                      </div>
                      <div className="px-3 py-2">
                        <h2 className="mb-0 text-[1rem] font-semibold tracking-tight text-white line-clamp-1">
                          {data.newstitle}
                        </h2>
                        {data.newspara1 ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data?.newspara1,
                            }}
                            className="ph m-0 font-normal text-gray-400 line-clamp-3 !text-[0.8rem]"
                          ></div>
                        ) : null}
                        {data?.published && (
                          <div className="flex items-center">
                            <MdDateRange className="text-gray-400 text-[0.8rem]" />
                            <p className="m-0 pl-1 font-normal text-gray-400 line-clamp-1 text-[0.8rem]">
                              {data.published}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          : [...Array(3)].map((index) => (
              <div key={`slide-${index}`}>
                <div className="p-4">
                  <div className="relative  rounded-[10px] shadow bg-gray-800 animate-pulse">
                    <div className="p-5">
                      <div className="h-6 bg-gray-500 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-500 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        <Link
          href="/news"
          className="rounded-sm px-[6rem] py-2 w-full text-[#000] hover:text-[#000] bg-[#CFA028] hover:bg-[#fff] "
        >
          View All
        </Link>
      </div>
    </div>
  );
}
