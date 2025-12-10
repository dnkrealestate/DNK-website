'use client'
import { userUserServices } from '@/services/userServices';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function ForgotPassword() {
    const [username, setUsername] = useState("");
    const [errMessage, setErrMessage] = useState(false);

    const router = useRouter();
    const { forgotPass } = userUserServices();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = { email: username };
            const response = await forgotPass(data);

            if (response?.success) {
                router.push("/login");
                setErrMessage(false);
            } else {
                setErrMessage(response?.data?.message || "ForgotPassword failed");
            }
        } catch (err) {
            setErrMessage(err?.response?.data?.message || "ForgotPassword error");
        }
    };

  return (
     <div
          className="w-full bg-[#040406] flex items-center justify-center"
          style={{ height: "100vh" }}
        >
          <div>
            <div className="bg-[#1C1D22] rounded-3xl pt-10 pb-10 px-6 m-4">
              <h1 className="text-[#ffffff] text-[1.5rem] font-semibold mb-4 text-center">
                Forgot Password
              </h1>
    
                {/* Email */}
                  <p className="text-sm text-gray-400 mt-1">
                      A new password will be sent to your registered email
                  </p>
                  <label className="text-[#ffffff] w-[15%]">Enter your email</label>
              <div className="flex justify-between items-center w-full bg-[#1C1D22] border border-[#ffffff] p-[10px] rounded mb-[25px]">
                <input
                  className="bg-transparent focus:border-0 text-[#fff] w-full"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </div>
                  {/* Error Message */}
                  <div
                      className={`text-[#FF0000] mb-3 ${!errMessage ? "invisible" : ""}`}
                  >
                      {errMessage}
                  </div>
    
              {/* Submit */}
              <button
                className="site-btn w-full bg-[#00A3FF] hover:bg-[#6A9F43] py-2 rounded-md text-white"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
  )
}