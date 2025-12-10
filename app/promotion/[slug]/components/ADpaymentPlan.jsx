"use client";

import React, { useState } from "react";
import ADmodel from "./ADmodel";

export default function ADpaymentPlan({ promotionData }) {
  const [showPopup, setShowPopup] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);

  const themeColor = promotionData?.themeColor || "#0D84C8";

  const handleViewPlanClick = () => {
    setShowPopup(true);
  };

  const handleFormSubmit = () => {
    setIsOverlayVisible(false);
    setShowPopup(false);
  };

  // ✅ SAFE RENDER HELPER — prevents "Objects are not valid as React child"
  const renderCell = (value) => {
    if (value === null || value === undefined) return "";

    if (typeof value === "object") {
      // If object has a common text key
      return (
        value.value ||
        value.text ||
        value.label ||
        JSON.stringify(value) // fallback for debugging
      );
    }

    return value;
  };

  return (
    <div
      style={{ "--themeColor": themeColor }}
      id="paymentPlan"
      className="container max-w-[1240px] py-6 px-4 m-auto"
    >
      <h1 className="text-[#fff] m-auto w-fit mb-4 mt-3">
        {promotionData.paymentPlanTitle}
      </h1>

      <p className="w-[100%] md:w-[80%] text-center m-auto mb-[20px] md:mb-[30px]">
        {promotionData.paymentPlanSubTitle}
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

        {/* -------- TABLE START -------- */}
        <table className="w-full border-2 border-[#000] bg-[#fff]">
          <thead>
            <tr className="bg-[var(--themeColor)] text-[#fff]">
              <th>{promotionData.tableColumn1}</th>
              <th>{promotionData.tableColumn2}</th>
              <th>{promotionData.tableColumn3}</th>
            </tr>
          </thead>

          <tbody className="text-[#000] capitalize">
            {promotionData?.paymentPlan?.map((row, index) => (
              <tr key={index}>
                <td>{renderCell(row.tableData1)}</td>
                <td>{renderCell(row.tableData2)}</td>
                <td>{renderCell(row.tableData3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* -------- TABLE END -------- */}

        <p className="text-center mt-3 mb-8">
          Estimated construction completion: {promotionData.handover}
        </p>

        {showPopup && (
          <ADmodel
            promotionData={promotionData}
            onClose={() => setShowPopup(false)}
            onFormSubmit={handleFormSubmit}
          />
        )}
      </div>
    </div>
  );
}