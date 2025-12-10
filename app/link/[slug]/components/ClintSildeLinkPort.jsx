"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useParams } from "next/navigation";
import FormRoadshow from "./FormRoadshow";
import { getPartner } from "@/services/partnerServices";
import { userRoadshowServices } from "@/services/roadshowService";
import PartnerSection from "@/app/components/partner/PartnerSection";
import BackgroundImg from "@/public/assets/banner-img/full-bg.webp"
import Image from "next/image";

export default function ClientsideLinkPort() {
  const params = useParams();
  const slug = params?.slug;

  const [RoadshowLink, setRoadshowLinkData] = useState(null);
  const [partnerData, setPartnerData] = useState([]);
  const { getRoadshowLinkById } = userRoadshowServices();

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

  // Fetch Partner data
  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        const partner = await getPartner();
        if (partner && Array.isArray(partner)) {
          const sortedPartner = partner
            .map((item) => ({ ...item, sortKey: Math.random() }))
            .sort((a, b) => a.sortKey - b.sortKey)
            .slice(0, 12);
          setPartnerData(sortedPartner);
        }
      } catch (error) {
        console.error("Error fetching partner data:", error);
      }
    };

    fetchPartnerData();
  }, []);

  if (!RoadshowLink) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div>
      <Head>
        <meta name="robots" content="noindex" />
        <title>{`Client Registration ${RoadshowLink.place}`}</title>
        <meta name="description" content="Attendance" />
      </Head>

      <div className="relative w-full md:h-screen">
        {/* YouTube Background */}
        <div className="absolute inset-0 z-0 ">
          <div className="w-full h-full origin-center">
            <Image
              src={BackgroundImg}
              alt="Roadshow Background"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

        {/* Content on top of video */}
        <div className="relative z-10 bg-black bg-opacity-60 w-full h-full flex items-center justify-center">
          <div className="container max-w-[1240px] py-4 sm:px-4 md:py-9 relative">
            <div className="w-full md:w-[70%] sm:w-[90%] m-auto">
              <div className="bg-gray-700 rounded-2xl  py-10 px-3 sm:px-6 md:mt-4 m-4 relative z-20">
                <h3 className="text-white text-[1.5rem] font-semibold mb-4 text-center">
                  {`${RoadshowLink.place} Registration Form`}
                </h3>
                <FormRoadshow />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <PartnerSection partnerData={partnerData}  /> */}
    </div>
  );
}