"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";

// Images from public folder
import logo from "@/public/assets/pojects/NadAlSheba/meraas-logo.webp";
import bgImg from "@/public/assets/pojects/NadAlSheba/footer-bg.webp";

const FooterNad = () => {
  const [showButton, setShowButton] = useState(false);


  const today = new Date();
  const year = today.getFullYear();
  const pathname = usePathname();

  useEffect(() => {
    const handleScrollButtonVisiblity = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScrollButtonVisiblity);
    return () =>
      window.removeEventListener("scroll", handleScrollButtonVisiblity);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <div
        className="w-full flex items-center justify-center"
        style={{
          backgroundImage: `url(${bgImg.src})`,
          backgroundPosition: "60%",
        }}
      >
        <div className="footerSection container max-w-[1240px] py-2 px-3 md:py-3">
          <div className="w-[90px] md:w-[200px] m-auto">
            <Image
              src={logo}
              alt="logo"
              width={200}
              height={100}
              className="w-[200px] m-auto"
            />
          </div>
        </div>
      </div>

      {showButton && (
        <div className="scrollTop-widget">
          <div
            className="scrollTop hover:!bg-[#258493] bounce-top"
            onClick={handleScrollTop}
          >
            <IoIosArrowUp className="arrow-top" />
          </div>
        </div>
      )}

      <div className="whatsapp-widget">
        <div onClick={() => {track("WhatsApp Button Click Nad Al Sheba", {
          track: `Nad Al Sheba,
          page: ${pathname},
          button: WhatsApp Button Nad Al Sheba,
          whatsapp: Msg to Waseem`
        });}} className="bg-[#18A436] rounded-full p-2">
          <a
            href="https://wa.me/+971543049309?text=Hello%2C%20could%20you%20please%20provide%20more%20insights%20into%20Nad%20Al%20Sheba?"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Whats app Chat"
            
          >
            <IoLogoWhatsapp className="text-[#fff] text-[2.5rem]" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterNad;
