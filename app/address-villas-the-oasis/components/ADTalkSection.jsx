"use client";

import React from "react";
import Image from "next/image";
import Assist from "@/public/assets/pojects/addressVilla/icon01.webp";
import Consultation from "@/public/assets/pojects/addressVilla/icon02.webp";
import Estimation from "@/public/assets/pojects/addressVilla/icon03.webp";
import Shedule from "@/public/assets/pojects/addressVilla/icon04.webp";
import LTalkFooterForm from "./ADTalkFooterForm";

const ADTalkSection = () => {
  return (
    <div
      id="contact"
      className="w-full bg-[#1E1E1E] flex items-center justify-center"
    >
      <div className="container max-w-[1240px] py-5 px-4 md:py-9 talkSection">
        <h1 className="m-auto w-fit text-white">Let's Talk Together</h1>
        <p className="text-center m-auto w-full md:w-[80%] pb-4 text-[#fff]">
          Please fill out the form, our experts will get in touch with you
          shortly.
        </p>
        <div className="grid md:grid-cols-2 relative pt-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-2">
              <Image
                src={Assist}
                alt="Call Enquiry Assistance"
                className="pb-4 m-auto md:m-0"
                width={48}
                height={48}
              />
              <h5 className="text-center md:text-left text-white">
                Call Enquiry Assistance
              </h5>
              <p className="text-center md:text-left text-[#fff]">
                We are always available on call to assist you with any questions
                you may have.
              </p>
            </div>

            <div className="p-2">
              <Image
                src={Consultation}
                alt="Project Consultation"
                className="pb-4 m-auto md:m-0"
                width={48}
                height={48}
              />
              <h5 className="text-center md:text-left text-white">
                Project Consultation
              </h5>
              <p className="text-center md:text-left text-[#fff]">
                We provide you with all investment consultations for your goal.
              </p>
            </div>

            <div className="p-2">
              <Image
                src={Estimation}
                alt="Project Estimation"
                className="pb-4 m-auto md:m-0"
                width={48}
                height={48}
              />
              <h5 className="text-center md:text-left text-white">
                Project Estimation
              </h5>
              <p className="mb-0 text-center md:text-left text-[#fff]">
                You come to us with your dream, and we do all of the planning
                and costing for you.
              </p>
            </div>

            <div className="p-2">
              <Image
                src={Shedule}
                alt="Scheduling Appointments"
                className="pb-4 m-auto md:m-0"
                width={48}
                height={48}
              />
              <h5 className="text-center md:text-left text-white">
                Scheduling Appointments
              </h5>
              <p className="mb-0 text-center md:text-left text-[#fff]">
                We assist you in scheduling appointments whenever you wish to
                meet us.
              </p>
            </div>
          </div>

          {/* Form Component */}
          <LTalkFooterForm />
        </div>
      </div>
    </div>
  );
};

export default ADTalkSection;