export const normalizeRmName = (value) =>
  (value || "")
    .toString()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

// Finds the best match for `name` within `candidateNames` (plain strings).
// Historical records are inconsistent — mixed casing, stray whitespace, and
// often just a first name ("nandini" for "Nandini Talwar") — so this tries an
// exact match first, then falls back to a first-name match but ONLY when it
// resolves to exactly one candidate. An ambiguous match (two people sharing a
// first name) would silently apply to the wrong person, which is worse than
// no match at all — safely returns null instead.
export function findBestNameMatch(name, candidateNames) {
  const target = normalizeRmName(name);
  if (!target || !Array.isArray(candidateNames)) return null;

  const exact = candidateNames.find((c) => normalizeRmName(c) === target);
  if (exact) return exact;

  const targetFirst = target.split(" ")[0];
  const candidates = candidateNames.filter(
    (c) => normalizeRmName(c).split(" ")[0] === targetFirst
  );
  return candidates.length === 1 ? candidates[0] : null;
}
