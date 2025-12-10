"use client";

import React, { useEffect } from "react";

export const ADbanner = () => {
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
        handleRead(`Welcome to Damac Islands new Community`);
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
  }, []);
  
  return (
    <div className="relative w-full h-[300px] md:h-[500px] lg:h-[700px] overflow-hidden">
      {/* Background Video */}
      <video
        src="https://www.api.dnkre.com/image/damacislands2.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay container */}
      <div className="relative z-10 container max-w-[1240px] px-4 flex items-center h-full">
        <div className="banner-content"></div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-[50px] md:h-[100px] bg-gradient-to-t from-black z-20" />
    </div>
  );
};

export default ADbanner;
