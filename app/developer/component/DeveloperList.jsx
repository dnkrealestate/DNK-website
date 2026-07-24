"use client";
import React from "react";
import partnerLogo from "@/public/assets/icons/addlogo.webp";
import Image from "next/image";
import { WWURL } from "@/url/axios";
import Link from "next/link";

export default function  DeveloperList ({ partnerData }) {
    const logo = partnerData || [];

    const generateSlug = (name) => name.replace(/\s+/g, "-").toLowerCase();

      const getPartenerUrl = (image) =>
        image ? `${WWURL}${image}` : partnerLogo;

    return (
      <>
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
                              quality={80}
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
