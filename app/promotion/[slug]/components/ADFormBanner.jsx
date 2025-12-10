"use client";

import React, { useState } from "react";
import ContactForm from "./ADContactForm";
import ADmodel from "./ADmodel";
import { track } from "@vercel/analytics";

export const ADFormBanner = ({ promotionData, onClose, onFormSubmit }) => {
  const [showPopup, setShowPopup] = useState(false);
  const themeColor = promotionData?.themeColor;

  const handleFormSubmit = (formData) => {
    onClose?.(); // Optional chaining to avoid errors if onClose is not passed
  };

  return (
    <div style={{
        "--themeColor": themeColor, 
      }} className="container max-w-[1240px] px-4 flex items-center justify-between m-auto mt-[-40px] md:mt-[-100px] relative z-30">
      <div className="bg-white rounded-[20px] shadow-xl backdrop-blur w-full">
        <div className="px-5 py-8 md:px-12 md:py-12 grid md:grid-cols-2 gap-6">
          <div>
            <h1 className="text-[var(--themeColor)] text-[1.1rem] sm:text-[1.3rem] md:text-[1.7rem] font-semibold">
              {promotionData?.bannerTitle}
            </h1>
            <h2 className="text-[0.9rem] md:text-[1.2rem] font-semibold text-black">
              {promotionData?.subHead}
            </h2>
            <p className="mt-2 mb-4 text-black"
            dangerouslySetInnerHTML={{ __html: promotionData?.subParagraph }}>
            </p>
            <div className="text-black mb-4">
              <p className="font-semibold text-black">
                Completion Date: {promotionData?.handover}
              </p>
              <p className="font-semibold text-black">
                Payment Plan: {promotionData?.paymentPlanMain}
              </p>
            </div>
            <button
              onClick={() => setShowPopup(true)}
              className="site-btn bg-[var(--themeColor)] text-white border-none hover:bg-black"
            >
              Request callback
            </button>
          </div>

          <div>
            <ContactForm promotionData={promotionData} onFormSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && <ADmodel promotionData={promotionData} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default ADFormBanner;