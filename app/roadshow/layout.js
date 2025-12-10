"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import dnkLogo from "@/public/assets/logo/dnklogo_1.webp";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoClose, IoMenu } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { userUserServices } from "@/services/userServices";

export default function LayoutRoadshow({ children }) {
    const [nav, setNav] = useState(true);
    const pathname = usePathname();
    const router = useRouter();
    const { logoutUser } = userUserServices();

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



    const handleLogout = async () => {
        await logoutUser();
        localStorage.removeItem("login");
        Swal.fire("Success", "Logged Out", "success");
        router.push("/login");
    };

    const handleNav = () => {
        setNav(!nav);
    };

    const handleNavigation = (path) => {
        router.push(path);
        setNav(true); // Close the slide bar
    };

    return (
        <div>
            <header>
                <div className="header px-4 py-2 bg-[#040406] w-full">
                    <div className="flex items-center justify-between h-15">
                        <div className="left-block flex items-center gap-4 md:gap-0">
                            <div className="pr-4 cursor-pointer" onClick={handleNav}>
                                {!nav ? (
                                    <IoClose className="text-[#ffffff] text-[1.8rem]" />
                                ) : (
                                    <IoMenu className="text-[#ffffff] text-[1.8rem]" />
                                )}
                            </div>
                            <div
                                className="w-full h-[45px] flex items-center justify-start cursor-pointer"
                                onClick={() => router.push("/roadshow")}
                            >
                                <Image
                                    src={dnkLogo}
                                    alt="DNK Logo"
                                    height={45}
                                    className="h-full w-auto max-w-[170px]"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-[#fff] w-fit p-2 rounded-full mr-3"
                        >
                            <RiLogoutCircleRLine className="text-[#000] text-[1rem]" />
                        </button>
                    </div>
                </div>
            </header>

            <div
                className={
                    !nav
                        ? "fixed left-0 top-[55px] w-[60%] md:w-[30%] bg-[#040406] h-full z-50 ease-in-out duration-500 slide-bar"
                        : "fixed left-[-100%] top-15 h-full z-50 slide-bar"
                }
            >
                <ul className="uppercase p-4">
                    <li
                        onClick={() => handleNavigation("/roadshow")}
                        className={`${pathname === "/roadshow" && "bg-[#0F0F1A]"
                            } text-white border-b border-gray-100 p-3 cursor-pointer group hover:bg-[#0F0F1A]`}
                    >
                        <p className="transform group-hover:translate-x-2 transition-transform ease-in duration-200 text-sm font-semibold">
                            View Event Dashboard
                        </p>
                    </li>

                    <li
                        onClick={() => handleNavigation("/roadshow/client-register")}
                        className={`${pathname === "/roadshow/client-register" && "bg-[#0F0F1A]"
                            } text-white border-b border-gray-100 p-3 cursor-pointer group hover:bg-[#0F0F1A]`}
                    >
                        <p className="transform group-hover:translate-x-2 transition-transform ease-in duration-200 text-sm font-semibold">
                            View Client Registration
                        </p>
                    </li>

                    <li
                        onClick={() => handleNavigation("/roadshow/create")}
                        className={`${pathname === "/roadshow/create" && "bg-[#0F0F1A]"
                            } text-white border-b border-gray-100 p-3 cursor-pointer group hover:bg-[#0F0F1A]`}
                    >
                        <p className="transform group-hover:translate-x-2 transition-transform ease-in duration-200 text-sm font-semibold">
                            Create Roadshow
                        </p>
                    </li>

                    <li
                        onClick={() => handleNavigation("/roadshow/add-source-rm")}
                        className={`${pathname === "/roadshow/add-source-rm" && "bg-[#0F0F1A]"
                            } text-white border-b border-gray-100 p-3 cursor-pointer group hover:bg-[#0F0F1A]`}
                    >
                        <p className="transform group-hover:translate-x-2 transition-transform ease-in duration-200 text-sm font-semibold">
                            Add SourceRM
                        </p>
                    </li>
                    <li
                        onClick={() => handleNavigation("/roadshow/user-edit")}
                        className={`${pathname === "/roadshow/user-edit" && "bg-[#0F0F1A]"
                            } text-white border-b border-gray-100 p-3 cursor-pointer group hover:bg-[#0F0F1A]`}
                    >
                        <p className="transform group-hover:translate-x-2 transition-transform ease-in duration-200 text-sm font-semibold">
                            Change Password
                        </p>
                    </li>
                    
                </ul>
            </div>
            {children}
        </div>
    );
};
