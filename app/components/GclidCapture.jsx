"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureGclid } from "@/utils/gclid";

// Mounted once in the root layout. Re-runs on every route change (cheap,
// idempotent) to also catch a gclid on an internal link that happens to
// carry one, not just the very first landing page.
export default function GclidCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureGclid();
  }, [pathname]);

  return null;
}
