"use client";
import React, { useState } from "react";
import logo from "@/public/assets/logo/dnklogo_1.webp";
import dan from "@/public/assets/team-img/dan01.webp";
import waseem from "@/public/assets/team-img/waseem01.webp";
import Image from "next/image";

export default function AboutDetail() {
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
    <div>
      <div className="about-section w-full bg-[#040406] flex items-center justify-center">
        <div className="container max-w-[1240px] py-5  px-4  md:py-9 grid  md:grid-cols-2 relative">
          <div className="border-r-none  md:border-r-[0.5px] border-white mr-0 md:mr-6 hidden md:flex items-center justify-center h-full">
            <Image
              src={logo}
              alt="DNK Real Estate logo, Dubai Real Estate Market"
              className="w-[50%] m-auto"
              width={800}
              height={800}
              quality={100}
            />
            {/* <h2 className='text-[#ffffff] text-[1.9rem] m-auto text-center'>DNK Real Estate</h2> */}
          </div>
          <div>
            {/* Play/Pause button */}
            <button
              onClick={() =>
                handleReadAll([
                  "DNK is the harmony, dream and friendship between Dann Leslie and Waseem Khursheed who placed their trust and confidence in each other and believed in each other to make a tangible difference in people's lives, in their communities, and this ambitious commitment and burning passion endured them through life's challenges and helped them emerge as successful. Hence, they understand the importance of trust, confidence, and commitment extremely well.",
                  "These are the tenets of DNK morals and each member of the DNK family swears to extend the same values to every client, investor, and shareholder they cross paths with. DNK Real Estate, we are dedicated to understanding the unique needs of our clients, listening to their stories, and empathetically guiding them toward the perfect home. Through unwavering commitment and world-class service, we transform dreams into reality, nurturing investments and safeguarding the vision of families, entrepreneurs, and dreamers.",
                ])
              }
              className="bg-gray-800 text-white px-2 py-1 rounded text-[0.8rem]"
            >
              {isSpeaking ? "🔇 Mute" : "🔊 Read AI"}
            </button>
            <p className="text-justify">
              DNK is the harmony, dream and friendship between Dann Leslie and
              Waseem Khursheed who placed their trust and confidence in each
              other and believed in each other to make a tangible difference in
              people's lives, in their communities, and this ambitious
              commitment and burning passion endured them through life's
              challenges and helped them emerge as successful. Hence, they
              understand the importance of trust, confidence, and commitment
              extremely well.
            </p>
            <p className="m-0 text-justify">
              These are the tenets of DNK morals and each member of the DNK
              family swears to extend the same values to every client, investor,
              and shareholder they cross paths with. DNK Real Estate, we are
              dedicated to understanding the unique needs of our clients,
              listening to their stories, and empathetically guiding them toward
              the perfect home. Through unwavering commitment and world-class
              service, we transform dreams into reality, nurturing investments
              and safeguarding the vision of families, entrepreneurs, and
              dreamers.
            </p>
          </div>
        </div>
      </div>
      <div className="about-section w-full bg-[#040406] flex items-center justify-center">
        <div className="container max-w-[1240px] py-5  px-4  md:py-9 grid  grid-cols-2 relative">
          <div className="max-w-full bg-[#040406]">
            <Image
              className="w-[90%] md:w-[50%] m-auto"
              src={waseem}
              alt="Waseem, CEO, DNK Real Estate"
              width={800}
              height={1034.71}
              quality={100}
            />
            <div className="text-center pt-1">
              <h5 className="mb-0 text-[1rem] md:text-2xl font-bold tracking-tight text-white">
                Waseem Khursheed
              </h5>
              <p className="m-0 font-normal text-gray-400 mb-3">
                Founder & CEO
              </p>
            </div>
          </div>
          <div className="max-w-full bg-[#040406]">
            <Image
              className="w-[90%] md:w-[50%] m-auto"
              src={dan}
              alt="Dann, Co-Founder, Managing Director, DNK Real Estate"
              width={800}
              height={1034}
              quality={100}
            />
            <div className="text-center pt-1">
              <h5 className="mb-0 text-[1rem] md:text-2xl font-bold tracking-tight text-white">
                Dann Leslie
              </h5>
              <p className="m-0 font-normal text-gray-400 mb-3">
                Co-Founder & Managing Director
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#040406] flex items-center justify-center">
        <div>
          <div className="serviceSection container w-full m-auto px-4 ">
            <h2 className="w-fit text-[2.5rem] md:text-[3rem] text-center font-extrabold mb-[-25px] md:mb-[-30px] text-[#ffffff] uppercase m-auto bg-gradient-to-t from-[#040406] from-30% to-[#ffffff] to-50% bg-clip-text text-transparent opacity-65">
              Story
            </h2>
            <p className="text-[#ffffff] text-[0.6rem] md:text-[0.9rem] tracking-[0.1rem] md:tracking-[0.3rem] w-[100%] text-center uppercase m-auto relative z-10">
              Trust | Confidence | Commitment
            </p>
          </div>
          <button
            onClick={() =>
              handleReadAll([
                "Conscience at heart. Everything, at DNK, revolves around and is rooted in 'conscience'. It's not a mere slogan we frivolously use but strive to live every day. It is our moral compass and a guiding light towards creating a local and global community of conscientious leaders of tomorrow. It dictates us to be honest, transparent, and straightforward in our dealings, and businesses and we religiously follow to that end every single time. Our company culture is heavily drawn from the innate values of the friendship between our founders forged on trust, confidence, and commitment and are imbibed in our practices.",
                "We are constantly striving to set new standards and avoid falling into complacency. This relentless obsession for greatness drives us forward to seek and adopt new, fresh and innovative ideas. Life has taught us the best ideas come from the humblest and simplest experiences. We aim to deliver honest service to our clients, with our professionals empowered to voice their perspectives and deliver new initiatives that help refresh and recreate the blueprint for our conduct and service.",
              ])
            }
            className="bg-gray-800 text-white px-2 py-1 rounded text-[0.8rem] ml-2"
          >
            {isSpeaking ? "🔇 Mute" : "🔊 Read AI"}
          </button>
          <div className="container max-w-[1240px] py-5  px-4  md:py-9 grid  md:grid-cols-2 relative !pt-0">
            <div>
              <p className="text-justify md:pr-3">
                Conscience at heart. Everything, at DNK, revolves around and is
                rooted in 'conscience'. It's not a mere slogan we frivolously
                use but strive to live every day. It is our moral compass and a
                guiding light towards creating a local and global community of
                conscientious leaders of tomorrow. It dictates us to be honest,
                transparent, and straightforward in our dealings, and businesses
                and we religiously follow to that end every single time. Our
                company culture is heavily drawn from the innate values of the
                friendship between our founders forged on trust, confidence, and
                commitment and are imbibed in our practices.
              </p>
            </div>

            <p className="text-justify md:pl-3">
              We are constantly striving to set new standards and avoid falling
              into complacency. This relentless obsession for greatness drives
              us forward to seek and adopt new, fresh and innovative ideas. Life
              has taught us the best ideas come from the humblest and simplest
              experiences. We aim to deliver honest service to our clients, with
              our professionals empowered to voice their perspectives and
              deliver new initiatives that help refresh and recreate the
              blueprint for our conduct and service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
