"use client";
import React, { lazy, useEffect, useState } from "react";
import partnerLogo from "@/public/assets/icons/addlogo.webp";
import Image from "next/image";
import { WWURL } from "@/url/axios";
import Link from "next/link";

export default function  DeveloperList ({ partnerData }) {
    const [logo, setLogo] = useState([]);
    const [loading, setLoading] = useState(true);

    const generateSlug = (name) => name.replace(/\s+/g, "-").toLowerCase();

  useEffect(() => {
    if (partnerData?.length > 0) {
      setLogo(partnerData);
      setLoading(false);
    }
  }, [partnerData]);
    
      const getPartenerUrl = (image) =>
        image ? `${WWURL}${image}` : partnerLogo;

    return (
      <>
        {loading && (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 p-4">
            <div className="">
              <div className="relative w-full rounded-[10px] shadow bg-gray-800 animate-pulse">
                <div className="h-[130px] md:h-[200px] bg-gray-600 rounded"></div>
              </div>
            </div>
            <div className="">
              <div className="relative w-full rounded-[10px] shadow bg-gray-800 animate-pulse">
                <div className="h-[130px] md:h-[200px] bg-gray-600 rounded"></div>
              </div>
            </div>
            <div className="">
              <div className="relative w-full rounded-[10px] shadow bg-gray-800 animate-pulse">
                <div className="h-[130px] md:h-[200px] bg-gray-600 rounded"></div>
              </div>
            </div>
            <div className="md:block hidden">
              <div className="relative w-full rounded-[10px] shadow bg-gray-800 animate-pulse">
                <div className="h-[130px] md:h-[200px] bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 p-4">
                {logo.map((item, index) => {
                    const slug = generateSlug(item.partnername);
                    return (
                      <Link
                        key={item._id}
                        href={`/developer/${slug}`}
                        className="bg-[#fff] rounded-lg md:rounded-xl p-3 md:p-6 flex items-center justify-center"
                      >
                        <div className="w-fit h-[30px] md:h-[50px] flex items-center justify-center relative">
                          <div className="relative w-[80px] h-[50px]">
                            <Image
                              src={getPartenerUrl(item.image)}
                              alt={item.partnername.replace(/\s+/g, " ")}
                              fill
                              quality={100}
                              style={{
                                objectFit: "contain",
                                filter: "invert(1)",
                              }}
                              priority
                            />
                          </div>
                        </div>
                      </Link>
                    );  
                })}
        </div>
      </>
    );
};
