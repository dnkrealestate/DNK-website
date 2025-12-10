"use client";

import React, { useState } from "react";
import Image from "next/image";
import aboutImg from "@/public/assets/pojects/addressVilla/gallary01.webp";
import aboutImg2 from "@/public/assets/pojects/addressVilla/gallary02.webp";
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
          Why Choose Address Villas at The Oasis?
        </h1>
        <p className="text-center w-full md:w-[70%] m-auto text-white">
          Address Villas redefine <strong>high-end living</strong> with
          sophisticated architecture, premium interiors, and expansive layouts
          ranging from <strong>7,269 to 12,777 sq. ft</strong>.
        </p>

        <div className="flex items-center justify-center">
          <div>
            {/* First Block */}
            <div className="md:py-9 grid md:grid-cols-2 relative">
              <Image
                src={aboutImg}
                alt="Waterfront villa"
                className="w-[80%] md:order-first md:w-[80%] m-auto py-3 md:py-0"
              />
              <div className="text-white">
                <h1 className="w-fit mb-1 mt-3 text-left">
                  Prime Waterfront Location
                </h1>
                <p>
                  Enjoy stunning <strong>lagoon and waterfront views</strong> in
                  a <strong>peaceful, nature inspired community</strong>,
                  providing the perfect escape from city life while keeping you
                  close to Dubai’s major attractions.
                </p>
                <h2 className="text-left text-[1.4rem]">
                  Exclusive World Class Amenities
                </h2>
                <ul className="list-disc list-outside pl-4 text-[#979797]">
                  <li>
                    <p className="m-0">
                      <strong>Private Pools</strong> for relaxation
                    </p>
                  </li>
                  <li>
                    <p className="m-0">
                      <strong>Lush Green Parks & Gardens</strong> for a
                      refreshing environment
                    </p>
                  </li>
                  <li>
                    <p className="m-0">
                      <strong>Modern Fitness Centers</strong> for a healthy
                      lifestyle
                    </p>
                  </li>
                  <li>
                    <p className="m-0">
                      <strong>Kids’ Play Areas</strong> for family-friendly
                      living
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Beach Access</strong> for a resort-like experience
                      at home
                    </p>
                  </li>
                </ul>
                <h2 className="text-left text-[1.4rem]">
                  Excellent Connectivity
                </h2>
                <p>
                  Address Villas at The Oasis ensures easy access to{" "}
                  <strong>
                    Downtown Dubai, Dubai Marina, and Al Maktoum International
                    Airport
                  </strong>
                  , keeping you connected to key destinations.
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
                  High Investment Potential
                </h2>
                <p>
                  Developed by <strong>Emaar Properties</strong>, these{" "}
                  <strong>freehold villas</strong> offer strong{" "}
                  <strong>capital appreciation</strong> and{" "}
                  <strong>high rental yields</strong>, making them an ideal
                  investment opportunity.
                </p>
                <h2 className="text-left text-[1.4rem]">
                  Seamless Indoor & Outdoor Living
                </h2>
                <p>
                  Designed for comfort and luxury, each villa features{" "}
                  <strong>
                    floor to ceiling windows, open terraces, and private
                    landscaped gardens
                  </strong>
                  , blending nature with modern living.
                </p>
                <h2 className="text-left text-[1.4rem]">
                  Flexible Payment Plan
                </h2>
                <ul className="list-disc list-outside pl-4 text-[#979797]">
                  <li>
                    <p className="m-0">
                      <strong>10% Down Payment</strong> to secure your home
                    </p>
                  </li>
                  <li>
                    <p className="m-0">
                      <strong>80/20 Plan</strong>, with final payment upon
                      handover in June 2029
                    </p>
                  </li>
                </ul>
                <p>Live in Luxury, Invest in Excellence</p>
                <p>
                  Don’t miss your chance to own a piece of{" "}
                  <strong>Dubai’s most luxury waterfront community</strong>.
                </p>
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
