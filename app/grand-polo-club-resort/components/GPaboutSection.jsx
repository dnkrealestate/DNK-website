"use client";

import { useState } from "react";
import Image from "next/image";
import aboutImg from "@/public/assets/pojects/grandPolo/gallary01.webp";
import aboutImg2 from "@/public/assets/pojects/grandPolo/gallary02.webp";
import GPmodel from "./GPmodel";

const GPaboutSection = () => {
  const [ShowPopup, setShowPopup] = useState(false);

  return (
    <div id="about" className="about-section w-full bg-[#000]">
      <div className="container max-w-[1240px] py-6 px-4 m-auto">
        <h1 className="text-[#fff] m-auto w-fit mb-4 mt-3 text-center">
          A Vision for the Future
        </h1>
        <p className="text-center w-full md:w-[90%] m-auto">
          Designed to set a new standard for high-end living, the{" "}
          <strong>Grand Polo Club & Resort</strong> will offer residents an
          exclusive community with world class amenities. The development is
          built with a focus on sustainability, meaning it will not only provide
          a luxurious living experience but also take steps to protect the
          environment.
        </p>

        <div className="flex items-center justify-center">
          <div>
            {/* First Grid */}
            <div className="md:py-9 grid md:grid-cols-2 relative">
              <Image
                src={aboutImg}
                alt="Grand Polo Resort - About"
                className="w-[80%] md:order-first md:w-[80%] m-auto py-3 md:py-0"
                loading="lazy"
              />
              <div>
                <h2 className="text-[#fff] w-fit mb-1 mt-3 text-left">
                  Sustainable and Eco Friendly Design
                </h2>
                <p>
                  One of the key features of the Grand Polo Club & Resort is its
                  commitment to sustainability. Every part of the project is
                  planned with the environment in mind. From eco-friendly
                  construction techniques to energy-efficient designs and the
                  use of sustainable materials, the resort will be a model of
                  green living.
                </p>
                <h2 className="text-left text-[1.4rem]">
                  Luxury Living with a Focus on Comfort and Style
                </h2>
                <p>
                  Whether you're looking for a spacious villa or a stylish
                  apartment, every home will be built with the highest quality
                  materials and attention to detail.
                </p>
                <p>
                  The resort will feature a range of amenities including a golf
                  course, wellness centers, fine dining, large open spaces, and
                  more — making it the perfect place to relax and enjoy life.
                </p>

                <button
                  onClick={() => setShowPopup(true)}
                  className="site-btn !text-[#fff] hover:!text-[#000] !border-[#fff] hover:!bg-[#fff]"
                >
                  Request callback
                </button>
              </div>
            </div>

            {/* Second Grid */}
            <div className="md:py-9 grid md:grid-cols-2 relative">
              <Image
                src={aboutImg2}
                alt="Grand Polo Facilities"
                className="w-[80%] md:order-last order-first md:w-[80%] m-auto pt-3 md:pt-0 py-3 md:py-0"
                loading="lazy"
              />
              <div>
                <ul className="list-disc list-outside pl-4 text-[#979797]">
                  <li>
                    <p className="text-left m-0">
                      <strong className="text-[#fff]">Golf Course:</strong>{" "}
                      Relaxing game of golf surrounded by scenic views.
                    </p>
                  </li>
                  <li>
                    <p className="text-left m-0">
                      <strong className="text-[#fff]">
                        Health & Wellness Centers:
                      </strong>{" "}
                      Fitness centers, yoga studios, and spa facilities.
                    </p>
                  </li>
                  <li>
                    <p className="m-0">
                      <strong className="text-[#fff]">Swimming Pools:</strong>{" "}
                      Indoor and outdoor pools to relax and unwind.
                    </p>
                  </li>
                  <li>
                    <p className="m-0">
                      <strong className="text-[#fff]">Clubhouse:</strong> Spaces
                      for socializing with family and friends.
                    </p>
                  </li>
                  <li>
                    <p className="m-0">
                      <strong className="text-[#fff]">
                        Sports Facilities:
                      </strong>{" "}
                      Tennis courts, basketball courts, and more.
                    </p>
                  </li>
                  <li>
                    <p className="m-0">
                      <strong className="text-[#fff]">
                        Parks and Green Spaces:
                      </strong>{" "}
                      Landscaped gardens, trails, and children’s play areas.
                    </p>
                  </li>
                  <li>
                    <p className="">
                      <strong className="text-[#fff]">
                        24/7 Security & Concierge:
                      </strong>{" "}
                      Safety and support with dedicated staff round the clock.
                    </p>
                  </li>
                </ul>
                <div className="flex items-center justify-start">
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

        <h1 className="text-[#fff] m-auto w-fit mb-4 mt-3 text-center">
          A Community like No Other
        </h1>
        <p className="text-center w-full md:w-[90%] m-auto">
          This development is not just about living in a beautiful home — it's
          about creating a <strong>community</strong>. Whether you're at the
          clubhouse, the golf course, or walking the gardens, you'll feel part
          of something special.
        </p>
      </div>

      {ShowPopup && <GPmodel onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default GPaboutSection;
