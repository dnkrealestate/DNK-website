"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { URL, WWURL } from "@/url/axios";
import PopupModel from "./model/PopupModel";
import gsap from "gsap";

export default function BannerHome({ banner, event, ad }) {
  const [ShowPopup, setShowPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef(null);
  const headlineRef = useRef(null);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // <=768px is considered mobile
    };

    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const desktopImageUrl = banner?.image ? `${WWURL}${banner.image}` : null;
  const mobileImageUrl = banner?.mobileImage ? `${WWURL}${banner.mobileImage}` : desktopImageUrl;

  const eventImageUrl = event?.image ? `${WWURL}${event.image}` : null;

useEffect(() => {
  if (!headlineRef.current) return;

  const textEl = headlineRef.current;
  const originalText = textEl.textContent; // store original text

  requestAnimationFrame(() => {
    const content = originalText;

    // Clear existing content
    textEl.innerHTML = "";

    // Split text into spans for animation
    content.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      textEl.appendChild(span);
    });

    const chars = textEl.querySelectorAll("span");

    // 1️⃣ Animate the split text
    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 60,
        rotateX: -90,
        filter: "blur(15px)",
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "back.out(1.7)",
        stagger: 0.03,
        onComplete: () => {
          // 2️⃣ Replace spans with plain text
          textEl.textContent = originalText;

          // 3️⃣ Apply initial blur to plain text
          textEl.style.filter = "blur(5px)";

          // 4️⃣ Animate blur from 5px → 0
          gsap.to(textEl, {
            filter: "blur(0px)",
            duration: 1,
            ease: "power1.out",
          });
        },
      }
    );
  });
}, [banner?.bannerTitle]);




  useEffect(() => {
    const playAudio = () => {
      const audio = audioRef.current;
      if (!audio) return;

      const lastPlayed = localStorage.getItem("audioLastPlayed");
      const now = Date.now();

      if (lastPlayed && now - parseInt(lastPlayed, 10) < 10 * 60 * 1000) {
        return;
      }

      audio.volume = 0.1;
      audio
        .play()
        .then(() => {
          localStorage.setItem("audioLastPlayed", now.toString());
          document.removeEventListener("click", playAudio);
          document.removeEventListener("keydown", playAudio);
          document.removeEventListener("touchstart", playAudio);
        })
        .catch(() => {
          console.log("User interaction required to play audio");
        });
    };

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
      {desktopImageUrl || mobileImageUrl ? (
        <Image
          src={isMobile ? mobileImageUrl : desktopImageUrl}
          alt="dubai view, Real estate, off plan, ROI, investment"
          fill
          quality={100}
          sizes="100vw"
          priority
          fetchPriority="high"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div className="absolute h-full w-full bg-gray-600 animate-pulse"></div>
      )}

      <div className="container max-w-[1240px] px-4 items-center overflow-hidden relative">
        <div className="banner-content grid md:grid-cols-3">
          <div className="z-10 w-fit col-span-2">
            <h1 ref={headlineRef}  className="banner-h1 normal-case w-fit">
              {banner?.bannerTitle || "Build Your Future in Dubai with DNK Real Estate"}
            </h1>
            <p
              dangerouslySetInnerHTML={{
                __html:
                  banner?.bannerSubTitle ||
                  "Discover your ideal <strong>property in Dubai</strong> with the help of our seasoned <strong>real estate experts</strong>. Whether you're looking for a dream home or a profitable <strong>investment opportunity</strong>, we provide personalized guidance to help you make the right choice.",
              }}
              className="pb-4 banner-h1"
            ></p>
            <button className="site-btn1" onClick={() => setShowPopup(true)}>
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
                style={{ objectFit: "contain" }}
              />
            ) : null}
          </div>
        </div>
      </div>
      <div className="bg-[#00000066] w-full h-full absolute left-0 top-0 z-0 sm:hidden"></div>
      {ShowPopup && <PopupModel adData={ad} onClose={() => setShowPopup(false)} />}
      <audio ref={audioRef} src="/assets/sounds/Opening.mp3" preload="auto" />
    </div>
  );
}