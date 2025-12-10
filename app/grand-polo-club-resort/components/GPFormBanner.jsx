"use client";

import { useState } from "react";
import ContactForm from "./GPContactForm";
import GPmodel from "./GPmodel";

const GPFormBanner = () => {
  const [showPopup, setShowPopup] = useState(false);
  const handleFormSubmit = (formData) => {
    setShowPopup(false);
  };

  return (
    <div className="container max-w-[1240px] px-4 flex items-center justify-between m-auto mt-[-40px] md:mt-[-100px] relative">
      <div className="rouded drop-shadow-xl bg-[#ffffff] z-40 rounded-[20px] backdrop-blur">
        <div className="px-[20px] py-[30px] md:px-[50px] md:py-[50px] grid md:grid-cols-2">
          <div>
            <div className="banner-content z-10">
              <h1 className="banner-h1 text-[#CFA028] text-[1.1rem] sm:text-[1.3rem] md:text-[1.7rem]">
                Grand Polo Club & Resort
              </h1>
              <p className="mb-1 md:mb-4 text-[#000]">
                The <strong>Grand Polo Club & Resort</strong> is an exciting new
                project covering 60 million square feet, developed by the
                world-renowned <strong>Emaar Properties</strong>. This upcoming
                development will bring a unique, resort-style lifestyle to
                Dubai, offering a mix of modern luxury and sustainable living.
              </p>
              <button
                onClick={() => setShowPopup(true)}
                className="site-btn !text-[#fff] hover:!text-[#ffffff] !border-none bg-[#CFA028] hover:!bg-black"
              >
                Request callback
              </button>
            </div>
          </div>

          <div>
            <ContactForm onFormSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>

      {showPopup && <GPmodel onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default GPFormBanner;
