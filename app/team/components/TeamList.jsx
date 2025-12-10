"use client";
import React from "react";
import userIcon from "@/public/assets/icons/usericon.webp";
import Image from "next/image";
import { WWURL } from "@/url/axios";
import Link from "next/link";
import Swiper from "swiper";

export default function TeamList({ teamData }) {

  return (
    <div className="w-full bg-[#040406] flex items-center justify-center">
      <div className="container max-w-[1240px] py-5  px-4  md:py-9  relative">
        {/* <h1>Find your agent to find a Dream home</h1> */}
        <div className="grid grid-cols-2  md:grid-cols-4">
          {teamData.length > 0 ? (
            teamData.map((data, index) => {
              const slug = data._id;
              return (
                <div className="p-4" key={data._id}>
                  <Link
                    href={`/team/${slug}`}
                    className="max-w-max bg-[#040406] cursor-pointer team-card"
                  >
                    <Image
                      className="rounded-t-lg w-[70%] xl:w-[100%] md:w-[90%] m-auto"
                      src={data?.image ? WWURL + data.image : userIcon}
                      alt="Real Estate Dubai, Helping Dubai Real Estate, Teaching Real Estate"
                      width={800}
                      height={1034.71}
                      quality={80}
                      priority={index < 10}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                      formats={["image/webp"]}
                      style={{
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                    <div className="text-center pt-1">
                      <h5 className="mb-2 text-[1rem] md:text-2xl font-bold tracking-tight text-white">
                        {data.name}
                      </h5>
                      <p className="m-0 text-[0.6rem] sm:text-[0.8rem] md:text-[1rem] font-normal text-gray-400">
                        {data.position}
                      </p>
                      <p className="m-0 text-[0.6rem] sm:text-[0.8rem] md:text-[1rem] font-normal text-gray-400">
                        {data.language}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : [...Array(3)].map((_, index) => (
              <div key={index}>
                    <div className="p-4">
                      <div className="relative border rounded-[10px] shadow bg-gray-800 animate-pulse">
                        <div className="h-[250px] bg-gray-600 rounded-t-lg"></div>
                        <div className="p-5">
                          <div className="h-6 bg-gray-500 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-500 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
