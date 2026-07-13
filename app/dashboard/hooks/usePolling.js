"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Re-runs `fetchFn` on an interval so dashboard data stays live without a page
// refresh. Pauses while the tab is hidden (no point burning requests on a tab
// nobody's looking at) and resumes + refetches immediately when it's shown again.
export function usePolling(fetchFn, { intervalMs = 20000, deps = [] } = {}) {
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const fetchRef = useRef(fetchFn);
  fetchRef.current = fetchFn;

  const runFetch = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      await fetchRef.current();
      setLastUpdated(new Date());
    } finally {
      if (isManual) setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    runFetch();
    let interval = null;

    const start = () => {
      if (interval) return;
      interval = setInterval(() => runFetch(), intervalMs);
    };
    const stop = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        runFetch();
        start();
      } else {
        stop();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    start();

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { lastUpdated, refreshing, refresh: () => runFetch(true) };
}

export function formatSecondsAgo(date) {
  if (!date) return "";
  const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ago`;
}
