"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/assets/pojects/addressVilla/logo.webp";
import { IoLogoWhatsapp, IoIosArrowUp } from "react-icons/io";
import { useRouter } from "next/navigation";

const GPFooter = () => {
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  const goTo = (path) => {
    router.push(path);
  };

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
            <Image
              src={logo}
              alt="logo"
              className="w-[200px] m-auto"
              width={200}
              height={60}
              priority
            />
          </div>
        </div>
      </div>

      {showButton && (
        <div className="scrollTop-widget">
          <div className="scrollTop bounce-top" onClick={handleScrollTop}>
            <IoIosArrowUp className="arrow-top" />
          </div>
        </div>
      )}

      <div className="whatsapp-widget">
        <div className="bg-[#18A436] rounded-full p-2">
          <a
            href="https://wa.me/+971543049309?text=Hello%2C%20could%20you%20please%20provide%20more%20insights%20into%20Grand%20Polo%20Club%20&%20Resort?"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Chat"
          >
            <IoLogoWhatsapp className="text-[#fff] text-[2.5rem]" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default GPFooter;
