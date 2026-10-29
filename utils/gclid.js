// Captures and persists the Google Click Identifier (gclid) so it survives
// client-side navigation and can be attached to lead submissions for Google
// Ads conversion attribution.

const STORAGE_KEY = "dnk_gclid";

export function getStoredGclid() {
  try {
    return localStorage.getItem(STORAGE_KEY) || "";
  } catch (err) {
    return "";
  }
}

// Reads `gclid` from the current URL and stores it, without touching any
// previously stored value when the URL has none. Safe to call on every
// navigation (no-ops, and never throws, if storage is unavailable).
export function captureGclid() {
  if (typeof window === "undefined") return;

  try {
    const gclid = new URLSearchParams(window.location.search).get("gclid");
    if (!gclid) return;

    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing === gclid) return;

    localStorage.setItem(STORAGE_KEY, gclid);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "gclid_captured", gclid });
  } catch (err) {
    console.error("GCLID capture failed:", err);
  }
}
