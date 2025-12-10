"use client";

import React, { useState } from "react";
import ContactForm from "./ADContactForm";
import ADmodel from "./ADmodel";
import { track } from "@vercel/analytics";

export const ADFormBanner = ({ onClose, onFormSubmit }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleFormSubmit = (formData) => {
    onClose?.(); // Optional chaining to avoid errors if onClose is not passed
  };

  return (
    <div className="container max-w-[1240px] px-4 flex items-center justify-between m-auto mt-[-40px] md:mt-[-100px] relative z-30">
      <div className="bg-white rounded-[20px] shadow-xl backdrop-blur w-full">
        <div className="px-5 py-8 md:px-12 md:py-12 grid md:grid-cols-2 gap-6">
          <div>
            <h1 className="text-[#0072B2] text-[1.1rem] sm:text-[1.3rem] md:text-[1.7rem] font-semibold">
              Waterfront Townhouses & Villas at Damac Islands 2, Dubai
            </h1>
            <h2 className="text-[0.9rem] md:text-[1.2rem] font-semibold text-black">
              Starting From 2.7M AED | $735K USD
            </h2>
            <p className="mt-2 mb-4 text-black">
              <strong
                onClick={() => {
                  track("Damac Islands2 Landing page to project page visit", {
                    page: "Damac Islands2 Landing page to project page visit",
                  });
                }}
                className="cursor-pointer"
              >
                <a
                  href="https://www.dnkre.com/projects/damac-islands-phase-2-in-dubailand"
                  target="_blank"
                  className="text-[#0072B2] hover:underline"
                >
                  Damac Islands 2
                </a>
              </strong>
              , Dubai’s most exclusive waterfront residential community located
              in the heart of <strong>Dubailand</strong>. Inspired by the
              world’s most iconic tropical destinations, this master planned
              community offers a perfect blend of luxury, comfort, and modern
              design. With 4, 5, and 6 bedroom townhouses and 6 and 7 bedroom
              villas,{" "}
              <span
                onClick={() => {
                  track("Damac Islands2 Landing page to project page visit", {
                    page: "Damac Islands2 Landing page to project page visit",
                  });
                }}
                className="cursor-pointer"
              >
                <a
                  href="https://www.dnkre.com/news/damac-islands-phase-2"
                  target="_blank"
                  className="text-[#0072B2] hover:underline"
                >
                  Damac Islands 2
                </a>
              </span>{" "}
              is ideal for families, investors, and anyone looking for a serene
              yet upscale lifestyle in Dubai.
            </p>
            <div className="text-black mb-4">
              <p className="font-semibold text-black">
                Completion Date: June 2029
              </p>
              <p className="font-semibold text-black">
                Payment Plan: 1% Monthly
              </p>
            </div>
            <button
              onClick={() => setShowPopup(true)}
              className="site-btn bg-[#0D84C8] text-white border-none hover:bg-black"
            >
              Request callback
            </button>
          </div>

          <div>
            <ContactForm onFormSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && <ADmodel onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default ADFormBanner;