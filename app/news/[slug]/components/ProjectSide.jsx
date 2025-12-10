"use client";
import { WWURL } from "@/url/axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdLocationPin } from "react-icons/md";

export default function ProjectSide({ projects }) {
  const generateSlug = (name) =>
    name ? name.replace(/\s+/g, "-").toLowerCase() : "";

  return (
    <>
      {projects.length > 0
        ? projects.slice(0, 10).map((data, index) => {
            const slug = generateSlug(data.projectname);
            return (
              <div key={data.projectname}>
                <Link href={`/projects/${slug}`}>
                  <div className="md:grid grid-cols-4 overflow-hidden flex  border border-[#ffff] rounded-md shadow bg-[#040406] cursor-pointer mb-4">
                    <div className="relative">
                      {data.thumbnail ? (
                        <Image
                          className="max-w-full h-auto w-full"
                          src={`${WWURL}${data.thumbnail}`}
                          alt={data.alt || "Dubai Real Estate News"}
                          width={400}
                          height={400}
                          priority
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

                    <div className="px-3 py-1 col-span-3">
                      <h2 className="mb-0 text-[1rem] font-semibold tracking-tight text-white line-clamp-1">
                        {data.projectname}
                      </h2>
                      <p className="m-0 font-normal text-gray-400 line-clamp-1 text-[0.8rem]">
                        {data.developer.replace(/-/g, " ")}
                      </p>
                      {data?.locationname && (
                        <div className="flex items-center">
                          <MdLocationPin className="text-gray-400 text-[0.8rem]" />
                          <p className="m-0 font-normal text-gray-400 line-clamp-1 text-[0.8rem]">
                            {data.locationname}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        : [...Array(1)].map((index) => (
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
    </>
  );
}
