"use client";
import React, { Suspense } from "react";
import Assist from "@/public/assets/icons/assist.webp";
import Consultation from "@/public/assets/icons/consultation.webp";
import Estimation from "@/public/assets/icons/estimation.webp";
import Shedule from "@/public/assets/icons/shedule.webp";
import Image from "next/image";
import ContactForm from "@/app/components/contactForm/ContactForm";

export default function Contact() {
  return (
    <div>
      <div className=" w-full bg-[#040406] flex items-center justify-center">
        <div className="container max-w-[1240px] py-5  px-4  md:py-9">
          <h2 className="m-auto w-[100%] sm:w-[90%] md:w-[70%] text-center">
            Contact DNK Real Estate for Luxury Property Consultation in Dubai.
          </h2>
          <p className="text-center m-auto w-[100%] md:w-[80%]">
            Looking for help or any support? We are available for you.
          </p>
        </div>
      </div>
      <div className=" w-full bg-[#040406] flex items-center justify-center">
        <div className="container max-w-[1240px] py-5  px-4  md:py-9">
          <div className="grid  md:grid-cols-2 relative">
            <div className="grid grid-cols-2">
              <div className="p-2">
                <Image
                  src={Assist}
                  alt="Contact number Dubai Real Estate"
                  className="pb-4 m-auto md:m-0 w-[48px]"
                  width={80}
                  height={80}
                  quality={80}
                  loading="lazy"
                />
                <h3 className="text-center md:text-left text-[#ffffff]">
                  Call Enquiry Assistance
                </h3>
                <p className="text-center md:text-left">
                  We are always available on call to assist you with any
                  questions you may have.
                </p>
              </div>
              <div className="p-2">
                <Image
                  src={Consultation}
                  alt="Call Dubai Real estate"
                  className="pb-4 m-auto md:m-0 w-[48px]"
                  width={80}
                  height={80}
                  quality={80}
                  loading="lazy"
                />
                <h3 className="text-center md:text-left text-[#ffffff]">
                  Project Consultation
                </h3>
                <p className="text-center md:text-left">
                  We provide you with all investment consultations for your
                  goal.
                </p>
              </div>
              <div className="p-2">
                <Image
                  src={Estimation}
                  alt="Heliping Real estate Market"
                  className="pb-4  m-auto md:m-0 w-[48px]"
                  width={80}
                  height={80}
                  quality={80}
                  loading="lazy"
                />
                <h3 className="text-center md:text-left text-[#ffffff]">
                  Project Estimation
                </h3>
                <p className="mb-0 text-center md:text-left">
                  You come to us with your dream, and we do all of the planning
                  and costing for you.
                </p>
              </div>
              <div className="p-2">
                <Image
                  src={Shedule}
                  alt="Dubai Booming Real Estate"
                  className="pb-4  m-auto md:m-0 w-[48px]"
                  width={80}
                  height={80}
                  quality={80}
                  loading="lazy"
                />
                <h3 className="text-center md:text-left text-[#ffffff]">
                  Scheduling Appointments
                </h3>
                <p className="mb-0 text-center md:text-left">
                  We assist you in scheduling appointments whenever you wish to
                  meet us.
                </p>
              </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
      <iframe
        className="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.546332658738!2d55.26173537506647!3d25.184791932203755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6929773eb961%3A0xc341839da661e4e1!2sDNK%20Real%20Estate!5e0!3m2!1sen!2sae!4v1719237952819!5m2!1sen!2sae"
      ></iframe>
    </div>
  );
}
