"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { RiWhatsappFill } from "react-icons/ri";
import dnkLogo from "../../../public/assets/logo/dnklogo_1.webp";
import { WWURL } from "@/url/axios";
import { track } from "@vercel/analytics";

const HeaderMain = ({ logoData }) => {
  const [nav, setNav] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (header) {
        header.classList.toggle("sticky", window.scrollY > 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = () => {
    setNav(!nav);
  };
  const goToAbout = () => {
    router.push("/about");
    setNav(!nav);
  };
  const goToTeam = () => {
    router.push("/team");
    setNav(!nav);
  };
  const goToContact = () => {
    router.push("/contact");
    setNav(!nav);
  };
  const goToBuy = () => {
    router.push("/buy-project");
    setNav(!nav);
  };
  const goToOffPlan = () => {
    router.push("/off-plan-project");
    setNav(!nav);
  };
  const goToOffSell = () => {
    router.push("/sell-project");
    setNav(!nav);
  };
   const goToDevelopers = () => {
     router.push("/developer");
     setNav(!nav);
   };
  const goToCareers = () => {
    router.push("/careers");
    setNav(!nav);
  };
  const goToNews = () => {
    router.push("/news");
    setNav(!nav);
  };
  const goToHome = () => {
    router.push("/");
    setNav(!nav);
  };
  const goToPodcast = () => {
    router.push("/podcast");
    setNav(!nav);
  };
  const goToGallery = () => {
    router.push("/gallery");
    setNav(!nav);
  };

  const imageUrl =
    logoData && logoData.image ? `${WWURL}${logoData.image}` : dnkLogo;
  return (
    <>
      {/* <DefaultSeo {...SEO} /> */}
      <header>
        <div className="header flex container items-center justify-between h-15 max-w-[1240px] mx-auto px-4 py-2">
          <div className="left-block flex items-center justify-center gap-4 md:gap-0">
            <div onClick={handleNav}>
              {!nav ? (
                <IoClose className="menu-btn" aria-label="close" />
              ) : (
                <IoMenu className="menu-btn" aria-label="menu" />
              )}
            </div>
            <Link href="/">
              <div className="relative w-[60px] h-[45px] flex items-center justify-start">
                <Image
                  src={imageUrl}
                  alt="DNK Real Estate Logo, Dubai Real Estate"
                  className="h-full max-w-[170px]"
                  priority
                  layout="fill"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            </Link>
          </div>

          <div className="right-block left-block flex items-center justify-center">
            <nav>
              <ul className="items-center justify-center gap-4">
                {[
                  { name: "Home", path: "/" },
                  { name: "Off-Plan", path: "/off-plan-project" },
                  { name: "About", path: "/about" },
                  { name: "Team", path: "/team" },
                  { name: "News", path: "/news" },
                  { name: "Careers", path: "/careers" },
                  { name: "Contact", path: "/contact" },
                ].map((item) => (
                  <li
                    key={item.path}
                    className={`relative inline-flex items-center justify-center group m-2 ${
                      pathname === item.path ? "activeHead" : ""
                    }`}
                  >
                    <Link href={item.path} className="relative">
                      {item.name === "Careers" && (
                        <div className="py-[0.1rem] px-[0.2rem] bg-[#FF0000] absolute right-0 top-0 rounded-sm mt-[-10px]">
                          <h6 className="!text-[#fff] text-[0.6rem] p-0 m-0 font-semibold hover:!text-[#fff] pt-0">
                            Hiring
                          </h6>
                        </div>
                      )}
                      <p className="group-hover:text-[#CE8745] transition duration-200 ease-out">
                        {item.name}
                      </p>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#CE8745] rounded origin-bottom-right transform transition duration-200 ease-out scale-x-0 group-hover:scale-x-100 group-hover:origin-bottom-left"></span>
                    </Link>
                  </li>
                ))}

                <li className="relative group m-2 inline-flex items-center justify-center">
                  {/* Trigger */}
                  <div className="cursor-pointer">
                    <p className="group-hover:text-[#CE8745] transition duration-200 ease-out">
                      More
                    </p>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#CE8745] rounded origin-bottom-right transform transition duration-200 ease-out scale-x-0 group-hover:scale-x-100 group-hover:origin-bottom-left"></span>
                  </div>
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 pt-1 bg-gray-700 text-black shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
                    <ul className="min-w-[140px] py-2">
                      <li className="!px-2 py-2 hover:bg-[#0F0F1A] hover:text-white transition">
                        <Link href="/gallery">Gallery</Link>
                      </li>
                      <li className="!px-2 py-2 hover:bg-[#0F0F1A] hover:text-white transition">
                        <Link href="/podcast">Podcast</Link>
                      </li>
                      <li className="!px-2 py-2 hover:bg-[#0F0F1A] hover:text-white transition">
                        <Link href="/developer">Developers</Link>
                      </li>
                      <li className="!px-2 py-2 hover:bg-[#0F0F1A] hover:text-white transition">
                        <Link href="/buy-project">Buy Property</Link>
                      </li>
                      <li className="!px-2 py-2 hover:bg-[#0F0F1A] hover:text-white transition">
                        <Link href="/sell-project">Sell Property</Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>

            <div className="socials flex items-center justify-center">
              <ul className="items-center justify-center gap-4 pr-2 border-r border-white hidden md:flex">
                <li className="group">
                  <a
                    href="https://www.facebook.com/dnkrealestate1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <FaFacebookF className="group-hover:text-[#CE8745] text-xl transition duration-200 ease-out" />
                  </a>
                </li>
                <li className="group">
                  <a
                    href="https://www.instagram.com/dnk_re/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="group-hover:text-[#CE8745] text-xl transition duration-200 ease-out" />
                  </a>
                </li>
                <li className="group">
                  <a
                    href="https://www.linkedin.com/company/dnk-real-estate/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="group-hover:text-[#CE8745] text-xl transition duration-200 ease-out" />
                  </a>
                </li>
              </ul>
              <ul className="pl-2 flex items-center gap-4">
                <li
                  onClick={() => {
                    track("Call Button Click Header", {
                      track: `Page: ${pathname},
                  button: Call Button Header,
                  action: Call to Dann,
                  phone: +971555769195,`,
                    });
                  }}
                  className="group"
                >
                  <a href="tel:+971555769195" aria-label="Phone Number">
                    <MdCall className="group-hover:text-[#CE8745] text-xl  transition duration-200 ease-out" />
                  </a>
                </li>
                <li
                  onClick={() => {
                    track("WhatsApp Button Click Header", {
                      track: `Page: ${pathname},
                  button: WhatsApp Button Header
                  whatsapp: Msg to Dann`,
                    });
                  }}
                  className="group"
                >
                  <a
                    href="https://wa.me/+971555769195?text=Hello,%20could%20you%20please%20provide%20more%20insights%20into%20the%20project?"
                    target="_blank"
                    aria-label="Whats app"
                  >
                    <RiWhatsappFill className="group-hover:text-[#CE8745] text-xl  transition duration-200 ease-out" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <nav
        className={
          !nav
            ? "fixed left-0 top-[55px] w-[60%] bg-[#040406] h-full ease-in-out duration-500 slide-bar"
            : "fixed left-[-100%] slide-bar top-15 h-full"
        }
      >
        <ul className="uppercase p-4">
          <li
            onClick={goToHome}
            className="text-white border-b border-gray-100 p-3 cursor-pointer group hover:bg-[#0F0F1A]"
          >
            <Link href="/">
              <p className="transform group-hover:translate-x-2 transition-transform ease-in duration-200 text-sm font-semibold">
                Home
              </p>
            </Link>
          </li>
          <li
            onClick={goToOffPlan}
            className="text-white border-b border-gray-100 p-3 cursor-pointer group hover:bg-[#0F0F1A]"
          >
            <Link href="/off-plan-project">
              <p className="transform group-hover:translate-x-2 transition-transform ease-in duration-200 text-sm font-semibold">
                Off-Plan
              </p>
            </Link>
          </li>
          <li
            onClick={goToBuy}
            className="text-white border-b border-gray-100 p-3 cursor-pointer group hover:bg-[#0F0F1A]"
          >
            <Link href="/buy-project">
              <p className="transform group-hover:translate-x-2 transition-transform ease-in duration-200 text-sm font-semibold">
                Buy
              </p>
            </Link>
          </li>
          <li
            onClick={goToOffSell}
            className="text-white border-b border-gray-100 p-3 cursor-pointer group hover:bg-[#0F0F1A]"
          >
            <Link href="/sell-project">
              <p className="transform group-hover:translate-x-2 transition-transform ease-in duration-200 text-sm font-semibold">
                Sell
              </p>
            </Link>
          </li>
          <li
            onClick={goToDevelopers}
            className="text-white border-b border-gray-100 p-3 cursor-pointer group hover:bg-[#0F0F1A]"
          >
            <Link href="/developer">
              <p className="transform group-hover:translate-x-2 transition-transform ease-in duration-200 text-sm font-semibold">
                Developers
              </p>
            </Link>
          </li>
          <li
            onClick={goToAbout}
            className="text-white border-b border-gray-100 p-3 cursor-pointer group hover:bg-[#0F0F1A]"
          >
            <Link href="/about">
              <p className="transform group-hover:translate-x-2 transition-transform ease-in duration-200 text-sm font-semibold">
                About
              </p>
            </Link>
          </li>
          <li
            onClick={goToTeam}
            className="text-white border-b border-gray-100 p-3 cursor-pointer group hover:bg-[#0F0F1A]"
          >
            <Link href="/team">
              <p className="transform group-hover:translate-x-2 transition-transform ease-in duration-200 text-sm font-semibold">
                Team
              </p>
            </Link>
          </li>
          <li
            onClick={goToGallery}
            className="text-white border-b border-gray-100 p-3 cursor-pointer group hover:bg-[#0F0F1A]"
          >
            <Link href="/gallery">
              <p className="transform group-hover:translate-x-2 transition-transform ease-in duration-200 text-sm font-semibold">
                Gallery
              </p>
            </Link>
          </li>
          <li
            onClick={goToPodcast}
            className="text-white border-b border-gray-100 p-3 cursor-pointer group hover:bg-[#0F0F1A]"
          >
            <Link href="/podcast">
              <p className="transform group-hover:translate-x-2 transition-transform ease-in duration-200 text-sm font-semibold">
                Podcast
              </p>
            </Link>
          </li>
          <li
            onClick={goToNews}
            className="text-white border-b border-gray-100 p-3 cursor-pointer group hover:bg-[#0F0F1A]"
          >
            <Link href="/news">
              <p className="transform group-hover:translate-x-2 transition-transform ease-in duration-200 text-sm font-semibold">
                News
              </p>
            </Link>
          </li>
          <li
            onClick={goToCareers}
            className="text-white border-b border-gray-100 p-3 cursor-pointer group hover:bg-[#0F0F1A]"
          >
            <Link href="/careers">
              <p className="transform group-hover:translate-x-2 transition-transform ease-in duration-200 text-sm font-semibold">
                Careers
              </p>
            </Link>
          </li>
          <li
            onClick={goToContact}
            className="text-white p-3 cursor-pointer group hover:bg-[#0F0F1A]"
          >
            <Link href="/contact">
              <p className="transform group-hover:translate-x-2 transition-transform ease-in duration-200 text-sm font-semibold">
                Contact
              </p>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default HeaderMain;
