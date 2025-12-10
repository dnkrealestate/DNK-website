"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/assets/pojects/addressVilla/logo.webp";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";

const ADFooter = () => {
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();
  const pathname = useRouter().pathname;

  // navigation
  const goTo = (path) => router.push(path);

  const today = new Date();
  const year = today.getFullYear();

  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScrollButtonVisibility);
    return () =>
      window.removeEventListener("scroll", handleScrollButtonVisibility);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <div className="w-full bg-[#2D2C2C] flex items-center justify-center">
        <div className="footerSection container max-w-[1240px] py-2 px-3 md:py-3">
          <div className="w-[90px] md:w-[100px] m-auto">
            <Image src={logo} alt="logo" className="w-[200px] m-auto" />
          </div>
        </div>
      </div>

      {/* Optional Copyright
      <div className="bg-[#000000] w-full relative flex items-center justify-center">
        <p className="text-white text-[0.6rem] md:text-[0.7rem] p-3 m-0 tracking-wider text-center">
          © Copyright {year}. All Rights Reserved | Damac Island
        </p>
      </div>
      */}

      {showButton && (
        <div className="scrollTop-widget">
          <div className="scrollTop bounce-top" onClick={handleScrollTop}>
            <IoIosArrowUp className="arrow-top" />
          </div>
        </div>
      )}

      <div className="whatsapp-widget fixed bottom-5 right-5 z-50">
        <div onClick={() => {track("WhatsApp Button Click Footer", {
          page: pathname,
          button: "WhatsApp Button Footer",
        });}} className="bg-[#18A436] rounded-full p-2 shadow-lg">
          <a
            href="https://wa.me/+971543049309?text=Hello%2C%20could%20you%20please%20provide%20more%20insights%20into%20the%20Address%20Villas%20at%20The%20Oasis?"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Chat"
          >
            <IoLogoWhatsapp className="text-white text-[2.5rem]" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default ADFooter;
