"use client";

import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import AdPoster from "@/public/assets/other/islands2ad.webp";
import { useProjectServices } from "@/services/projectServices";
import { ADModelForm } from "./ADModelForm";
import { WWURL } from "@/url/axios";

export const ADmodel = ({promotionData, onClose, onFormSubmit }) => {
  const [adPoster, setAdPoster] = useState({ image: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAdR } = useProjectServices();

  const ImageUrl = promotionData?.popupBannerImage ? `${WWURL}${promotionData.popupBannerImage}` : null; 

  useEffect(() => {
    fetchData();
    console.log("✅ promotionData.aboutImg1:", promotionData?.aboutImg1);
    console.log("✅ WWURL:", WWURL);
    console.log("✅ Final Image URL:", ImageUrl);

  }, []);

  const fetchData = async () => {
    try {
      const response = await getAdR();
      if (response.success) {
        const adData = response.data;
        if (adData.length > 0) {
          const adImage = adData[0].image;
          setAdPoster({ image: adImage });
        } else {
          setError("No Ad found.");
        }
      } else {
        setError("Failed to fetch Ad image.");
      }
    } catch (err) {
      console.error("Failed to fetch Ad Image", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div>{error}</div>;
  if (loading) return <div className="text-white">Loading...</div>;

  const handleFormSubmit = (formData) => {
    onClose();
    if (onFormSubmit) {
      onFormSubmit(formData);
    }
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-2xl md:max-w-5xl max-h-full rounded-lg shadow bg-gray-700 grid md:grid-cols-2 m-3 overflow-hidden">
        {/* Left Image */}
        <div className="hidden md:block">
          <div className="relative bg-cover w-[100%] h-[100%]">
            {ImageUrl? (<Image
              src={ImageUrl}
              alt={promotionData.altPopupBannerImage}
              quality={80}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                priority={true}
                style={{
                  objectFit: "cover",
                }}
            />):( 
              <div className="h-full w-full bg-gray-600 animate-pulse"></div>
            )}
          </div>
        </div>

        {/* Right Form */}
        <div>
          <div className="flex items-center justify-end p-4 md:p-5 rounded-t">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <IoClose className="text-[1.5rem]" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <ADModelForm promotionData={promotionData} onFormSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ADmodel;