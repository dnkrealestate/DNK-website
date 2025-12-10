"use client";
import React, { Suspense, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import AdPoster from "@/public/assets/icons/adposter.webp";
import { URL, WWURL } from "@/url/axios";
import ContactForm from "../contactForm/ContactForm";
import Image from "next/image";

export default function PopupModel({ onClose, onFormSubmit, adData }) {
  const handleFormSubmit = (formData) => {
    onClose();
  };
  

  const imageUrl = adData?.image ? (
      `${WWURL}${adData?.image}`
    ) : (
      ""
    );

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative  w-full max-w-2xl md:max-w-5xl max-h-full rounded-lg shadow bg-gray-700 grid md:grid-cols-2 m-3 overflow-hidden">
        <div className="hidden md:block">
          <div
            className="relative bg-cover w-[100%] h-[100%]"
            aria-label="dubai view, Real estate, off plan, ROI, investment"
          >
            {adData && adData?.image ? (
              <Image
                src={imageUrl}
                alt="dubai view, Real estate, off plan, ROI, investment"
                quality={80}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                priority={true}
                style={{
                  objectFit: "cover",
                }}
              />
            ) : (
              <div className="h-full w-full bg-gray-600 rounded animate-pulse"></div>
            )}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-end p-4 md:p-5 rounded-t ">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <IoClose className="text-[1.5rem]" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <Suspense fallback={<div>Loading...</div>}>
              <ContactForm onFormSubmit={handleFormSubmit} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
