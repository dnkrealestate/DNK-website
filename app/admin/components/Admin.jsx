"use client";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import Logo from "@/public/assets/logo/dnklogo_1.webp";
import { userUserServices } from "@/services/userServices";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errMessage, setErrMessage] = useState(false);

  const router = useRouter();

  const { loginUser } = userUserServices();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      const data = {
        email: username,
        password: password,
      };
      response = await loginUser(data);
      if (response.sucess) {
        localStorage.setItem("login", true);
        router.push("/dashboard");
        setErrMessage(false);
      } else {
        setErrMessage(response.data.message);
      }
    } catch (err) {
      console.log(err);
      setErrMessage(err?.response?.data?.message);
    }
  };

  return (
    <div
      className="w-full bg-[#040406] flex items-center justify-center h-full"
      style={{ height: "100vh" }}
    >
      <div>
        <Image src={Logo} alt="logo" className="m-auto w-[20%]" />
        <div className="bg-[#1C1D22] rounded-3xl pt-10 pb-10 pr-6 pl-6 m-4">
          <div>
            <h1 className="text-[#ffffff] text-[1.5rem] font-semibold mb-4 m-auto text-center">
              Login
            </h1>
            <div className="input-txt-bx mb-3">
              <div className="flex justify-between items-center w-full bg-[#1C1D22] border border-[#ffffff] p-[10px] rounded mb-[25px]">
                <input
                  className="bg-transparent focus:border-0 text-[#fff]"
                  style={{ width: "85%" }}
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Email"
                />
                <FaUser
                  className="col-1 px-0 text-[#fff]"
                  style={{ fontSize: "0.8rem" }}
                />
              </div>
            </div>
            <div className="input-txt-bx mb-4">
              <div className="flex justify-between items-center w-full bg-[#1C1D22] border border-[#ffffff] p-[10px] rounded mb-[25px]">
                <input
                  className="bg-transparent focus:border-0 text-[#fff]"
                  style={{ width: "85%" }}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                />
                {showPass ? (
                  <AiFillEyeInvisible
                    className="col-1 px-0  text-[#fff]"
                    onClick={() => setShowPass(!showPass)}
                  />
                ) : (
                  <AiFillEye
                    className="col-1 px-0  text-[#fff]"
                    onClick={() => setShowPass(!showPass)}
                  />
                )}
              </div>
            </div>
            <div
              className={`${!errMessage && "invisible"} text-[#FF0000] mb-3`}
            >
              {errMessage || ""}
            </div>
            <button
              className="site-btn w-full"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
