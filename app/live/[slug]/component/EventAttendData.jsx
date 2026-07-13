"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { MdEventAvailable } from "react-icons/md";
import { userRoadshowServices } from "@/services/roadshowService";
import RmLeaderboard from "./RmLeaderboard";

const normalize = (value) =>
  decodeURIComponent(value || "")
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/ /g, " ")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const EventAttendData = () => {
  const params = useParams();
  const paramValue = params?.slug || params?.eventplace || params?.city || null;
  const slugValue = Array.isArray(paramValue) ? paramValue.join(" ") : paramValue;

  const [entries, setEntries] = useState([]);
  const [directory, setDirectory] = useState([]);
  const [pulsingNames, setPulsingNames] = useState(new Set());
  const [message, setMessage] = useState(null);

  const prevCountsRef = useRef({});
  const pulseTimerRef = useRef(null);
  const messageTimerRef = useRef(null);
  const notificationSoundRef = useRef(null);
  const soundEnabledRef = useRef(false);

  const { getRoadshowRegister, getRmDirectory } = userRoadshowServices();

  useEffect(() => {
    const enableSound = () => {
      const audio = new Audio("/assets/sounds/Notification.mp3");
      audio.load();
      audio
        .play()
        .then(() => {
          soundEnabledRef.current = true;
          notificationSoundRef.current = audio;
        })
        .catch(() => {});
      document.removeEventListener("click", enableSound);
    };
    document.addEventListener("click", enableSound);
    return () => document.removeEventListener("click", enableSound);
  }, []);

  // Directory rarely changes — fetch once rather than on every poll tick.
  useEffect(() => {
    (async () => {
      try {
        const response = await getRmDirectory();
        if (response.success) setDirectory(response.data);
      } catch (err) {
        console.error("Failed to load RM directory:", err);
      }
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRoadshowRegister();
        if (!response?.success) return;

        const filtered = slugValue
          ? response.data.filter((item) =>
              normalize(item?.eventplace).includes(normalize(slugValue))
            )
          : response.data;

        const rmCountMap = filtered.reduce((acc, curr) => {
          const rm = curr?.sourcedRm || "Unknown";
          acc[rm] = (acc[rm] || 0) + 1;
          return acc;
        }, {});

        const sortedEntries = Object.entries(rmCountMap)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);

        // Work out exactly who received a new check-in since the last poll.
        const isFirstLoad = Object.keys(prevCountsRef.current).length === 0;
        const changed = [];
        sortedEntries.forEach(({ name, count }) => {
          const prevCount = prevCountsRef.current[name] || 0;
          if (count > prevCount) changed.push({ name, delta: count - prevCount });
        });

        const nextCounts = {};
        sortedEntries.forEach(({ name, count }) => {
          nextCounts[name] = count;
        });
        prevCountsRef.current = nextCounts;

        if (!isFirstLoad && changed.length > 0) {
          if (soundEnabledRef.current) {
            notificationSoundRef.current?.play?.().catch(() => {});
          }

          setPulsingNames(new Set(changed.map((c) => c.name)));
          clearTimeout(pulseTimerRef.current);
          pulseTimerRef.current = setTimeout(() => setPulsingNames(new Set()), 4000);

          const first = changed[0];
          setMessage(
            changed.length === 1
              ? `${first.name} just checked in!`
              : `${changed.map((c) => c.name).join(", ")} just checked in!`
          );
          clearTimeout(messageTimerRef.current);
          messageTimerRef.current = setTimeout(() => setMessage(null), 5000);
        }

        setEntries(sortedEntries);
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [slugValue]);

  return (
    <RmLeaderboard
      icon={MdEventAvailable}
      title="Event Attendance"
      entries={entries}
      directory={directory}
      pulsingNames={pulsingNames}
      message={message}
    />
  );
};

export default EventAttendData;
