"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/services/analyticsServices";

const VISITOR_KEY = "dnk_visitor_id";

function getVisitorId() {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `v-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch (err) {
    return null;
  }
}

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
      return;
    }
    const visitorId = getVisitorId();
    if (visitorId) {
      trackPageView(pathname, visitorId);
    }
  }, [pathname]);

  return null;
}
