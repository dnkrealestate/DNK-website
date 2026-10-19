"use client";

import React, { useState } from "react";
import Image from "next/image";
import aboutImg from "@/public/assets/other/damacislandsimg1.webp";
import aboutImg2 from "@/public/assets/other/islands2img2.webp";
import { useRouter } from "next/navigation";
import ADmodel from "./ADmodel";

const ADaboutSection = () => {
  const router = useRouter();
  const [ShowPopup, setShowPopup] = useState(false);

  const goToAboutPage = () => {
    router.push("/about");
  };

  return (
    <div id="about" className="about-section w-full bg-[#000]">
      <div className="container max-w-[1240px] py-6 px-4 m-auto">
        <h1 className="text-[#fff] m-auto w-fit mb-4 mt-3 text-center">
          Damac Islands 2 Your Private Paradise in Dubai
        </h1>
        <p className="text-center w-full md:w-[70%] m-auto text-white">
          Step into a world of luxury, serenity, and resort style living at
          Damac Islands 2, Dubailand’s premier waterfront community.
        </p>

        <div className="flex items-center justify-center">
          <div>
            {/* First Block */}
            <div className="md:py-9 grid md:grid-cols-2 relative">
              <Image
                src={aboutImg}
                alt="Waterfront villa"
                width={500}
                height={300}
                className="w-[80%] md:order-first md:w-[80%] m-auto py-3 md:py-0"
              />
              <div className="text-white">
                <h1 className="w-fit mb-1 mt-3 text-left">
                  World-Class Amenities
                </h1>
                <p>
                  Residents of{" "}
                  <span
                    onClick={() => {
                      track(
                        "Damac Islands2 Landing page to project page visit",
                        {
                          page: "Damac Islands2 Landing page to project page visit",
                        }
                      );
                    }}
                    className="cursor-pointer"
                  >
                    <a
                      href="https://www.dnkre.com/developer/damac-properties"
                      target="_blank"
                      className="text-[#0072B2] hover:underline"
                    >
                      Damac Islands 2
                    </a>
                  </span>{" "}
                  enjoy a wide range of resort-style facilities:
                </p>
                {/* <h2 className="text-left text-[1.4rem]">
                  Exclusive World Class Amenities
                </h2> */}
                <ul className="list-disc list-outside pl-4 text-[#979797]">
                  <li>
                    <p className="m-0">Private beaches and lagoons</p>
                  </li>
                  <li>
                    <p className="m-0">Swimming pools and leisure hubs</p>
                  </li>
                  <li>
                    <p className="m-0">
                      Parks, jogging tracks, and cycling paths
                    </p>
                  </li>
                  <li>
                    <p className="m-0">Retail and dining outlets</p>
                  </li>
                  <li>
                    <p className="m-0">
                      Children’s play areas and community centers
                    </p>
                  </li>
                  <li>
                    <p>24/7 security and gated community</p>
                  </li>
                </ul>
                <h2 className="text-left text-[1.4rem]">
                  Prime Location – Dubailand, Dubai
                </h2>
                <p>
                  Located in Dubailand, Damac Islands 2 offers the perfect
                  balance of serene island living and city connectivity.
                </p>
                <ul className="list-disc list-outside pl-4 text-[#979797]">
                  <li>
                    <p className="m-0">
                      10–15 min to Arabian Ranches & Motor City
                    </p>
                  </li>
                  <li>
                    <p className="m-0">25 min to Downtown Dubai</p>
                  </li>
                  <li>
                    <p className="m-0">30 min to Dubai Marina</p>
                  </li>
                  <li>
                    <p className="m-0">Retail and dining outlets</p>
                  </li>
                  <li>
                    <p className="">
                      Close to Expo 2020 site and major highways
                    </p>
                  </li>
                </ul>
                <p>
                  Dubailand is known for its family-friendly environment,
                  entertainment hubs, and future development potential, making
                  it an ideal destination for both living and investment.
                </p>
                <button
                  onClick={() => setShowPopup(true)}
                  className="site-btn !text-[#fff] hover:!text-[#000] !border-[#fff] hover:!bg-[#fff]"
                >
                  Request callback
                </button>
              </div>
            </div>

            {/* Second Block */}
            <div className="md:py-9 grid md:grid-cols-2 relative">
              <Image
                src={aboutImg2}
                alt="Luxury villa interior"
                className="w-[80%] md:order-last order-first md:w-[80%] m-auto pt-3 md:pt-0 py-3 md:py-0"
              />
              <div className="text-white">
                <h2 className="text-left text-[1.4rem]">
                  Smart Investment Opportunity
                </h2>
                <p>
                  Investing in Damac Islands 2 provides multiple advantages:
                </p>
                <ul className="list-disc list-outside pl-4 text-[#979797]">
                  <li>
                    <p className="m-0">
                      High rental yields due to prime location and luxury
                      lifestyle
                    </p>
                  </li>
                  <li>
                    <p className="m-0">
                      Capital appreciation as Dubailand grows in demand
                    </p>
                  </li>
                  <li>
                    <p className="m-0">100% tax free income for investors</p>
                  </li>
                  <li>
                    <p className="m-0">
                      Flexible payment plans for easier property ownership
                    </p>
                  </li>
                  <li>
                    <p className="">
                      Trusted developer with a track record of delivering
                      quality
                    </p>
                  </li>
                </ul>
                <h2 className="text-left text-[1rem]">
                  Lifestyle Live Like You’re on Vacation Every Day
                </h2>
                <p>
                  Damac Islands 2 offers a lifestyle that combines luxury,
                  nature, and relaxation:
                </p>
                <ul className="list-disc list-outside pl-4 text-[#979797]">
                  <li>
                    <p className="m-0">Waterfront promenades and boardwalks</p>
                  </li>
                  <li>
                    <p className="m-0">Private beaches and lagoon activities</p>
                  </li>
                  <li>
                    <p className="m-0">
                      Family-friendly parks and leisure facilities
                    </p>
                  </li>
                  <li>
                    <p className="m-0">Community events and social hubs</p>
                  </li>
                  <li>
                    <p className="">Wellness and fitness centers</p>
                  </li>
                </ul>
                <button
                  onClick={() => setShowPopup(true)}
                  className="site-btn !text-[#fff] hover:!text-[#000] !border-[#fff] hover:!bg-[#fff]"
                >
                  Request callback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {ShowPopup && <ADmodel onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default ADaboutSection;
