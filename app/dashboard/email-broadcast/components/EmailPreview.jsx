"use client";

import { useMemo, useState } from "react";
import { MdDesktopWindows, MdPhoneIphone } from "react-icons/md";
import { renderEmailPreviewHtml } from "@/app/dashboard/utils/renderEmailPreviewHtml";

export default function EmailPreview({ blocks }) {
  const [device, setDevice] = useState("desktop");

  const html = useMemo(() => renderEmailPreviewHtml(blocks), [blocks]);

  return (
    <div className="flex h-full flex-col rounded-lg border border-[#E5E8EE]">
      <div className="flex items-center justify-center gap-1 border-b border-[#E5E8EE] bg-[#F8F9FB] p-2">
        <button
          type="button"
          onClick={() => setDevice("desktop")}
          className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
            device === "desktop"
              ? "bg-white text-[#0F2C45] shadow-sm"
              : "text-[#9AA4B2] hover:text-[#0F2C45]"
          }`}
          title="Desktop preview"
        >
          <MdDesktopWindows />
        </button>
        <button
          type="button"
          onClick={() => setDevice("mobile")}
          className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
            device === "mobile"
              ? "bg-white text-[#0F2C45] shadow-sm"
              : "text-[#9AA4B2] hover:text-[#0F2C45]"
          }`}
          title="Mobile preview"
        >
          <MdPhoneIphone />
        </button>
      </div>

      <div className="flex flex-1 justify-center overflow-y-auto bg-[#EDEFF3] p-4">
        <iframe
          key={device}
          title="Email preview"
          srcDoc={html}
          className={`h-full rounded-md border border-[#D7DCE3] bg-white shadow-sm transition-all ${
            device === "mobile" ? "w-[375px]" : "w-full max-w-[640px]"
          }`}
        />
      </div>
    </div>
  );
}
