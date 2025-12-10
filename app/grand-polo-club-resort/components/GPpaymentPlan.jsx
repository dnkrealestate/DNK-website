"use client";

import React, { useState } from "react";
import GPmodel from "./GPmodel";


const GPpaymentPlan = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);

  const handleViewPlanClick = () => {
    setShowPopup(true);
  };

  const handleFormSubmit = () => {
    setIsOverlayVisible(false);
    setShowPopup(false);
  };

  return (
    <div id="paymentPlan" className="container max-w-[1240px] py-6 px-4 m-auto">
      <h1 className="text-[#fff] m-auto w-fit mb-4 mt-3">Payment Plan</h1>
      <div className="relative overflow-hidden">
        {isOverlayVisible && (
          <div
            onClick={handleViewPlanClick}
            className="w-full h-full absolute backdrop-blur-sm cursor-pointer flex items-center justify-center z-20"
          >
            <div className="relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <button className="px-9 py-2 bg-sky-400 rounded-full text-black text-sm md:text-base relative z-30">
                View Payment Plan
              </button>
            </div>
          </div>
        )}
        <table className="w-full border-2 overflow-auto border-black bg-white z-10 relative">
          <thead>
            <tr className="bg-[#CFA028] text-white">
              <th className="p-2">Description</th>
              <th className="p-2">Milestone Event</th>
              <th className="p-2">Value (%)</th>
            </tr>
          </thead>
          <tbody className="text-black capitalize text-center">
            <tr>
              <td className="p-2">Deposit</td>
              <td>On Booking</td>
              <td>10%</td>
            </tr>
            <tr>
              <td className="p-2">1st installment</td>
              <td>May 2025</td>
              <td>10%</td>
            </tr>
            <tr>
              <td className="p-2">2nd installment</td>
              <td>January 2026</td>
              <td>10%</td>
            </tr>
            <tr>
              <td className="p-2">3rd installment</td>
              <td>June 2027</td>
              <td>10%</td>
            </tr>
            <tr>
              <td className="p-2">4th installment</td>
              <td>January 2027</td>
              <td>10%</td>
            </tr>
            <tr>
              <td className="p-2">5th installment</td>
              <td>June 2027</td>
              <td>10%</td>
            </tr>
            <tr>
              <td className="p-2">6th installment</td>
              <td>February 2028</td>
              <td>10%</td>
            </tr>
            <tr>
              <td className="p-2">7th installment</td>
              <td>September 2028</td>
              <td>10%</td>
            </tr>
            <tr>
              <td className="p-2">8th installment</td>
              <td>On Handover</td>
              <td>20%</td>
            </tr>
          </tbody>
        </table>
        <p className="text-center mt-3 mb-8 text-white">
          Estimated construction completion: June 2029
        </p>
        {showPopup && (
          <GPmodel
            onClose={() => setShowPopup(false)}
            onFormSubmit={handleFormSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default GPpaymentPlan;
