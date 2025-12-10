"use client";

import React from "react";
import Head from "next/head";
import FormEvent from "./FormEvent";

const Attendance = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <title>Event Attendance</title>
        <meta name="description" content="Attendance" />
      </Head>

      <div className="relative w-full">
        {/* YouTube Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="w-full h-full md:scale-[1.3] transform origin-center">
            <iframe
              className="w-full h-full border-0"
              src="https://www.youtube.com/embed/ynYmTnt9xjY?autoplay=1&mute=1&loop=1&playlist=ynYmTnt9xjY&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1"
              title="YouTube video background"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

        {/* Content on top of video */}
        <div className="relative z-10 bg-black bg-opacity-60 w-full h-full flex items-center justify-center">
          <div className="container max-w-[1240px] py-6 sm:px-4 md:py-9 relative">
            <div className="w-ful">
              <FormEvent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attendance;
