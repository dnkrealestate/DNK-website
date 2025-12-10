"use client";

import React, { useState } from "react";
import ContactForm from "./ADContactForm";
import ADmodel from "./ADmodel";

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
              Luxury Waterfront Living by Emaar
            </h1>
            <h2 className="text-[0.9rem] md:text-[1.2rem] font-semibold text-black">
              Starting From 13.16M AED | $3.58M USD
            </h2>
            <p className="mt-2 mb-4 text-black">
              Welcome to <strong>Address Villas at The Oasis</strong>, an
              exclusive collection of{" "}
              <strong>4 to 6-bedroom luxury villas</strong> by{" "}
              <strong>Emaar Properties</strong>. Set in a serene waterfront
              community, these beautifully designed homes offer breathtaking{" "}
              <strong>lagoon views</strong>, world-class amenities, and a
              perfect balance of luxury & comfort.
            </p>
            <div className="text-black mb-4">
              <p className="font-semibold text-black">
                Completion Date: June 2029
              </p>
              <p className="font-semibold text-black">
                Payment Plan: 80/20 on Handover
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