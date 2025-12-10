"use client";
import React from "react";
import contactBanner from "@/public/assets/banner-img/banner_contact.webp";
import { MdEmail } from "react-icons/md";
import { MdCall } from "react-icons/md";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";

export default function BannerContact() {
  const pathname = usePathname();

  return (
    <div className="banner w-full bg-[#040406] flex items-center justify-center relative">
      <Image
        src={contactBanner}
        alt={`Contact Us, dubai view, Real estate, off plan, ROI, investment`}
        quality={90}
        fill
        sizes="100vw"
        priority
        style={{
          objectFit: "cover",
        }}
      />
      <div className="container max-w-[1240px] px-4 flex items-center justify-start z-10">
        <div className="banner-content">
          <h1 className="banner-h1">Contact Us</h1>
          <p className=" w-[100%] md:w-[70%]">
            We love to hear about your dream goals. Please get in touch with one
            of our Project Consultants.
          </p>
          <div className="flex gap-4">
            <div onClick={() => {
              track("Email Button Clicked Banner Contact", {
                page: pathname,
                button: "Email Button Banner Contact",
              });
            }}>
              <a
                href="mailto:info@dnkre.com"
                className="flex gap-1 items-center group"
              >
                <MdEmail className="text-[#ffffff] group-hover:text-[#CE8745]" />
                <p className="mb-0 group-hover:text-[#CE8745]  transition duration-200 ease-out">
                  info@dnkre.com
                </p>
              </a>
            </div>

            <div
              onClick={() => {
                track("Call Button Clicked Banner Contact", {
                  track: `page: ${pathname},
                   button: Call Button Banner Contact,
                   call: Dann,
                   phone: +971555769195`,
                });
              }}
            >
              <a
                href="tel:+971555769195"
                className="flex gap-1 items-center group"
              >
                <MdCall className="text-[#ffffff] group-hover:text-[#CE8745]" />
                <p className="mb-0 group-hover:text-[#CE8745]  transition duration-200 ease-out">
                  +971 55 576 9195
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
