"use client";

import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import PJContactForm from "./PJContactForm";

export default function PJPopupModel({ onClose, unitInterest = "Beach Villas" }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md bg-[#0B0F10] border border-[#79644A]/20 rounded-3xl p-6 lg:p-8 shadow-2xl shadow-black/60 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all"
        >
          <IoClose className="text-lg" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[#79644A] to-transparent rounded-full mx-auto mb-4" />
          <h3
            className="text-white font-semibold text-2xl mb-1"
            style={{ fontFamily: "var(--font-pj-display), serif" }}
          >
            Priority Access
          </h3>
          <p className="text-[#C4A57F] text-sm font-semibold">
            Palm Jebel Ali · {unitInterest}
          </p>
          <p className="text-white/45 text-sm mt-2">
            Register your EOI to receive floor plans, pricing &amp; priority
            allocation.
          </p>
        </div>

        <PJContactForm onFormSubmit={onClose} unitInterest={unitInterest} />
      </div>
    </div>
  );
}
