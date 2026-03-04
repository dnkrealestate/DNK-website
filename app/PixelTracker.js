"use client";
import { useEffect } from "react";

export default function PixelTracker() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, []);
  return null;
}