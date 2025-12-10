"use client";

import React from "react";
import Image from "next/image";

import Assist from "@/public/assets/pojects/addressVilla/icon01.webp";
import Consultation from "@/public/assets/pojects/addressVilla/icon02.webp";
import Estimation from "@/public/assets/pojects/addressVilla/icon03.webp";
import Shedule from "@/public/assets/pojects/addressVilla/icon04.webp";
import bgImg from "@/public/assets/pojects/NadAlSheba/footer-bg.webp";
import ADTalkFooterForm from "./ADTalkFooterForm";

const TalkFooterNad = () => {
  return (
    <div>
      <div
        id="contact"
        className="w-full bg-[#1E1E1E] flex items-center justify-center"
      >
        <div className="container max-w-[1240px] py-5 px-4 md:py-9 talkSection">
          <div className="grid md:grid-cols-2 relative pt-8">
            <div className="grid grid-cols-2">
              <div className="p-2">
                <Image
                  src={Assist}
                  alt="Call Enquiry Assistance"
                  className="pb-4 m-auto md:m-0"
                  width={48}
                  height={48}
                />
                <h5 className="text-center md:text-left">
                  Call Enquiry Assistance
                </h5>
                <p className="text-center md:text-left text-white">
                  We are always available on call to assist you with any
                  questions you may have.
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
                <h5 className="text-center md:text-left">
                  Project Consultation
                </h5>
                <p className="text-center md:text-left text-white">
                  We provide you with all investment consultations for your
                  goal.
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
                <h5 className="text-center md:text-left">Project Estimation</h5>
                <p className="text-center md:text-left text-white">
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
                <h5 className="text-center md:text-left">
                  Scheduling Appointments
                </h5>
                <p className="text-center md:text-left text-white">
                  We assist you in scheduling appointments whenever you wish to
                  meet us.
                </p>
              </div>
            </div>

            <ADTalkFooterForm />
          </div>
        </div>
      </div>

      <div className="h-[8px] md:h-[15px] w-full relative">
        <Image
          src={bgImg}
          alt="Footer background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "60%",
          }}
        />
      </div>
    </div>
  );
};

export default TalkFooterNad;
