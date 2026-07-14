"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useParams } from "next/navigation";
import FormRoadshow from "./FormRoadshow";
import { userRoadshowServices } from "@/services/roadshowService";
import BackgroundImg from "@/public/assets/banner-img/full-bg.webp";
import dnkLogo from "@/public/assets/logo/dnklogo_1.webp";
import Image from "next/image";
import { MdLocationOn } from "react-icons/md";

export default function ClientsideLinkPort() {
  const params = useParams();
  const slug = params?.slug;

  const [RoadshowLink, setRoadshowLinkData] = useState(null);
  const { getRoadshowLinkById } = userRoadshowServices();

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

  if (!RoadshowLink) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0E14]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <meta name="robots" content="noindex" />
        <title>{`Client Registration ${RoadshowLink.place}`}</title>
        <meta name="description" content="Attendance" />
      </Head>

      <div className="relative min-h-screen w-full py-10 sm:py-14">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={BackgroundImg}
            alt="Roadshow Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4">
          <div className="w-full max-w-[640px]">
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="relative h-12 w-[130px]">
                <Image src={dnkLogo} alt="DNK Logo" fill style={{ objectFit: "contain" }} />
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm">
                <MdLocationOn className="text-[#CE8745]" />
                {RoadshowLink.place}
              </div>
              <h1 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                We&apos;re Coming to Your City!
              </h1>
              <p className="mt-2 max-w-md text-sm text-white/60">
                {[RoadshowLink.date, RoadshowLink.date2].filter(Boolean).join(" - ")}
                {RoadshowLink.hotelName ? ` | ${RoadshowLink.hotelName}` : ""}. Fill in your
                details below to book your slot now.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-xl sm:p-8">
              <FormRoadshow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
