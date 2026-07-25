"use client";

import React, { useEffect, useState } from "react";
import { getTimezoneLabel } from "@/utils/timezones";

// Reads the current hour/minute/second *in the target timezone* — can't
// just use `now.getHours()` etc., since that would give the viewing
// device's local time instead of the venue's.
function getTimeParts(date, timezone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { hour: get("hour"), minute: get("minute"), second: get("second") };
}

// Live clock in the roadshow venue's configured timezone (set on the
// roadshow create/edit page) — lets on-site staff see local time instead of
// whatever timezone the viewing device happens to be in.
export default function VenueClock({ timezone }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timezone) return null;

  let timeLabel;
  let dateLabel;
  let zoneAbbr;
  let hour, minute, second;
  try {
    const { hour: h, minute: m, second: s } = getTimeParts(now, timezone);
    hour = h;
    minute = m;
    second = s;

    timeLabel = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(now);

    dateLabel = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(now);

    zoneAbbr = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "short",
    })
      .formatToParts(now)
      .find((part) => part.type === "timeZoneName")?.value;
  } catch (error) {
    console.error("Invalid roadshow timezone:", timezone, error);
    return null;
  }

  const countryInfo = getTimezoneLabel(timezone);
  const countryName = countryInfo?.label || timezone;

  const secondDeg = second * 6;
  const minuteDeg = minute * 6 + second * 0.1;
  const hourDeg = (hour % 12) * 30 + minute * 0.5;

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 shadow-[0_0_20px_rgba(24,164,160,0.15)] backdrop-blur-md sm:gap-4 sm:px-5 sm:py-3">
      {/* Left: analog clock face */}
      <div className="relative h-11 w-11 shrink-0 rounded-full border-2 border-white/40 bg-white/5 sm:h-14 sm:w-14">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-19px)`,
            }}
          />
        ))}
        <div
          className="absolute left-1/2 top-1/2 h-[10px] w-[2px] origin-bottom rounded-full bg-white sm:h-[13px] sm:w-[2.5px]"
          style={{ transform: `translateX(-50%) translateY(-100%) rotate(${hourDeg}deg)` }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[14px] w-[1.5px] origin-bottom rounded-full bg-white/90 sm:h-[18px] sm:w-[2px]"
          style={{ transform: `translateX(-50%) translateY(-100%) rotate(${minuteDeg}deg)` }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[15px] w-[1px] origin-bottom rounded-full bg-[#18A4A0] sm:h-[19px] sm:w-[1.5px]"
          style={{ transform: `translateX(-50%) translateY(-100%) rotate(${secondDeg}deg)` }}
        />
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#18A4A0]" />
      </div>

      {/* Right: digital time + country/timezone details */}
      <div className="text-left">
        <div className="flex items-baseline gap-1.5">
          <span
            className="text-xl font-extrabold tracking-tight text-[#3DE0DA] sm:text-3xl"
            style={{ textShadow: "0 0 16px rgba(61,224,218,0.5)" }}
          >
            {timeLabel}
          </span>
          {zoneAbbr && (
            <span className="text-[0.65rem] font-bold text-white/80 sm:text-sm">
              {zoneAbbr}
            </span>
          )}
        </div>
        <div className="mt-0.5 flex items-center gap-1.5 text-[0.65rem] text-white/60 sm:text-xs">
          <span className="font-semibold text-white/90">{countryName}</span>
          <span className="text-white/30">•</span>
          <span>{dateLabel}</span>
        </div>
      </div>
    </div>
  );
}
