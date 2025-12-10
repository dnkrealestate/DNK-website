"use client";
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { WWURL } from "@/url/axios";
import Link from "next/link";
import ModelProject from "./ModelProject";

export default function StickyConnect({ projectId, teamData }) {
  const [ShowPopup, setShowPopup] = useState(false);

  const imageUrl = `${WWURL}${teamData?.[0]?.image}`;
  return (
    <div>
      <div className="border border-[#ffffff] border-spacing-1 rounded-md p-3">
        <div className="flex text-center">
          <Image
            className="h-[60px] w-[60px] sm:h-[95px] sm:w-[95px] border rounded"
            src={imageUrl}
            alt={`Top real estate agent`}
            quality={90}
            width={80}
            height={80}
            style={{
              objectFit: "cover",
              objectPosition: "top",
            }}
          />

          <div className="pl-2">
            <h2 className="m-0 text-[#ffffff] text-left text-[0.9rem] sm:text-[1rem] font-semibold">
              {teamData?.[0]?.name}
            </h2>
            <p className="text-[0.89rem] text-left">
              {teamData?.[0]?.position}
            </p>
          </div>
        </div>

        <div className="flex items-center pt-3">
          <a
            href="tel:+971543049309"
            className="site-sub-btn w-full mr-1 text-center"
          >
            Call
          </a>
          <button
            onClick={() => setShowPopup(true)}
            className="site-sub-btn w-full ml-1"
          >
            Inquiry
          </button>
        </div>
        <div className="flex items-center justify-center mt-2">
          <p className="mb-0 text-[0.8rem] lg:text-[1rem]">
            Or get availability via
          </p>
          <Link
            href={`https://wa.me/+971543049309?text=Hello,%20Share%20more%20details%20${projectId.projectname}`}
            className="flex items-center justify-center group"
          >
            <FaWhatsapp className="text-[#CE8745] ml-2 group-hover:text-[#6B9B2D] text-[1rem] lg:text-[1.3rem]" />
            <p className="mb-0 text-[#CE8745] group-hover:text-[#6B9B2D] text-[0.8rem] lg:text-[1rem]">
              WhatsApp
            </p>
          </Link>
        </div>
      </div>
      <div className="rounded-full bg-[#fff] mt-3">
        <h4 className="text-[#000] m-auto w-fit font-semibold">
          Direct Sales & 0% Commission
        </h4>
      </div>
      <div className="border border-[#ffffff] border-spacing-1 rounded-md p-3 mt-3">
        <h6 className="text-[#ffffff] text-left text-[0.9rem] sm:text-[1.1rem] font-medium border-b-[#ffffff] border-b pb-2 mb-3">
          Quick Facts
        </h6>
        <p className="mb-0 text-[0.8rem] lg:text-[1rem]">
          <span className="text-[#ffffff] font-medium pr-2">Project:</span>
          {projectId.projectname}
        </p>
        <p className="mb-0 text-[0.8rem] lg:text-[1rem]">
          <span className="text-[#ffffff] font-medium pr-2">Developer:</span>
          {projectId.developer.replace(/-/g, " ")}
        </p>
        <p className="mb-0 text-[0.8rem] lg:text-[1rem]">
          <span className="text-[#ffffff] font-medium pr-2">Location:</span>
          {projectId.locationname}
        </p>
        <p className="mb-0 text-[0.8rem] lg:text-[1rem]">
          <span className="text-[#ffffff] font-medium pr-2">Bedroom:</span>
          {projectId.bedroom}
        </p>
        <p className="mb-0 text-[0.8rem] lg:text-[1rem] capitalize">
          <span className="text-[#ffffff] font-medium pr-2">Type:</span>
          {Object.keys(projectId)
            .filter((key) => key.startsWith("type") && projectId[key]) // Filter keys that start with 'type'
            .map((key, index, array) => (
              <React.Fragment key={index}>
                {projectId[key]}
                {array.length > 1 &&
                  (index < array.length - 2
                    ? ", "
                    : index === array.length - 2
                    ? " & "
                    : "")}
              </React.Fragment>
            ))}
        </p>
        <p className="mb-0 text-[0.8rem] lg:text-[1rem]">
          <span className="text-[#ffffff] font-medium pr-2">
            Handover date:
          </span>
          {projectId.handover}
        </p>
        <p className="mb-0 text-[0.8rem] lg:text-[1rem]">
          <span className="text-[#ffffff] font-medium pr-2">Total Area:</span>
          {projectId.totalarea}
        </p>
        <p className="mb-0 text-[0.8rem] lg:text-[1rem]">
          <span className="text-[#ffffff] font-medium pr-2">
            Starting Price:
          </span>
          {projectId.startingprice}
        </p>
      </div>
      <div>
        {ShowPopup && (
          <ModelProject
            projectId={projectId}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    </div>
  );
}
