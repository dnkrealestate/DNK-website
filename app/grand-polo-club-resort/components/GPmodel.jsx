"use client";

import React from "react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import AdPoster from "@/public/assets/pojects/grandPolo/adImg.webp";
import GPModelForm from "./GPModelForm";

export const GPmodel = ({ onClose, onFormSubmit }) => {
  const handleFormSubmit = (formData) => {
    onClose();
    // Handle the submitted form data if needed
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-2xl md:max-w-5xl max-h-full rounded-lg shadow bg-gray-700 grid md:grid-cols-2 m-3 overflow-hidden">
        {/* Left side image (desktop only) */}
        <div className="hidden md:block">
          <Image
            src={AdPoster}
            alt="Ad Poster"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side form */}
        <div className="bg-gray-700">
          <div className="flex items-center justify-end p-4 md:p-5">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:bg-gray-600 hover:text-white rounded-lg text-sm w-8 h-8 flex justify-center items-center"
            >
              <IoClose className="text-[1.5rem]" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5">
            <GPModelForm onFormSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPmodel;