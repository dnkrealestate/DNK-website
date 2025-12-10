"use client";
import React, { useEffect, useState } from "react";
import { MdEmail, MdCall } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { WWURL } from "@/url/axios";

export const TeamDetail = ({ teamData }) => {
  const contactPermission = ["management", "Sales", "hr"];
  const TeamImg = teamData?.image ? `${WWURL}${teamData.image}` : "Loading...";

   const [isSpeaking, setIsSpeaking] = useState(false);
       const handleReadAll = (texts) => {
        if (!texts || texts.length === 0) return;
      
        // Stop speech if already speaking
        if (isSpeaking) {
          window.speechSynthesis.cancel();
          setIsSpeaking(false);
          return;
        }
      
        // Combine all texts
        const combinedText = texts.join(". ");
      
        const utterance = new SpeechSynthesisUtterance(combinedText);
        utterance.lang = "en-US";
        utterance.rate = 0.85;
        utterance.pitch = 1;
      
        // Choose preferred voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(
          (v) =>
            v.name.includes("Google UK English Female") ||
            v.name.includes("Microsoft Zira") ||
            v.name.includes("Samantha")
        );
        if (preferredVoice) utterance.voice = preferredVoice;
      
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
      
        window.speechSynthesis.speak(utterance);
       };
  
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
      
      
        const stripHtml = (html) => {
          const div = document.createElement("div");
          div.innerHTML = html;
          return div.textContent || div.innerText || "";
        };
  useEffect(() => {
    let hasPlayed = false; // ✅ track if already spoken

    const handlePlay = () => {
      if (!hasPlayed) {
        handleRead(
          `Introducing our ${teamData?.position}.     ${teamData?.name}`
        );
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
  }, [teamData?.position]);

  return (
    <div>
      <div className="team-section w-full bg-[#040406] flex items-center justify-center">
        <div className="container max-w-[1240px] py-5  px-4  md:py-9 grid  md:grid-cols-2 relative">
          {teamData.image ? (
            <Image
              src={TeamImg}
              alt="Real EState billionaire, millionaire, ROI, Trading"
              className="w-[80%] m-auto"
              width={400}
              height={800}
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
              priority={true}
              style={{
                objectFit: "contain",
                display: "block",
              }}
            />
          ) : (
            <div className="h-full w-full bg-gray-600 rounded animate-pulse"></div>
          )}
          <div>
            <h1 className="banner-h1 mb-0">{teamData?.name}</h1>
            <p className="mb-2">{teamData?.position}</p>
            <div className="w-[100%] h-[1px] bg-white mb-3"></div>
            <div className="flex gap-4">
              <div>
                <p className="mb-0 text-[#ffffff]">Experience:</p>
                <p className="mb-0 text-[#ffffff]">Specialization:</p>
                <p className="mb-0 text-[#ffffff]">Language:</p>
              </div>

              <div className="col-span-3">
                <p className="mb-0">{teamData?.experience}</p>
                <p className="mb-0">{teamData?.specialization}</p>
                <p className="mb-0">{teamData?.language}</p>
              </div>
            </div>

            {contactPermission.includes(teamData?.department) && (
              <div className="my-2 flex gap-4">
                <Link
                  href={`mailto:${teamData?.email}`}
                  className="border px-8 md:px-12 py-2 rounded text-[#fff] hover:text-[#000] hover:bg-[#fff] duration-500"
                >
                  <MdEmail className="text-[1rem] md:text-[1.5rem]" />
                </Link>
                <Link
                  href={`tel:${teamData?.phone}`}
                  className="border px-8 md:px-12 py-2 rounded text-[#fff] hover:text-[#000] hover:bg-[#fff] duration-500"
                >
                  <MdCall className="text-[1rem] md:text-[1.5rem]" />
                </Link>
                <Link
                  href={`https://wa.me/${teamData.phone.replace(
                    /\s+/g,
                    ""
                  )}?text=Hello,${teamData.name}%20send%20more%20details`}
                  className="border px-8 md:px-12 py-2 rounded text-[#fff] hover:text-[#000] hover:bg-[#fff] duration-500"
                >
                  <IoLogoWhatsapp className="text-[1rem] md:text-[1.5rem]" />
                </Link>
              </div>
            )}
            <button
              onClick={() =>
                handleReadAll([
                  stripHtml(teamData?.aboutpara1),
                  stripHtml(teamData?.aboutpara2),
                  stripHtml(teamData?.aboutpara3),
                ])
              }
              className="bg-gray-800 text-white px-2 py-1 rounded text-[0.8rem]"
            >
              {isSpeaking ? "🔇 Mute" : "🔊 Read AI"}
            </button>
            <div
              className="ph text-justify"
              dangerouslySetInnerHTML={{ __html: teamData?.aboutpara1 }}
            ></div>
            <div
              className="ph text-justify"
              dangerouslySetInnerHTML={{ __html: teamData?.aboutpara2 }}
            ></div>
            <div
              className="ph text-justify"
              dangerouslySetInnerHTML={{ __html: teamData?.aboutpara3 }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
