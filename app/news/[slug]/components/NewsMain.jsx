"use client";
import React, { Suspense, useState } from "react";
import { WWURL } from "@/url/axios";
import Image from "next/image";
import ProjectSide from "./ProjectSide";
import NewsGrid from "./NewsGrid";
import MdNewsGrid from "./MdNewsGrid";
import ContactForm from "@/app/components/contactForm/ContactForm";

export default function NewsMain({ projects, newsId, newsList }) {
  const mainNewsImg = newsId.newsthumbnail ? (
    `${WWURL}${newsId.newsthumbnail}`
  ) : (
    <div className="h-full w-full bg-gray-600 rounded animate-pulse"></div>
  );

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
    <div className="w-full bg-[#040406] flex items-center justify-center">
      <div className="container max-w-[1240px] py-5  px-4  md:py-9 relative">
        <div className="grid  md:grid-cols-3">
          <div className="md:col-span-2 newtext NewsBlock ">
            <div className="flex gap-1 pb-3">
              <p className="m-0 font-normal text-gray-400 line-clamp-4">
                Published:
              </p>
              <p className="m-0 font-normal text-gray-400 line-clamp-4">
                {newsId.published}
              </p>
            </div>
            <Image
              className="max-w-full h-auto rounded-md w-full"
              src={mainNewsImg}
              alt={newsId.alt || "Dubai Real Estate News"}
              width={400}
              height={400}
              priority
              quality={90}
              style={{
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Play/Pause button */}
            <button
              onClick={() =>
                handleReadAll([
                  stripHtml(newsId?.newspara1),
                  stripHtml(newsId?.newspara2),
                  stripHtml(newsId?.newspara3),
                ])
              }
              className="bg-gray-800 text-white px-2 py-1 rounded text-[0.8rem] mt-2"
            >
              {isSpeaking ? "🔇 Mute" : "🔊 Read AI"}
            </button>
            {newsId.newspara1 ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: newsId?.newspara1,
                }}
                className="ph m-0 font-normal text-gray-400 text-justify pb-4 pt-1"
              ></div>
            ) : null}
            {newsId.newspara2 ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: newsId?.newspara2,
                }}
                className="ph m-0 font-normal text-gray-400 pb-4 text-justify"
              ></div>
            ) : null}
            {newsId.newspara3 ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: newsId?.newspara3,
                }}
                className="ph m-0 font-normal text-gray-400 pb-4 text-justify"
              ></div>
            ) : null}
            <div className="relative  w-full max-w-2xl md:max-w-5xl max-h-full rounded-lg shadow bg-gray-700">
              <div>
                <h2 className="px-2 text-center pt-4 text-[1rem] md:text-[1.2rem] mb-0">
                  Have an Inquiry? We Are Here to Support You.
                </h2>
                <div className="p-4 md:p-5 space-y-4">
                  <Suspense fallback={<div>Loading...</div>}>
                    <ContactForm />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
          <div className="ph pl-4 hidden md:block">
            <h2 className="ph pb-2 text-[1rem] font-semibold tracking-tight text-white line-clamp-2 border border-x-0 border-t-0 border-b-[#fff]">
              Latest News
            </h2>
            <NewsGrid newsList={newsList} />
            <h2 className="pb-2 text-[1rem] font-semibold tracking-tight text-white line-clamp-2 border border-x-0 border-t-0 border-b-[#fff]">
              Latest Projects in Dubai
            </h2>
            <ProjectSide projects={projects} />
          </div>
        </div>
        <MdNewsGrid newsList={newsList} />
      </div>
    </div>
  );
}
