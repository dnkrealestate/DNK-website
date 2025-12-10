"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ADmodel from "./ADmodel";
import { WWURL } from "@/url/axios";

const ADaboutSection = ({promotionData}) => {
  const router = useRouter();
  const [ShowPopup, setShowPopup] = useState(false);

  const aboutImg1 = promotionData?.aboutImg1 ? `${WWURL}${promotionData.aboutImg1}` : null;
  const aboutImg2 = promotionData?.aboutImg2 ? `${WWURL}${promotionData.aboutImg2}` : null;
  const goToAboutPage = () => {
    router.push("/about");
  };

  return (
    <div id="about" className="about-section w-full bg-[#000]">
      <div className="container max-w-[1240px] py-6 px-4 m-auto">
        <h1 className="text-[#fff] m-auto w-fit mb-4 mt-3 text-center">
          {promotionData?.homeSecondHead}
        </h1>
        <p className="text-center w-full md:w-[70%] m-auto text-white">
          {promotionData?.homeSecondSubHead}
        </p>

        <div className="flex items-center justify-center">
          <div>
            {/* First Block */}
            {promotionData?.about01 &&
              <div className="md:py-9 grid md:grid-cols-2 relative">
              {aboutImg1 ?(<Image
                src={aboutImg1}
                alt="Waterfront villa"
                width={500}
                height={300}
                className="w-[80%] md:order-first md:w-[80%] m-auto py-3 md:py-0"
              />):( 
                <div className="p-4 md:order-first">
              <div className="h-full w-full bg-gray-600 animate-pulse"></div>
                </div>)}
              <div className="text-white">
                <p dangerouslySetInnerHTML={{ __html: promotionData?.about01 }}>
                </p>
                <button
                  onClick={() => setShowPopup(true)}
                  className="site-btn !text-[#fff] hover:!text-[#000] !border-[#fff] hover:!bg-[#fff]"
                >
                  Request callback
                </button>
              </div>
            </div>}

            {/* Second Block */}
            {promotionData?.about02 &&          
              <div className="md:py-9 grid md:grid-cols-2 relative">
              {aboutImg2 ?(<Image
                src={aboutImg2}
                alt="Luxury villa interior"
                width={500}
                height={300}
                className="w-[80%] md:order-last order-first md:w-[80%] m-auto pt-3 md:pt-0 py-3 md:py-0"
              />
              ):( 
                <div className="p-4 md:order-last order-first">
              <div className="h-full w-full bg-gray-600 animate-pulse "></div>
                </div>)}
              
              <div className="text-white">
               <p dangerouslySetInnerHTML={{ __html: promotionData?.about02 }}></p>
                <button
                  onClick={() => setShowPopup(true)}
                  className="site-btn !text-[#fff] hover:!text-[#000] !border-[#fff] hover:!bg-[#fff]"
                >
                  Request callback
                </button>
              </div>
            </div>}
          </div>
        </div>
      </div>

      {ShowPopup && <ADmodel promotionData={promotionData} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default ADaboutSection;
