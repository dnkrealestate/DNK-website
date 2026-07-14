"use client";
import { MdArrowUpward, MdArrowDownward, MdRemove } from "react-icons/md";

export default function DeltaBadge({ current, previous }) {
  if (!previous) {
    if (!current) return null;
    return (
      <span className="inline-flex items-center gap-0.5 rounded-full bg-[#0F2C45]/10 px-1.5 py-0.5 text-[11px] font-medium text-[#0F2C45]">
        New
      </span>
    );
  }

  const pct = ((current - previous) / previous) * 100;
  const rounded = Math.round(Math.abs(pct));

  if (rounded === 0) {
    return (
      <span className="inline-flex items-center gap-0.5 rounded-full bg-[#F0F2F5] px-1.5 py-0.5 text-[11px] font-medium text-[#8791A1]">
        <MdRemove /> 0%
      </span>
    );
  }

  const isUp = pct > 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-medium ${
        isUp ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
      }`}
    >
      {isUp ? <MdArrowUpward /> : <MdArrowDownward />}
      {rounded}%
    </span>
  );
}
