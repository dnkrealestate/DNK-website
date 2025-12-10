"use client";

import React from "react";
import Image from "next/image";
import dnkLogo from "@/public/assets/logo/dnklogo_1.webp"; 
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { RiWhatsappFill } from "react-icons/ri";

const HeaderApt = () => {
  return (
    <header>
      <div className="header flex container items-center justify-between h-15 max-w-[1240px] mx-auto px-4 py-2">
        {/* Logo */}
        <div className="left-block flex items-center justify-center gap-4 md:gap-0">
          <a href="/dubai-apartments">
            <div className="w-full h-[45px] flex items-center justify-start">
              <Image
                src={dnkLogo}
                alt="DNK Logo"
                className="h-full max-w-[170px] object-contain"
                width={170}
                height={45}
                priority
              />
            </div>
          </a>
        </div>

        {/* Social Icons & Contact */}
        <div className="right-block left-block flex items-center justify-center">
          <div className="socials flex items-center justify-center">
            <ul className="items-center justify-center gap-4 pr-2 border-r border-white hidden md:flex">
              <li className="group">
                <a
                  href="https://www.facebook.com/dnkrealestate1/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF className="group-hover:text-[#A4815C] text-xl transition duration-200 ease-out" />
                </a>
              </li>
              <li className="group">
                <a
                  href="https://www.instagram.com/dnk_re/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="group-hover:text-[#A4815C] text-xl transition duration-200 ease-out" />
                </a>
              </li>
              <li className="group">
                <a
                  href="https://www.linkedin.com/company/dnkrealestate/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="group-hover:text-[#A4815C] text-xl transition duration-200 ease-out" />
                </a>
              </li>
            </ul>

            <ul className="pl-2 flex items-center gap-4">
              <li className="group">
                <a href="tel:+971555769195">
                  <MdCall className="group-hover:text-[#A4815C] text-xl transition duration-200 ease-out" />
                </a>
              </li>
              <li className="group">
                <a
                  href="https://wa.me/+971555769195?text=Hello, I’m interested in learning more about Dubai apartments. Please send me the details"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RiWhatsappFill className="group-hover:text-[#A4815C] text-xl transition duration-200 ease-out" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderApt;
