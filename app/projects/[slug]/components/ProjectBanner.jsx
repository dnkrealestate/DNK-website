"use client";
import React, { useEffect, useState } from "react";
import { TbPointFilled } from "react-icons/tb";
import { IoLogoWhatsapp } from "react-icons/io";
import { WWURL } from "@/url/axios";
import Image from "next/image";
import Link from "next/link";
import ModelProject from "./ModelProject";
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";

export const ProjectBanner = ({ projectId }) => {
  const [ShowPopup, setShowPopup] = useState(false);
  const pathname = usePathname();

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 10000);
  
      return () => clearTimeout(timer);
    }, []);

  const imageUrl = projectId?.coverimage ? (
    `${WWURL}${projectId.coverimage}`
  ) : (
    <div className="absolute h-full w-full bg-gray-600 animate-pulse"></div>
  );

  const ProjectLogo = projectId?.projectlogo
    ? `${WWURL}${projectId.projectlogo}`
    : "";
  
  const [audioEnabled, setAudioEnabled] = useState(false);
  const handleRead = (text) => {
    if (!text) return;

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Language
    utterance.lang = "en-US";

    // Slower and clear
    utterance.rate = 0.9; // slower speech (0.5 = very slow, 1 = normal)
    utterance.pitch = 1; // normal pitch

    // Choose a clear, natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        v.name.includes("Google UK English Female") || // Chrome
        v.name.includes("Microsoft Zira") || // Windows
        v.name.includes("Samantha") // Mac
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Speak the text
    window.speechSynthesis.speak(utterance);
  };
  
useEffect(() => {
  let hasPlayed = false; // ✅ track if already spoken

  const handlePlay = () => {
    if (!hasPlayed) {
      handleRead(`Welcome to ${projectId?.bannertitile}`);
      hasPlayed = true; // ✅ prevent replay
    }
  };

  // attach click and scroll to the whole window
  window.addEventListener("click", handlePlay);
  window.addEventListener("scroll", handlePlay, { once: true }); // optional once for scroll

  return () => {
    window.removeEventListener("click", handlePlay);
    window.removeEventListener("scroll", handlePlay);
  };
}, [projectId?.bannertitile]);

  return (
    <div
      className="banner w-full bg-[#040406] flex items-center justify-center relative h-[350px] sm:h-[420px] md:h-[550px]"
    >
      {projectId ? (
        <Image
          className=""
          src={imageUrl}
          alt={`${projectId.projectname || "Project"}, ${
            projectId.altcoverimage || "Banner image"
          }`}
          fallback="../public/assets/banner-img/sub_banner.webp"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL="../public/assets/banner-img/sub_banner.webp"
          quality={85}
          priority
          style={{
            objectFit: "cover",
          }}
        />
      ) : (
        <div className="absolute h-full w-full bg-gray-600 animate-pulse"></div>
      )}
      <div className="container max-w-[1240px] px-4 flex items-center justify-start z-10">
        <div className="banner-content">
          <div className="grid  md:grid-cols-2">
            <div>
              {projectId?.projectlogo && (
                <div className="w-full h-[40px] md:h-[90px] relative py-1 flex justify-start items-center ">
                  <Image
                    className={`h-full transition-opacity`}
                    src={ProjectLogo}
                    alt={`${projectId.altprojectlogo || "Project Logo"}, ${
                      projectId.projectname || "Banner image Logo"
                    }`}
                    width={150}
                    height={80}
                    priority
                    quality={80}
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
              <h1 className="banner-h1">{projectId?.bannertitile}</h1>
              <p className="mb-0">{projectId?.bannersubtitile}</p>
              {projectId.startingprice && (
                <div className="w-fit pb-4 flex items-center ">
                  <div className="relative">
                    <TbPointFilled className="text-[1.6rem] text-[#fff] m-auto" />
                    <TbPointFilled className="text-[1.9rem] text-[#fff] animate-ping absolute top-[-2px] left-[-2.5px]" />
                  </div>

                  <h2 className="mb-0">
                    Starting From: {projectId.startingprice}
                  </h2>
                </div>
              )}
              <div className=" flex gap-3 mt-2">
                <button
                  onClick={() => setShowPopup(true)}
                  className="site-btn1 "
                >
                  Request callback
                </button>
                <div
                  onClick={() => {
                    track("WhatsApp Button Click Footer", {
                      track: `${pathname},
                      button: "WhatsApp Button Footer",
                      whatsapp: "Msg to Dann"`,
                    });
                  }}
                >
                  <Link
                    href={`https://wa.me/+971543049309?text=Hello,%20Share%20more%20details%20${projectId.projectname}`}
                    className="site-btn1 items-center flex"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IoLogoWhatsapp
                      className="text-[1.4rem] m-auto"
                      aria-label="whats app"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#00000066] w-full h-full absolute left-0 top-0 z-0 sm:hidden"></div>
      <div>
        {ShowPopup && (
          <ModelProject
            projectId={projectId}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectBanner;
