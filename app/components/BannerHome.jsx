"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { URL, WWURL } from "@/url/axios";
import PopupModel from "./model/PopupModel";

export default function BannerHome({ banner, event, ad }) {
  const [ShowPopup, setShowPopup] = useState(false);
  const audioRef = useRef(null);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowPopup(true);
  //   }, 10000);

  //   return () => clearTimeout(timer);
  // }, []);

  const imageUrl = banner?.image ? (
    `${WWURL}${banner.image}`
  ) : (
    <div className="absolute h-full w-full bg-gray-600 animate-pulse"></div>
  );

  const eventImageUrl = event?.image ? `${WWURL}${event.image}` : null;



useEffect(() => {
  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // ✅ Check last played time
    const lastPlayed = localStorage.getItem("audioLastPlayed");
    const now = Date.now();

    // If played within the last 10 minutes (600,000 ms), don't play again
    if (lastPlayed && now - parseInt(lastPlayed, 10) < 10 * 60 * 1000) {
      return;
    }

    audio.volume = 0.1; // 10% volume
    audio
      .play()
      .then(() => {
        // ✅ Save current time as last played
        localStorage.setItem("audioLastPlayed", now.toString());

        // Remove listeners after successful play
        document.removeEventListener("click", playAudio);
        document.removeEventListener("keydown", playAudio);
        document.removeEventListener("touchstart", playAudio);
      })
      .catch(() => {
        console.log("User interaction required to play audio");
      });
  };

  // Listen for multiple user gestures
  document.addEventListener("click", playAudio);
  document.addEventListener("keydown", playAudio);
  document.addEventListener("touchstart", playAudio);

  return () => {
    document.removeEventListener("click", playAudio);
    document.removeEventListener("keydown", playAudio);
    document.removeEventListener("touchstart", playAudio);
  };
}, []);




  return (
    <div
      aria-label="dubai view, Real estate, off plan, ROI, investment"
      className="banner w-full bg-[#040406] flex items-center justify-center relative h-[350px] sm:h-[420px] md:h-[550px]"
      style={{ width: "1400" }}
    >
      {banner ? (
        <Image
          src={imageUrl}
          alt="dubai view, Real estate, off plan, ROI, investment"
          fill
          quality={100}
          sizes="100vw"
          priority
          style={{
            objectFit: "cover",
          }}
        />
      ) : (
        <div className="absolute h-full w-full bg-gray-600 animate-pulse"></div>
      )}

      <div className="container max-w-[1240px] px-4  items-center  overflow-hidden relative">
        <div className="banner-content grid md:grid-cols-3">
          <div className="z-10 w-fit col-span-2">
            <h1 className="banner-h1">
              Build Your Future in Dubai with DNK Real Estate
            </h1>
            <p className="pb-4 banner-h1">
              Discover your ideal <strong>property in Dubai</strong> with the
              help of our seasoned <strong>real estate experts</strong>. Whether
              you're looking for a dream home or a profitable{" "}
              <strong>investment opportunity</strong>, we provide personalized
              guidance to help you make the right choice.
            </p>
            <button className="site-btn1 " onClick={() => setShowPopup(true)}>
              Request callback
            </button>
          </div>
          <div className="w-[50%] md:w-[70%] order-first md:order-last z-10 relative">
            {eventImageUrl ? (
              <Image
                src={eventImageUrl}
                alt="Event Image"
                quality={75}
                sizes="100vw"
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
      <div className="bg-[#00000066] w-full h-full absolute left-0 top-0 z-0 sm:hidden"></div>
      <div>
        {ShowPopup && (
          <PopupModel adData={ad} onClose={() => setShowPopup(false)} />
        )}
      </div>
      <audio ref={audioRef} src="/assets/sounds/Opening.mp3" preload="auto" />
    </div>
  );
}
