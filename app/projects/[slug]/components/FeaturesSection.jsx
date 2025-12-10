"use client";
import React, { useEffect, useState } from "react";
import pool from "@/public/assets/icons/swimming_pool.webp";
import health from "@/public/assets/icons/rehabilitation.webp";
import Retailoutlet from "@/public/assets/icons/wholesaler.webp";
import gym from "@/public/assets/icons/weights.webp";
import park from "@/public/assets/icons/park.webp";
import restro from "@/public/assets/icons/restaurant.webp";
import Image from "next/image";

export default function FeaturesSection({ projectId }) {
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


  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  return (
    <>
      {projectId.about && (
        <div>
          <h2 className="text-[#ffffff] text-left text-[1rem] sm:text-[1.4rem] font-semibold mb-4 mt-3">
            Features & amenities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            <div className="text-[#ffffff] w-full flex items-center justify-center gap-2 rounded-md border border-[#ffffff] p-2">
              <Image
                className="w-[1.5rem] md:w-[1.8rem] h-auto"
                src={park}
                width={80}
                height={80}
                quality={75}
                alt="Park icon"
              ></Image>
              <p className="text-[#ffffff] m-0">Kids Play Area</p>
            </div>
            <div className="text-[#ffffff] w-full mr-1 flex items-center justify-center gap-2 rounded-md border border-[#ffffff] p-2">
              <Image
                className="w-[1.5rem] md:w-[1.8rem] h-auto"
                src={pool}
                alt="Swimming pool"
                width={80}
                height={80}
                quality={75}
              ></Image>
              <p className="text-[#ffffff] m-0">Swimming pool</p>
            </div>
            <div className="text-[#ffffff] w-full mr-1 flex items-center justify-center gap-2 rounded-md border border-[#ffffff] p-2">
              <Image
                className="w-[1.5rem] md:w-[1.8rem] h-auto"
                src={health}
                alt={`Health Care Centre`}
                width={80}
                height={80}
                quality={75}
              ></Image>
              <p className="text-[#ffffff] m-0">Health Care Centre</p>
            </div>
            <div className="text-[#ffffff] w-full mr-1 flex items-center justify-center gap-2 rounded-md border border-[#ffffff] p-2">
              <Image
                className="w-[1.5rem] md:w-[1.8rem] h-auto"
                src={gym}
                alt={`Gymnasium`}
                width={80}
                height={80}
                quality={75}
              ></Image>
              <p className="text-[#ffffff] m-0">Gymnasium</p>
            </div>
            <div className="text-[#ffffff] w-full mr-1 flex items-center justify-center gap-2 rounded-md border border-[#ffffff] p-2">
              <Image
                className="w-[1.5rem] md:w-[1.8rem] h-auto"
                src={Retailoutlet}
                width={80}
                height={80}
                quality={75}
                alt={`Retail Outlets`}
              ></Image>
              <p className="text-[#ffffff] m-0">Retail Outlets</p>
            </div>
            <div className="text-[#ffffff] w-full mr-1 flex items-center justify-center gap-2 rounded-md border border-[#ffffff] p-2">
              <Image
                className="w-[1.5rem] md:w-[1.8rem] backdrop-brightness-200 h-auto"
                src={restro}
                width={80}
                height={80}
                quality={75}
                alt={`Restaurants`}
              ></Image>
              <p className="text-[#ffffff] m-0">Restaurants</p>
            </div>
          </div>
          {/* Play/Pause button */}
          <button
            onClick={() =>
              handleReadAll([
                `Life style at ${projectId?.projectname}`,
                stripHtml(projectId?.about),
                stripHtml(projectId?.about1),
                stripHtml(projectId?.about2),
              ])
            }
            className="bg-gray-800 text-white px-2 py-1 rounded text-[0.8rem] mb-2"
          >
            {isSpeaking ? "🔇 Mute" : "🔊 Read AI"}
          </button>
          <h2 className="text-[#ffffff] text-left text-[1rem] sm:text-[1.4rem] font-semibold mb-4 cursor-pointer">
            Life style at {projectId?.projectname}
          </h2>

          <p
            className="text-justify"
            dangerouslySetInnerHTML={{ __html: projectId?.about }}
          ></p>
          <p
            className="text-justify"
            dangerouslySetInnerHTML={{ __html: projectId?.about1 }}
          ></p>
          <p
            className="text-justify"
            dangerouslySetInnerHTML={{ __html: projectId?.about2 }}
          ></p>
          <h2 className="text-[#ffffff] text-left text-[1rem] sm:text-[1rem] font-semibold mb-2">
            {projectId?.pointhead}
          </h2>
          <ul className="list-disc list-outside pl-4 text-[#fff]">
            {projectId?.point1 && (
              <li className="text-[#979797]  text-[0.9rem] sm:text-[1rem]">
                {projectId.point1}
              </li>
            )}
            {projectId?.point2 && (
              <li className="text-[#979797]  text-[0.9rem] sm:text-[1rem]">
                {projectId.point2}
              </li>
            )}
            {projectId?.point3 && (
              <li className="text-[#979797] text-[0.9rem] sm:text-[1rem]">
                {projectId.point3}
              </li>
            )}
            {projectId?.point4 && (
              <li className="text-[#979797] text-[0.9rem] sm:text-[1rem]">
                {projectId.point4}
              </li>
            )}
            {projectId?.point5 && (
              <li className="text-[#979797] text-[0.9rem] sm:text-[1rem]">
                {projectId.point5}
              </li>
            )}
            {projectId?.point6 && (
              <li className="text-[#979797] text-[0.9rem] sm:text-[1rem]">
                {projectId.point6}
              </li>
            )}
            {projectId?.point7 && (
              <li className="text-[#979797] text-[0.9rem] sm:text-[1rem]">
                {projectId.point7}
              </li>
            )}
            {projectId?.point8 && (
              <li className="text-[#979797] text-[0.9rem] sm:text-[1rem]">
                {projectId.point8}
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}
