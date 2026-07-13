"use client";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { HiOutlineLockClosed } from "react-icons/hi2";
import Logo from "@/public/assets/logo/dnklogo_1.webp";
import { userUserServices } from "@/services/userServices";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errMessage, setErrMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { loginUser } = userUserServices();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMessage(false);
    setLoading(true);
    try {
      const data = { email: username, password: password };
      const response = await loginUser(data);
      if (response.sucess) {
        localStorage.setItem("login", true);
        router.push("/dashboard");
      } else {
        setErrMessage(response.data?.message || "Invalid email or password.");
      }
    } catch (err) {
      setErrMessage(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#040406] px-4">
      <div className="w-full max-w-sm">
        <Image src={Logo} alt="DNK Real Estate" className="mx-auto mb-8 w-[45%]" />

        <div className="rounded-2xl border border-white/10 bg-[#1C1D22] p-8 shadow-2xl">
          <h1 className="mb-1 text-center text-xl font-semibold text-white">
            Admin Login
          </h1>
          <p className="mb-6 text-center text-sm text-white/40">
            Sign in to manage your website
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/50">
                Email
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/20 px-3.5 py-2.5 transition-colors focus-within:border-white/40">
                <FaUser className="shrink-0 text-sm text-white/40" />
                <input
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="you@dnkre.com"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/50">
                Password
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/20 px-3.5 py-2.5 transition-colors focus-within:border-white/40">
                <HiOutlineLockClosed className="shrink-0 text-base text-white/40" />
                <input
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="shrink-0 text-white/40 hover:text-white/70"
                  tabIndex={-1}
                >
                  {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>
            </div>

            {errMessage && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-400">
                {errMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-semibold text-[#040406] transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#040406]/30 border-t-[#040406]" />
              )}
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
