"use client";

import { FaCrown } from "react-icons/fa";
import RmAvatar from "./RmAvatar";
import { useAutoFitGrid } from "../hooks/useAutoFitGrid";

const RANK_ACCENT = {
  0: "border-[#FFC700]/50 bg-[#FFC700]/10",
  1: "border-white/20 bg-white/[0.06]",
  2: "border-[#CE8745]/40 bg-[#CE8745]/10",
};

export default function RmLeaderboard({
  icon: Icon,
  title,
  entries,
  directory,
  pulsingNames,
  message,
}) {
  const total = entries.reduce((sum, e) => sum + e.count, 0);
  const [leader, ...rest] = entries;
  const { containerRef, cols, rows, rowHeight } = useAutoFitGrid(rest.length);

  const fontSize = Math.max(10, Math.min(15, rowHeight * 0.32));
  const avatarSize = Math.max(18, Math.min(36, rowHeight * 0.68));
  const rowGap = rowHeight < 34 ? 4 : 6;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm sm:p-5">
      <div className="mb-3 flex shrink-0 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CE8745]/20 text-[#CE8745]">
            <Icon />
          </span>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white/80 sm:text-base">
            {title}
          </h2>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
          {total} total
        </span>
      </div>

      {/* Friendly live-update banner */}
      <div
        className={`shrink-0 overflow-hidden transition-all duration-500 ${
          message ? "mb-3 max-h-16 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex items-center gap-2 rounded-lg border border-[#18A4A0]/40 bg-[#18A4A0]/10 px-3 py-2 text-sm text-white">
          <span className="text-lg">🎉</span>
          <span className="truncate">{message}</span>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center text-white/40">
          <Icon className="text-3xl" />
          <p className="text-sm">No {title.toLowerCase()} yet.</p>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">
          {/* Leader hero card */}
          {leader && (
            <div
              className={`relative mb-2 flex shrink-0 items-center gap-3 rounded-xl border p-3 transition-colors duration-700 sm:p-4 ${
                pulsingNames?.has(leader.name)
                  ? "animate-greenPulse border-transparent"
                  : "border-[#FFC700]/40 bg-gradient-to-r from-[#FFC700]/15 to-transparent"
              }`}
            >
              <FaCrown className="absolute -top-2.5 left-3 text-lg text-[#FFC700] drop-shadow" />
              <RmAvatar name={leader.name} directory={directory} size={52} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-semibold text-white sm:text-lg mb-0">
                  {leader.name}
                </p>
                <p className="text-xs text-white/50">Leading</p>
              </div>
              <span className="shrink-0 text-2xl font-bold text-[#FFC700] sm:text-3xl">
                {leader.count.toString().padStart(2, "0")}
              </span>
            </div>
          )}

          {/* Ranked grid — packs into columns/rows to fit everyone without scrolling.
              grid-auto-flow: column so rank order reads top-to-bottom within a
              column first, then continues at the top of the next column. */}
          <div
            ref={containerRef}
            className="grid min-h-0 flex-1 content-start overflow-hidden"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rows}, minmax(0, ${rowHeight}px))`,
              gridAutoFlow: "column",
              gap: rowGap,
            }}
          >
            {rest.map((entry, i) => {
              const rank = i + 1; // 0 = leader, already rendered above
              const accent = RANK_ACCENT[rank] || "border-white/10 bg-white/[0.03]";
              const pulsing = pulsingNames?.has(entry.name);
              return (
                <div
                  key={entry.name + i}
                  className={`flex min-w-0 items-center gap-2 rounded-lg border px-2.5 transition-colors duration-700 ${
                    pulsing ? "animate-greenPulse border-transparent" : accent
                  }`}
                  style={{ height: rowHeight }}
                >
                  <span
                    className="w-4 shrink-0 text-center font-semibold text-white/40"
                    style={{ fontSize }}
                  >
                    {rank + 1}
                  </span>
                  <RmAvatar name={entry.name} directory={directory} size={avatarSize} />
                  <p
                    className="mb-0 min-w-0 flex-1 truncate text-white/90"
                    style={{ fontSize }}
                  >
                    {entry.name}
                  </p>
                  <span
                    className="shrink-0 font-semibold text-white"
                    style={{ fontSize }}
                  >
                    {entry.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
