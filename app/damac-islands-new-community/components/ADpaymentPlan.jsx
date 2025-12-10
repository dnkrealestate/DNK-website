"use client";

import React, { useState } from "react";
import ADmodel from "./ADmodel";


const ADpaymentPlan = () => {
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
      <h1 className="text-[#fff] m-auto w-fit mb-4 mt-3">
        Flexible Payment Plans
      </h1>
      <p className="w-[100%] md:w-[80%] text-center m-auto mb-[20px] md:mb-[30px]">
         Investing in Damac Islands 2 is made easy with flexible payment plans
        designed to suit every buyer. Whether you are purchasing a dream home or
        a high return investment property, Damac Islands 2 offers financial ease
        without compromising on luxury.
      </p>
       
      <div className="relative overflow-hidden">
        {isOverlayVisible && (
          <div
            onClick={handleViewPlanClick}
            className="w-full h-full absolute backdrop-blur-sm cursor-pointer flex items-center justify-center"
          >
            <div className="relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <button className="px-9 py-2 bg-sky-400 rounded-full m-auto text-[#000] text-[0.8rem] md:text-[1rem]">
                View Payment Plan
              </button>
            </div>
          </div>
        )}

        <table className="w-full border-2 border-[#000] bg-[#fff]">
          <thead>
            <tr className="bg-[#0D84C8] text-[#fff]">
              <th>Description</th>
              <th>Milestone Event</th>
              <th>(%) Value</th>
            </tr>
          </thead>
          <tbody className="text-[#000] capitalize">
            <tr>
              <td>Deposit</td>
              <td>On Booking</td>
              <td>10%</td>
            </tr>
            <tr>
              <td>1st installment</td>
              <td>May 2025</td>
              <td>10%</td>
            </tr>
            <tr>
              <td>2nd installment</td>
              <td>January 2026</td>
              <td>10%</td>
            </tr>
            <tr>
              <td>3rd installment</td>
              <td>June 2027</td>
              <td>10%</td>
            </tr>
            <tr>
              <td>4th installment</td>
              <td>January 2027</td>
              <td>10%</td>
            </tr>
            <tr>
              <td>5th installment</td>
              <td>June 2027</td>
              <td>10%</td>
            </tr>
            <tr>
              <td>6th installment</td>
              <td>February 2028</td>
              <td>10%</td>
            </tr>
            <tr>
              <td>7th installment</td>
              <td>September 2028</td>
              <td>10%</td>
            </tr>
            <tr>
              <td>8th installment</td>
              <td>On Handover</td>
              <td>20%</td>
            </tr>
          </tbody>
        </table>

        <p className="text-center mt-3 mb-8">
          Estimated construction completion: June 2029
        </p>

        {showPopup && (
          <ADmodel
            onClose={() => setShowPopup(false)}
            onFormSubmit={handleFormSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default ADpaymentPlan;