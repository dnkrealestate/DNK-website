"use client";

import React, { Suspense, useEffect, useState } from "react";
import Head from "next/head";
import { useParams } from "next/navigation";
import { userRoadshowServices } from "@/services/roadshowService";
import RegisterData from "./RegisterData";
import EventAttendData from "./EventAttendData";
import BackgroundImg from "@/public/assets/banner-img/full-bg.webp";
import Image from "next/image";

export default function RoadshowResult() {
  const params = useParams();
  const slug = params?.slug;

  const [roadshowLink, setRoadshowLinkData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // loading flag

  const { getRoadshowLinkById, getRoadshowRegister } = userRoadshowServices();

  // Safe slug handling
  const paramValue =
    params?.slug || params?.eventplace || params?.city || null;

  const slugValue = Array.isArray(paramValue)
    ? paramValue.join(" ")
    : paramValue;

  // ✅ Normalization function
  const normalize = (value) =>
    value
      ? value
          .toString()
          .toLowerCase()
          .replace(/-/g, " ")
          .replace(/\u00a0/g, " ")
          .replace(/[^a-z0-9 ]/g, "")
          .replace(/\s+/g, " ")
          .trim()
      : "";

  // Fetch Roadshow link
  useEffect(() => {
    const fetchRoadshowLinkData = async () => {
      try {
        const response = await getRoadshowLinkById(slug);
        if (response.success && response.data) {
          setRoadshowLinkData(response.data);
        }
      } catch (error) {
        console.error("Error fetching roadshow link data:", error);
      }
    };

    if (slug) fetchRoadshowLinkData();
  }, [slug]);

  // Fetch Registered Data
  useEffect(() => {
    let intervalId;
    let firstFetch = true;

    const fetchData = async () => {
      try {
        const response = await getRoadshowRegister(slug);
        if (response.success && Array.isArray(response.data)) {
          // ✅ Sort by updatedAt
          const sorted = response.data.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );

          // ✅ Filter safely using normalize
          const filtered = slugValue
            ? sorted.filter((item) =>
                normalize(item?.eventplace).includes(normalize(slugValue))
              )
            : sorted;

          console.log(
            "MATCH CHECK:",
            filtered.map((i) => i.eventplace)
          );

          setFilteredData(filtered);
        }
      } catch (error) {
        console.error("Error fetching roadshow register data:", error);
      } finally {
        if (firstFetch) {
          setIsLoading(false);
          firstFetch = false;
        }
      }
    };

    if (slug) {
      fetchData();
      intervalId = setInterval(fetchData, 10000);
    }

    return () => clearInterval(intervalId);
  }, [slug, slugValue]);

  if (!roadshowLink) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  const hasFilteredData = filteredData.length > 0;

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Head>
        <meta name="robots" content="noindex" />
        <title>{`Result ${roadshowLink.place}`}</title>
        <meta name="description" content="Attendance" />
      </Head>
      <div className="relative h-full w-full">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={BackgroundImg}
            alt="Roadshow Background"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

        {/* Everything below fits within one screen — no page scrolling, ever */}
        <div className="relative z-10 flex h-full w-full flex-col bg-black bg-opacity-60 px-4 py-3 sm:px-6 sm:py-4">
          <div className="mb-3 flex shrink-0 flex-col items-center gap-1.5 text-center">
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#18A4A0] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#18A4A0]" />
              </span>
              Live
            </span>
            <h3 className="text-white text-[1.25rem] font-semibold sm:text-[1.5rem]">
              {`${roadshowLink.place} Roadshow Insights`}
            </h3>
          </div>

          {isLoading ? (
            <div className="flex flex-1 items-center justify-center text-white/60">
              Loading data...
            </div>
          ) : hasFilteredData ? (
            <div className="grid min-h-0 w-full flex-1 grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <Suspense fallback={<div className="text-white/60">Loading...</div>}>
                <RegisterData filteredData={filteredData} />
                <EventAttendData filteredData={filteredData} />
              </Suspense>
            </div>
          ) : (
            <div className="min-h-0 w-full flex-1">
              <Suspense fallback={<div className="text-white/60">Loading...</div>}>
                <RegisterData filteredData={[]} />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
