// Shared Google Ads click-conversion reporter for lead-intent CTAs
// (Register buttons, WhatsApp links, Call links) across the Palm Jebel Ali
// pages. None of these clicks unload the current tab in a way that could
// cut the beacon short — Register opens an in-page popup, WhatsApp opens a
// new tab, and tel: links hand off to the OS dialer — so `url` is optional
// and, when omitted, this just fires the event without redirecting.
export function gtag_report_conversion(url) {
  const callback = function () {
    if (typeof url !== "undefined") {
      window.location = url;
    }
  };
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: "AW-16927541094/lNkkCP3B5qwaEOaO14c_",
      value: 1.0,
      currency: "AED",
      event_callback: callback,
    });
  }
  return false;
}
