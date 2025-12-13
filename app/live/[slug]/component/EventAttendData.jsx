"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { userRoadshowServices } from "@/services/roadshowService";

const EventAttendData = () => {
  const params = useParams();

  /* --------------------------------------------------
     ✅ SAFE PARAM RESOLUTION (CRITICAL FIX)
  -------------------------------------------------- */
  const paramValue =
    params?.slug ||
    params?.eventplace ||
    params?.city ||
    null;

  const slugValue = Array.isArray(paramValue)
    ? paramValue.join(" ")
    : paramValue;

  console.log("FINAL SLUG VALUE:", slugValue);

  const [searchedRegisterList, setSearchedRegisterList] = useState([]);
  const [leadingRm, setLeadingRm] = useState({ name: "N/A", count: 0 });
  const [highlight, setHighlight] = useState(false);

  const prevCountRef = useRef(0);
  const notificationSoundRef = useRef(null);
  const soundEnabledRef = useRef(false);

  const { getRoadshowRegister } = userRoadshowServices();

  /* --------------------------------------------------
     🔊 ENABLE SOUND
  -------------------------------------------------- */
  useEffect(() => {
    const enableSound = () => {
      const audio = new Audio("/assets/sounds/Notification.mp3");
      audio.load();

      audio.play().then(() => {
        soundEnabledRef.current = true;
        notificationSoundRef.current = audio;
      }).catch(() => {});

      document.removeEventListener("click", enableSound);
    };

    document.addEventListener("click", enableSound);
    return () => document.removeEventListener("click", enableSound);
  }, []);

  /* --------------------------------------------------
     🧠 STRONG NORMALIZER (BULLETPROOF)
  -------------------------------------------------- */
  const normalize = (value) =>
    decodeURIComponent(value || "")
      .toLowerCase()
      .replace(/-/g, " ")
      .replace(/\u00a0/g, " ")
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  /* --------------------------------------------------
     🔁 POLLING + FILTER
  -------------------------------------------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRoadshowRegister();
        if (!response?.success) return;

        const sorted = [...response.data].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        // 🔥 IF SLUG EXISTS → FILTER, ELSE SHOW ALL
        const filtered = slugValue
          ? sorted.filter((item) =>
              normalize(item?.eventplace).includes(
                normalize(slugValue)
              )
            )
          : sorted;

        console.log(
          "MATCH CHECK:",
          filtered.map((i) => i.eventplace)
        );

        const rmCountMap = filtered.reduce((acc, curr) => {
          const rm = curr?.sourcedRm || "Unknown";
          acc[rm] = (acc[rm] || 0) + 1;
          return acc;
        }, {});

        const [topRm = "N/A", topCount = 0] =
          Object.entries(rmCountMap).sort((a, b) => b[1] - a[1])[0] || [];

        const newCount = filtered.length;

        if (
          soundEnabledRef.current &&
          newCount > prevCountRef.current &&
          notificationSoundRef.current
        ) {
          notificationSoundRef.current.currentTime = 0;
          notificationSoundRef.current.play().catch(() => {});
        }

        if (newCount !== prevCountRef.current) {
          setHighlight(true);
          setTimeout(() => setHighlight(false), 3000);
        }

        prevCountRef.current = newCount;
        setSearchedRegisterList(filtered);
        setLeadingRm({ name: topRm, count: topCount });
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [slugValue]);

  if (searchedRegisterList.length === 0) return null;

  /* --------------------------------------------------
     🖥️ UI
  -------------------------------------------------- */
  return (
    <div>
      <div
            className={`bg-gray-700 rounded-2xl py-5 md:py-10 px-3 sm:px-6 m-4 relative ${
              highlight ? "animate-greenPulse" : ""
            }`}
          >
            <h2 className="text-[1rem] text-center md:text-left font-normal md:font-semibold">
              Event Attended Leading RM
            </h2>
            <div className="flex justify-between ">
              <h3 className="text-[1.3rem] md:text-[2rem] m-0 text-[#fff]">
                {leadingRm.name}
              </h3>
              <h3 className="text-[1.3rem] md:text-[2rem] m-0 text-[#fff]">
                {leadingRm.count.toString().padStart(2, "0")}
              </h3>
            </div>
          </div>


                <table className="w-full border text-sm">
            <thead>
              <tr>
                <th colSpan={2} className="bg-[#FFC700] text-[#000] py-1">
                  Event Attendance
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="text-[#fff]">Sourced RM</th>
                <th className="text-[#fff]">Meetings</th>
              </tr>
              {Object.entries(
                searchedRegisterList.reduce((acc, curr) => {
                  const key = curr.sourcedRm || "Unknown";
                  acc[key] = (acc[key] || 0) + 1;
                  return acc;
                }, {})
              ).map(([rm, count], index) => (
                <tr key={index}>
                  <td className="text-[#fff]">{rm}</td>
                  <td className="text-center text-[#fff]">{count}</td>
                </tr>
              ))}

              <tr>
                <th className="text-[#fff]">Total:</th>
                <td className="text-center text-[#fff]">
                  {searchedRegisterList.length}
                </td>
              </tr>
            </tbody>
          </table>
    </div>
  );
};

export default EventAttendData;
