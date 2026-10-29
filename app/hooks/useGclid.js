"use client";

import { useEffect, useState } from "react";
import { getStoredGclid } from "@/utils/gclid";

// Returns the stored gclid, populated after mount to avoid SSR/client
// hydration mismatches. Lead forms read this and submit it alongside the
// rest of the form payload.
export function useGclid() {
  const [gclid, setGclid] = useState("");

  useEffect(() => {
    setGclid(getStoredGclid());
  }, []);

  return gclid;
}
