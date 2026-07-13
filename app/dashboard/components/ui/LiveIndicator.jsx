"use client";

import { useEffect, useState } from "react";
import { MdRefresh } from "react-icons/md";
import { formatSecondsAgo } from "../../hooks/usePolling";

export default function LiveIndicator({ lastUpdated, refreshing, onRefresh }) {
  const [, forceTick] = useState(0);

  // Re-render every few seconds so the "Xs ago" text stays current.
  useEffect(() => {
    const id = setInterval(() => forceTick((n) => n + 1), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-3 text-xs text-[#8791A1]">
      <span className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#18A4A0] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#18A4A0]" />
        </span>
        Live
      </span>
      {lastUpdated && <span>Updated {formatSecondsAgo(lastUpdated)}</span>}
      <button
        type="button"
        onClick={onRefresh}
        disabled={refreshing}
        className="flex items-center gap-1 rounded-md px-2 py-1 text-[#5B6472] transition-colors hover:bg-[#F0F2F5] disabled:opacity-50"
      >
        <MdRefresh className={refreshing ? "animate-spin" : ""} />
      </button>
    </div>
  );
}
