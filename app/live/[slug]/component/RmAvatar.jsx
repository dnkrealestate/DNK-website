"use client";

import { useState } from "react";
import { findBestNameMatch } from "@/utils/matchRmName";

const AVATAR_COLORS = [
  "bg-[#CE8745]",
  "bg-[#18A4A0]",
  "bg-[#5B7FDE]",
  "bg-[#B15BDE]",
  "bg-[#DE5B7F]",
  "bg-[#5BDE9E]",
];

function colorForName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// Matches a recorded "sourcedRm" name string against the live Bitrix directory
// to find a photo. Names that don't match anyone (former staff, typos,
// one-off manual entries) safely fall back to an initials avatar — this must
// never throw.
export function findRmInDirectory(name, directory) {
  if (!Array.isArray(directory)) return null;
  const matchedName = findBestNameMatch(
    name,
    directory.map((u) => u.name)
  );
  if (!matchedName) return null;
  return directory.find((u) => u.name === matchedName) || null;
}

export default function RmAvatar({ name, directory, size = 44 }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const match = findRmInDirectory(name, directory);
  // Bitrix returns raw, unencoded paths — filenames with spaces (e.g. "Vivek
  // Nair.png") break as a literal <img src>, so encode before using it.
  const photo = !photoFailed && match?.photo ? encodeURI(match.photo) : null;
  const initial = (name || "?").trim().charAt(0).toUpperCase() || "?";

  const style = { width: size, height: size };

  if (photo) {
    return (
      <img
        src={photo}
        alt={name || "RM"}
        style={style}
        className="shrink-0 rounded-full object-cover ring-2 ring-white/20"
        onError={() => setPhotoFailed(true)}
      />
    );
  }

  return (
    <div
      style={style}
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-white ring-2 ring-white/20 ${colorForName(
        name || "?"
      )}`}
    >
      <span style={{ fontSize: size * 0.4 }}>{initial}</span>
    </div>
  );
}
