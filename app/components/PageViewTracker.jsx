"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView, sendHeartbeat } from "@/services/analyticsServices";

const VISITOR_KEY = "dnk_visitor_id";
const HEARTBEAT_INTERVAL_MS = 25000;

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
      trackPageView(pathname, visitorId, document.referrer);
    }
  }, [pathname]);

  // Periodic heartbeat keeps the visitor counted as "online" between page
  // views, not just at navigation. Paused while the tab is hidden.
  useEffect(() => {
    if (!pathname || pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
      return;
    }
    const visitorId = getVisitorId();
    if (!visitorId) return;

    let interval = null;

    const ping = () => sendHeartbeat(visitorId);
    const start = () => {
      if (interval) return;
      ping();
      interval = setInterval(ping, HEARTBEAT_INTERVAL_MS);
    };
    const stop = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    start();

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [pathname]);

  return null;
}
