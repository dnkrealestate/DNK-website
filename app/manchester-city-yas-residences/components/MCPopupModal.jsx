"use client";

import React from "react";
import { IoClose } from "react-icons/io5";
import MCContactForm from "./MCContactForm";

export default function MCPopupModal({ onClose, unitLabel }) {
  return (
    <div
      className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[460px] max-h-[90vh] overflow-y-auto bg-[#0A0F1C] border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black/60"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
        >
          <IoClose className="text-lg" />
        </button>

        <h2 className="text-white font-bold text-xl mb-1 pr-8">
          Register Your Interest
        </h2>
        <p className="text-white/50 text-xs mb-5">
          {unitLabel
            ? `You're enquiring about the ${unitLabel}. An advisor will confirm availability and send the official price list.`
            : "Official price list, floor plans and payment plan details — first."}
        </p>

        <MCContactForm />
      </div>
    </div>
  );
}
