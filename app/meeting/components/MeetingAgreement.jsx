'use client'
import React, { forwardRef } from "react";
import SealImage from "@/public/apple-touch-icon.png";
import Image from "next/image";

const MeetingAgreement = forwardRef(({ data }, ref) => {
  if (!data) return null;

  return (
    <div
      ref={ref}
      style={{ fontFamily: "Times New Roman, serif" }}
      className="bg-white text-black p-10 w-[794px]"
    >
      <h1 className="text-2xl font-bold text-center mb-8 uppercase">
        Meeting Appointment Confirmation
      </h1>

      {/* Thank You Message */}
      <p className="mb-6 leading-relaxed">
        Dear <strong>{data.fullName}</strong>,
      </p>

      <p className="mb-6 leading-relaxed">
        Thank you for scheduling a meeting with <strong>DNK Real Estate</strong>.
        We appreciate your time and look forward to meeting with you.
      </p>

      {/* Appointment Details */}
      <div className="mb-8">
        <p className="mb-2">
          <strong>Appointment Date:</strong> {data.attendDate}
        </p>
        <p className="mb-2">
          <strong>Appointment Time:</strong> {data.attendTime}
        </p>
        <p className="mb-2">
          <strong>Meeting Location / Project:</strong> {data.projectLocation}
        </p>
        <p className="mb-2">
          <strong>Meeting Coordinator:</strong> {data.sourcedRm}
        </p>
      </div>

      {/* Closing */}
      <p className="mb-10 leading-relaxed">
        Should you need any assistance or wish to reschedule, please feel free to
        contact us. We look forward to welcoming you and assisting you with your
        real estate requirements.
      </p>

      {/* Signature */}
      <div className="flex justify-between items-end mt-16">
        <div>
          <p className="font-semibold mb-10">Warm Regards,</p>
          <div className="w-56 border-t border-black"></div>
          <p className="text-sm mt-2">DNK Real Estate Team</p>
        </div>

        <div className="text-right">
          <div className="relative w-32 h-32 ml-auto">
            <Image
              src={SealImage}
              alt="Company Seal"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs text-center mt-16 text-gray-600">
        This is a system-generated meeting appointment confirmation.
      </p>
    </div>
  );
});

export default MeetingAgreement;
