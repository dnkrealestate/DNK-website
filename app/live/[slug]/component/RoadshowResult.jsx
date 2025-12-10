"use client";

import React, { Suspense, useEffect, useState } from "react";
import Head from "next/head";
import { useParams } from "next/navigation";
import { userRoadshowServices } from "@/services/roadshowService";
import RegisterData from "./RegisterData";
import EventAttendData from "./EventAttendData";
import BackgroundImg from "@/public/assets/banner-img/full-bg.webp"
import Image from "next/image";

export default function RoadshowResult() {
  const params = useParams();
  const slug = params?.slug;

  const [roadshowLink, setRoadshowLinkData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // loading flag

  const { getRoadshowLinkById, getRoadshowRegister } = userRoadshowServices();

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
  // Define a flag to track first fetch only
  useEffect(() => {
    let intervalId;
    let firstFetch = true;

    const fetchData = async () => {
      try {
        const response = await getRoadshowRegister(slug);
        if (response.success && Array.isArray(response.data)) {
          const filtered = response.data.filter(
            (item) =>
              item?.eventplace?.trim().toLowerCase() ===
              slug?.trim().toLowerCase()
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
  }, [slug]);

  if (!roadshowLink) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  const hasFilteredData = filteredData.length > 0;

  return (
    <div>
      <Head>
        <meta name="robots" content="noindex" />
        <title>{`Result ${roadshowLink.place}`}</title>
        <meta name="description" content="Attendance" />
      </Head>
      <div className="relative w-full md:h-screen">
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

        {/* Content on top of video */}
        <div className="relative z-10 bg-black bg-opacity-60 w-full h-full flex items-center justify-center">
          <div className="container max-w-[1240px] py-5 sm:px-4 md:py-9 relative">
            <div className="py-5 sm:px-4 md:py-9 relative">
              <h3 className="text-white text-[1.5rem] font-semibold mb-4 text-center">
                {`${roadshowLink.place} Roadshow Insights`}
              </h3>

              {isLoading ? (
                <div className="text-white text-center">Loading data...</div>
              ) : hasFilteredData ? (
                // Show grid when filtered data is available
                <div className="w-full relative grid md:grid-cols-2 gap-4">
                  <Suspense fallback={<div>Loading...</div>}>
                    <EventAttendData />
                    <RegisterData />
                  </Suspense>
                </div>
              ) : (
                // Show single RegisterData when no data is found
                <Suspense fallback={<div>Loading...</div>}>
                  <RegisterData />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
