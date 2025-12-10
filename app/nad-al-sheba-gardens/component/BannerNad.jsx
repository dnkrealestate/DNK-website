"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoLogoWhatsapp } from "react-icons/io";
import PopupNad from "./PopupNad";
import bannerImg from "@/public/assets/pojects/NadAlSheba/bannercover.webp"; 
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";

const BannerNad = () => {
  const [ShowPopup, setShowPopup] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 pt-0">
      <div className="relative w-full rounded-xl overflow-hidden">
        <Image
          src={bannerImg}
          fill
          alt="Nad Al Sheba Gardens Banner"
          sizes="100vw"
          quality={85}
          objectFit="cover"
          className="rounded-xl banner bannerx w-full"
          priority
        />
        <div className="banner px-4 md:pl-[4rem] items-center relative z-10">
          <div className="banner-content grid md:grid-cols-3 text-white">
            <div className="z-10 w-fit col-span-3">
              <h1 className="w-full">
                Luxury Living in <br />
                <span className="text-[2rem] md:text-[3rem]">Nad Al Sheba</span>
                <br />
                Starting From AED 5.1M | USD $1.39M
              </h1>
              <p className="pb-4 w-full md:w-[50%]">
                Welcome to Nad Al Sheba Gardens, an exclusive gated community by
                Meraas in Nad Al Sheba 1, Dubai. Offering beautiful 3-bedroom
                townhouses and 4 to 7-bedroom villas, this community provides a
                peaceful, green environment with high-quality homes and
                world-class amenities — the perfect place to live and invest.
              </p>
              <div className="flex gap-3 mt-2">
                <button onClick={() => setShowPopup(true)} className="site-btn">
                  Request callback
                </button>
                <div
                  onClick={() => {
                    track("WhatsApp Button Click Nad Al Sheba", {
                      track: `Nad Al Sheba,
                        page: ${pathname},
                        button: WhatsApp Button Nad Al Sheba,
                        whatsapp: Msg to Waseem`,
                    });
                  }}
                >
                  <a
                    href="https://wa.me/+971543049309?text=Hello, I’m interested in learning more about Nad Al Sheba. Please send me the details"
                    className="site-btn1 flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IoLogoWhatsapp className="text-[1.4rem] m-auto" />
                  </a>
                </div>
              </div>
            </div>
            <div className="w-[50%] md:w-[70%] order-first md:order-last z-10"></div>
          </div>
        </div>

        {/* Overlay for mobile */}
        <div className="bg-[#00000066] w-full h-full absolute left-0 top-0 z-0 md:hidden"></div>
      </div>

      {/* Popup */}
      {ShowPopup && <PopupNad onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default BannerNad;
