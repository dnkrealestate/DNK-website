"use client";

import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { userUserServices } from "@/services/userServices";
import Logo from "@/public/assets/logo/dnklogo_1.webp";
import Link from "next/link";

const EventLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errMessage, setErrMessage] = useState(false);

  const router = useRouter();
  const { loginUser } = userUserServices();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { email: username, password };
      const response = await loginUser(data);

      if (response?.sucess) {
        localStorage.setItem("login", true);
        router.push("/roadshow");
        setErrMessage(false);
      } else {
        setErrMessage(response?.data?.message || "Login failed");
      }
    } catch (err) {
      setErrMessage(err?.response?.data?.message || "Login error");
    }
  };

  return (
    <div
      className="w-full bg-[#040406] flex items-center justify-center"
      style={{ height: "100vh" }}
    >
      <div>
        <Image src={Logo} alt="logo" className="m-auto w-[20%]" />
        <div className="bg-[#1C1D22] rounded-3xl pt-10 pb-10 px-6 m-4">
          <h1 className="text-[#ffffff] text-[1.5rem] font-semibold mb-4 text-center">
            Login DNK WebApp
          </h1>

          {/* Email */}
          <div className="flex justify-between items-center w-full bg-[#1C1D22] border border-[#ffffff] p-[10px] rounded mb-[25px]">
            <input
              className="bg-transparent focus:border-0 text-[#fff] w-[85%]"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <FaUser className="text-[#fff]" style={{ fontSize: "0.8rem" }} />
          </div>

          {/* Password */}
          <div className="flex justify-between items-center w-full bg-[#1C1D22] border border-[#ffffff] p-[10px] rounded">
            <input
              className="bg-transparent focus:border-0 text-[#fff] w-[85%]"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {showPass ? (
              <AiFillEyeInvisible
                className="text-[#fff] cursor-pointer"
                onClick={() => setShowPass(false)}
              />
            ) : (
              <AiFillEye
                className="text-[#fff] cursor-pointer"
                onClick={() => setShowPass(true)}
              />
            )}
          </div>

          {/* Error Message */}
          <div
            className={`text-[#FF0000] mb-3 ${!errMessage ? "invisible" : ""}`}
          >
            {errMessage}
          </div>
          <div className="flex justify-end mb-6 ">
            <Link href="/forgot-password" className="text-[#0177bb] hover:text-[#00A3FF]">
              Forgot Password
            </Link>
          </div>

          {/* Submit */}
          <button
            className="site-btn w-full bg-[#00A3FF] hover:bg-[#6A9F43] py-2 rounded-md text-white"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventLogin;
