"use client";

import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import HIContactForm from "./HIContactForm";

export default function HIPopupModel({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative z-10 w-full max-w-md bg-[#0C1B30] border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl shadow-black/50">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all"
        >
          <IoClose className="text-lg" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-1 bg-[#C4973D] rounded-full mx-auto mb-4" />
          <h3 className="text-white font-bold text-2xl mb-1">
            Exclusive Details
          </h3>
          <p className="text-[#C4973D] text-sm font-semibold">
            Hudayriyat Island · Abu Dhabi
          </p>
          <p className="text-white/50 text-sm mt-2">
            Get floor plans, pricing &amp; payment options sent directly to you.
          </p>
        </div>

        <HIContactForm onFormSubmit={onClose} />
      </div>
    </div>
  );
}
