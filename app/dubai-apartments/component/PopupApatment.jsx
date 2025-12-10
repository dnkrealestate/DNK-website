"use client";

import React from "react";
import { IoClose } from "react-icons/io5";
import ContactForm from "@/app/components/contactForm/ContactForm";
import imageUrl from "@/public/assets/dubaiApaetment/popupImg.webp";

export const PopupApatment = ({ onClose }) => {
  const handleFormSubmit = (formData) => {
    onClose(); 
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-2xl md:max-w-5xl max-h-full rounded-lg shadow bg-[#2D2D2D] grid md:grid-cols-2 m-3 overflow-hidden">
        {/* Left Image Section */}
        <div className="hidden md:block">
          <div
            className="bg-cover bg-center w-full h-full"
            aria-label="dubai view, Real estate, off plan, ROI, investment"
            style={{
              backgroundImage: `url(${imageUrl.src})`,
            }}
          ></div>
        </div>

        {/* Right Form Section */}
        <div>
          {/* Close Button */}
          <div className="flex items-center justify-end p-4 md:p-5 rounded-t">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <IoClose className="text-[1.5rem]" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Form Title + Component */}
          <div className="p-4 md:p-5 pt-0 space-y-4">
            <h2 className="capitalize text-white md:pl-2">Get In Touch</h2>
            <ContactForm onFormSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupApatment;
