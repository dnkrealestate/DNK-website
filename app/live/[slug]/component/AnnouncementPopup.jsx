"use client";

import { useEffect, useRef, useState } from "react";
import { MdCampaign } from "react-icons/md";
import { userRoadshowServices } from "@/services/roadshowService";

const POLL_INTERVAL_MS = 1500;
const READ_TIMES = 2;
const HOLD_AFTER_SPEECH_MS = 5000;

export default function AnnouncementPopup({ eventplace }) {
  const [announcement, setAnnouncement] = useState(null);
  const lastShownIdRef = useRef(null);
  const readCountRef = useRef(0);
  const closeTimerRef = useRef(null);
  const { getLatestAnnouncement } = userRoadshowServices();

  const closePopup = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    clearTimeout(closeTimerRef.current);
    setAnnouncement(null);
  };

  const scheduleClose = () => {
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(closePopup, HOLD_AFTER_SPEECH_MS);
  };

  const speak = (message) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      // No speech support — keep the popup up long enough to be read, then hide.
      const duration = Math.max(4000, message.split(/\s+/).length * 400 * READ_TIMES);
      closeTimerRef.current = setTimeout(closePopup, duration + HOLD_AFTER_SPEECH_MS);
      return;
    }

    readCountRef.current = 0;
    window.speechSynthesis.cancel();

    const readOnce = () => {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.onend = () => {
        readCountRef.current += 1;
        if (readCountRef.current < READ_TIMES) {
          readOnce();
        } else {
          // Keep the popup up for a few extra seconds after the voice
          // finishes so people who tuned in mid-read still get to see it.
          scheduleClose();
        }
      };
      utterance.onerror = closePopup;
      window.speechSynthesis.speak(utterance);
    };
    readOnce();
  };

  useEffect(() => {
    if (!eventplace) return;

    const poll = async () => {
      try {
        const response = await getLatestAnnouncement(eventplace);
        const latest = response?.data;
        if (latest && latest._id !== lastShownIdRef.current) {
          lastShownIdRef.current = latest._id;
          setAnnouncement(latest);
          speak(latest.message);
        }
      } catch (err) {
        console.error("Failed to poll announcement:", err);
      }
    };

    poll();
    const intervalId = setInterval(poll, POLL_INTERVAL_MS);
    return () => {
      clearInterval(intervalId);
      clearTimeout(closeTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventplace]);

  if (!announcement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-6 backdrop-blur-md animate-fadeIn">
      <div className="announcement-pop relative w-full max-w-2xl rounded-3xl border-2 border-[#CE8745]/60 bg-gradient-to-br from-[#241C14] via-[#1C1D22] to-[#0B0E14] p-10 text-center shadow-2xl">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#CE8745] to-[#8a5726] text-white shadow-lg shadow-[#CE8745]/40">
          <MdCampaign className="animate-wiggle text-4xl" />
        </div>
        <p className="mb-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[#F3B776]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CE8745] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#CE8745]" />
          </span>
          Announcement
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CE8745] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#CE8745]" />
          </span>
        </p>
        <p className="text-3xl font-bold leading-snug text-white sm:text-4xl">
          {announcement.message}
        </p>
      </div>
    </div>
  );
}
