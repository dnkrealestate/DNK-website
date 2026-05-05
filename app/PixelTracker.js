"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PixelTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // ✅ Facebook Pixel PAGE_VIEW Tracking
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }

    // ✅ Snapchat Pixel PAGE_VIEW Tracking
    if (typeof window !== "undefined" && window.snaptr) {
      window.snaptr("track", "PAGE_VIEW");
    }
  }, [pathname]);

  return null;
}