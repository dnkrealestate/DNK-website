"use client";

import React, { useEffect, useState } from "react";
import { MdCampaign, MdLock, MdLockOpen } from "react-icons/md";
import Swal from "sweetalert2";
import { userRoadshowServices } from "@/services/roadshowService";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-black/20 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-white/40 focus:outline-none";

const UNLOCK_KEY = "dnk_announcement_unlock";
const UNLOCK_DURATION_MS = 24 * 60 * 60 * 1000;

export default function AnnouncementComposer() {
  const [eventName, setEventName] = useState("");
  const [eventplace, setEventplace] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [checkedStorage, setCheckedStorage] = useState(false);

  const { getRoadshow, postAnnouncement, verifyAnnouncementPin } = userRoadshowServices();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(UNLOCK_KEY);
      if (stored && Date.now() - Number(stored) < UNLOCK_DURATION_MS) {
        setUnlocked(true);
      }
    } catch (err) {
      // localStorage unavailable — just fall back to the locked state.
    }
    setCheckedStorage(true);
  }, []);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await getRoadshow();
        if (response.success && response.data.length > 0) {
          const mostRecentEvent = response.data.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          )[0];
          setEventName(mostRecentEvent.name);
          setEventplace(mostRecentEvent.place);
        }
      } catch (error) {
        console.error("Error fetching event for announcement:", error);
      }
    };
    fetchEventData();
  }, []);

  const handleUnlock = async () => {
    const { value: pin } = await Swal.fire({
      title: "Enter Announcement PIN",
      input: "password",
      inputLabel: "4-digit PIN",
      inputAttributes: {
        maxlength: "4",
        inputmode: "numeric",
        autocapitalize: "off",
        autocorrect: "off",
        style: "text-align:center; letter-spacing: 0.6em; font-size: 1.25rem;",
      },
      showCancelButton: true,
      confirmButtonText: "Unlock",
      confirmButtonColor: "#CE8745",
      inputValidator: (value) => {
        if (!/^\d{4}$/.test(value || "")) return "Enter a 4-digit PIN";
      },
    });

    if (!pin) return;

    try {
      const response = await verifyAnnouncementPin(pin);
      if (response?.success && response.valid) {
        try {
          localStorage.setItem(UNLOCK_KEY, String(Date.now()));
        } catch (err) {
          // Non-fatal — the form still works for this session even if we
          // can't persist the unlock.
        }
        setUnlocked(true);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Unlocked for 24 hours",
          showConfirmButton: false,
          timer: 2500,
        });
      } else {
        Swal.fire("Incorrect PIN", "Please try again.", "error");
      }
    } catch (err) {
      console.error("Failed to verify PIN:", err);
      Swal.fire("Error", "Could not verify the PIN.", "error");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || !eventplace) return;

    setSending(true);
    try {
      const response = await postAnnouncement(eventplace, message.trim());
      if (response.success) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Sent to live screen",
          showConfirmButton: false,
          timer: 3000,
        });
        setMessage("");
      } else {
        Swal.fire("Failed", "Failed to send announcement", "error");
      }
    } catch (err) {
      console.error("Failed to send announcement:", err);
      Swal.fire("Failed", "Failed to send announcement", "error");
    } finally {
      setSending(false);
    }
  };

  if (!checkedStorage) return null;

  if (!unlocked) {
    return (
      <div className="mx-auto mb-6 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
        <button
          type="button"
          onClick={handleUnlock}
          className="flex w-full items-center justify-between gap-3 rounded-xl border border-dashed border-white/15 px-4 py-3 text-left transition-colors hover:border-[#CE8745]/50 hover:bg-white/[0.03]"
        >
          <span className="flex items-center gap-2">
            <MdLock className="text-lg text-[#CE8745]" />
            <span className="text-sm font-semibold uppercase tracking-wider text-white/70">
              Announce to Live Screen
            </span>
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-[#CE8745]">
            <MdLockOpen /> Enter PIN to unlock
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-6 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
      <div className="mb-3 flex items-center gap-2">
        <MdCampaign className="text-lg text-[#CE8745]" />
        <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">
          Announce to Live Screen
        </h4>
      </div>
      <p className="mb-3 text-xs text-white/40">
        {eventName ? `Broadcasting to: ${eventName}` : "Loading current event..."}
      </p>
      <form onSubmit={handleSend} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Type an announcement to read out on the live screen..."
          className={inputClass}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!eventplace}
        />
        <button
          type="submit"
          disabled={sending || !message.trim() || !eventplace}
          className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#CE8745] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#CE8745] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? (
            <div className="loader !h-[18px] !w-[18px]"></div>
          ) : (
            "Broadcast"
          )}
        </button>
      </form>
    </div>
  );
}
