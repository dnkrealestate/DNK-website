"use client";

export const DATE_RANGES = [
  { value: 1, label: "24h" },
  { value: 7, label: "7d" },
  { value: 30, label: "30d" },
  { value: 182, label: "6m" },
  { value: 365, label: "12m" },
];

export default function DateRangeSelect({ value, onChange }) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-lg bg-[#E9ECF1] p-1">
      {DATE_RANGES.map((range) => (
        <button
          key={range.value}
          onClick={() => onChange(range.value)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            value === range.value
              ? "bg-white text-[#0F2C45] shadow-sm"
              : "text-[#5B6472] hover:text-[#0F2C45]"
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
