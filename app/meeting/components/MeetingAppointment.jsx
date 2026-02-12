'use client'
import React from 'react'
import Head from "next/head";
import BackgroundImg from "@/public/assets/banner-img/full-bg.webp"
import Image from "next/image";
import FormMeeting from './FormMeeting';


export default function MeetingAppointment() {
  return (
    <div>
      <Head>
        <meta name="robots" content="noindex" />
        <title>Meeting Appointment</title>
        <meta name="description" content="Meeting Appointment" />
      </Head>

      <div className="relative w-full md:h-screen">
        <div className="absolute inset-0 z-0 ">
          <div className="w-full h-full origin-center">
            <Image
              src={BackgroundImg}
              alt="Roadshow Background"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

        {/* Content on top of video */}
        <div className="relative z-10 bg-black bg-opacity-60 w-full h-full flex items-center justify-center">
          <div className="container max-w-[1240px] py-4 sm:px-4 md:py-9 relative">
            <div className="w-full md:w-[70%] sm:w-[90%] m-auto">
              <div className="bg-gray-700 rounded-2xl  py-10 px-3 sm:px-6 md:mt-4 m-4 relative z-20">
                <h3 className="text-white text-[1.5rem] font-semibold mb-4 text-center">
                  Meeting Appointment
                </h3>
                <FormMeeting />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}