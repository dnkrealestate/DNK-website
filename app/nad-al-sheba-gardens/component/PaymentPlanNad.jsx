"use client";

import React, { useState } from "react";
import PopupNad from "./PopupNad";

const PaymentPlanNad = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const plans = [
    { percent: "20%", title: "DOWN PAYMENT", note: "ON BOOKING" },
    { percent: "10%", title: "1ST INSTALMENT", note: "DECEMBER 2025" },
    { percent: "5%", title: "2ND INSTALMENT", note: "JUNE 2026" },
    { percent: "10%", title: "3RD INSTALMENT", note: "NOVEMBER 2026" },
    { percent: "10%", title: "4TH INSTALMENT", note: "APRIL 2027" },
    { percent: "10%", title: "5TH INSTALMENT", note: "SEPTEMBER 2027" },
    { percent: "10%", title: "6TH INSTALMENT", note: "FEBRUARY 2028" },
    { percent: "5%", title: "7TH INSTALMENT", note: "JUNE 2028" },
    {
      percent: "20%",
      title: "8TH INSTALMENT",
      note: "FEBRUARY 2029 (HANDOVER)",
    },
  ];

  return (
    <div
      className="w-full bg-[#040406] flex items-center justify-center px-4 xl:px-0"
      id="paymentPlan"
    >
      <div className="container max-w-[1240px] py-5 !pt-0 px-4 md:py-9">
        <div className="mb-4 w-full">
          <h2 className="m-0 text-center">Payment Plan</h2>
          <h3 className="m-0 text-[#258493] text-center">
            Easy 60/40 Payment Plan
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {plans.map((item, index) => (
            <div
              key={index}
              className="site-btn1 !p-1.5 md:!p-2 items-center justify-center text-center"
            >
              <h2 className="mb-0">{item.percent}</h2>
              <p className="text-[#fff] text-[0.9rem] font-semibold mb-0">
                {item.title}
              </p>
              <p className="text-[#fff] text-[0.9rem] font-light">
                {item.note}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={handleOpenPopup}
            className="bg-[#258493] hover:bg-[#fff] hover:text-[#258493] text-[#fff] w-fit px-[1.5rem] py-[10px] mt-[25px] rounded duration-100 flex justify-center mb-3 capitalize"
          >
            Inquire more about
          </button>
        </div>

        {showPopup && <PopupNad onClose={handleClosePopup} />}
      </div>
    </div>
  );
};

export default PaymentPlanNad;
