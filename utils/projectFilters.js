// Real project data (checked directly against the live database) is messy
// free text — same location typed a dozen different ways, prices mixing
// "AED 1.2M" with "AED 900,000" and "Announcing Soon", bedroom ranges written
// as "1 - 3 BR" or "Studio, 1-4 Bedroom Apartment", handover dates as
// "Q4 - 2027", "Dec 2028", or "TBA". Every function here was built and
// verified against the actual 182-project dataset, not assumed.

const EMIRATES = ["dubai", "abu dhabi", "sharjah", "ras al khaimah", "ajman", "uae", "umm al quwain"];

// Groups near-duplicate location spellings ("Dubai Silicon OASIS" / "Dubai
// Silicon Oasis", "JVC, Dubai" / "Jumeirah Village Circle - JVC") under one
// filter option, while keeping genuinely distinct places (different emirates,
// different sub-areas) separate.
export function normalizeLocationKey(raw) {
  if (!raw) return "";
  let s = raw.trim().toLowerCase();
  s = s.replace(/\s*\([^)]*\)\s*/g, " "); // drop "(JVT)"-style parentheticals entirely

  // Abbreviation directly following its own spelled-out name is redundant — drop it.
  s = s.replace(/\b(jumeirah village circle)\s*-?\s*jvc\b/gi, "$1");
  s = s.replace(/\b(jumeirah village triangle)\s*-?\s*jvt\b/gi, "$1");

  s = s.replace(/\s*-\s*/g, " ");
  s = s.replace(/\s+/g, " ").trim();

  // Strip trailing ", <emirate>" segment(s) — doesn't add filtering value.
  let parts = s.split(",").map((p) => p.trim()).filter(Boolean);
  while (parts.length > 1 && EMIRATES.includes(parts[parts.length - 1])) {
    parts.pop();
  }
  s = parts.join(", ");

  // Standalone abbreviation (not caught above): expand to the full name.
  s = s.replace(/\bjvc\b/gi, "jumeirah village circle");
  s = s.replace(/\bjvt\b/gi, "jumeirah village triangle");
  s = s.replace(/\bdubai island\b/gi, "dubai islands");
  s = s.replace(/(?<!dubai )\bmaritime\b(?! city)/gi, "maritime city");
  s = s.replace(/\bdowntown\b(?! dubai)/gi, "downtown dubai");
  s = s.replace(/(?<!dubai )\bmotor city\b/gi, "dubai motor city");
  s = s.replace(/^dubai maritime city$/gi, "maritime city");

  s = s.replace(/\s+/g, " ").trim();
  return s;
}

// Builds the location filter's option list: one entry per normalized group,
// with a display label (the most common raw spelling in that group) and how
// many projects match it.
export function buildLocationOptions(projects) {
  const groups = new Map(); // key -> { labelCounts: Map<string, number>, count }
  for (const p of projects) {
    const raw = p?.locationname;
    if (!raw || !raw.trim()) continue;
    const key = normalizeLocationKey(raw);
    if (!key) continue;
    if (!groups.has(key)) groups.set(key, { labelCounts: new Map(), count: 0 });
    const group = groups.get(key);
    const label = raw.trim();
    group.labelCounts.set(label, (group.labelCounts.get(label) || 0) + 1);
    group.count += 1;
  }

  return [...groups.entries()]
    .map(([key, { labelCounts, count }]) => {
      const label = [...labelCounts.entries()].sort((a, b) => b[1] - a[1])[0][0];
      return { key, label, count };
    })
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function projectMatchesLocation(project, selectedKeys) {
  if (!selectedKeys || selectedKeys.length === 0) return true;
  const key = normalizeLocationKey(project?.locationname);
  return selectedKeys.includes(key);
}

// --- Price ---------------------------------------------------------------

// Returns a number (in AED) or null when the price can't be meaningfully
// compared as a total starting price (e.g. "Announcing Soon", "Call us", or
// a per-square-foot rate like "AED 3,400 PSF", which isn't the same unit as
// every other project's total price).
export function parsePrice(raw) {
  if (!raw) return null;
  if (/psf|per\s*sq/i.test(raw)) return null;

  let cleaned = raw.replace(/aed/gi, "").trim();
  // "AED 2,66M" — a comma used as a decimal point by mistake. A comma
  // followed by 1-2 digits then directly by the K/M suffix (or nothing) is a
  // decimal typo, not a thousands separator.
  cleaned = cleaned.replace(/(\d),(\d{1,2})(?=\s*[km]\b)/i, "$1.$2");
  cleaned = cleaned.replace(/,/g, "");

  const match = cleaned.match(/([\d.]+)\s*(k|m)?/i);
  if (!match) return null;
  const num = parseFloat(match[1]);
  if (Number.isNaN(num)) return null;

  const suffix = (match[2] || "").toUpperCase();
  let value = num;
  if (suffix === "K") value *= 1_000;
  if (suffix === "M") value *= 1_000_000;
  return Math.round(value);
}

export function projectMatchesPrice(project, minPrice, maxPrice) {
  if (minPrice == null && maxPrice == null) return true;
  const price = parsePrice(project?.startingprice);
  if (price == null) return false;
  if (minPrice != null && price < minPrice) return false;
  if (maxPrice != null && price > maxPrice) return false;
  return true;
}

// --- Bedrooms --------------------------------------------------------------

// Extracts every distinct bedroom value mentioned — "Studio", whole numbers,
// and half-numbers like "1.5" — expanding written ranges ("1 - 4 Bedroom")
// into each individual number so a project matches a filter for any
// bedroom count it covers.
export function extractBedrooms(raw) {
  if (!raw) return [];
  const s = raw.toLowerCase();
  const tokens = new Set();
  if (/\bstudio/.test(s)) tokens.add("Studio");

  const rangeRe = /(\d+)\s*-\s*(\d+)/g;
  const rangesFound = [];
  let m;
  while ((m = rangeRe.exec(s))) {
    const lo = parseInt(m[1], 10);
    const hi = parseInt(m[2], 10);
    if (hi >= lo && hi - lo <= 10) {
      for (let n = lo; n <= hi; n++) tokens.add(String(n));
      rangesFound.push(m[0]);
    }
  }
  let remaining = s;
  for (const r of rangesFound) remaining = remaining.replace(r, " ");

  const numRe = /\d+(\.\d+)?/g;
  let n;
  while ((n = numRe.exec(remaining))) {
    tokens.add(n[0]);
  }
  return [...tokens];
}

export function buildBedroomOptions(projects) {
  const counts = new Map();
  for (const p of projects) {
    for (const token of extractBedrooms(p?.bedroom)) {
      counts.set(token, (counts.get(token) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => {
      if (a.value === "Studio") return -1;
      if (b.value === "Studio") return 1;
      return parseFloat(a.value) - parseFloat(b.value);
    });
}

export function projectMatchesBedrooms(project, selectedValues) {
  if (!selectedValues || selectedValues.length === 0) return true;
  const tokens = extractBedrooms(project?.bedroom);
  return selectedValues.some((v) => tokens.includes(v));
}

// --- Unit type ---------------------------------------------------------

const TYPE_LABELS = {
  skyvilla: "Sky Villa",
};

export function normalizeUnitType(raw) {
  if (!raw) return null;
  const key = raw.trim().toLowerCase().replace(/[-\s]+/g, "");
  if (TYPE_LABELS[key]) return { key, label: TYPE_LABELS[key] };
  const label = raw
    .trim()
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return { key: key, label };
}

export function getProjectUnitTypes(project) {
  const raws = [project?.type, project?.type2, project?.type3, project?.type4, project?.type5, project?.type6];
  const seen = new Map();
  for (const raw of raws) {
    const normalized = normalizeUnitType(raw);
    if (normalized && !seen.has(normalized.key)) seen.set(normalized.key, normalized.label);
  }
  return seen;
}

export function buildUnitTypeOptions(projects) {
  const counts = new Map(); // key -> { label, count }
  for (const p of projects) {
    for (const [key, label] of getProjectUnitTypes(p)) {
      if (!counts.has(key)) counts.set(key, { label, count: 0 });
      counts.get(key).count += 1;
    }
  }
  return [...counts.entries()]
    .map(([key, { label, count }]) => ({ key, label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function projectMatchesUnitType(project, selectedKeys) {
  if (!selectedKeys || selectedKeys.length === 0) return true;
  const keys = [...getProjectUnitTypes(project).keys()];
  return selectedKeys.some((k) => keys.includes(k));
}

// --- Handover ------------------------------------------------------------

export function parseHandoverYear(raw) {
  if (!raw) return null;
  const m = raw.match(/(20\d{2})/);
  return m ? parseInt(m[1], 10) : null;
}

const ANNOUNCING_SOON = "Announcing Soon";

export function buildHandoverOptions(projects) {
  const counts = new Map();
  let announcingSoonCount = 0;
  for (const p of projects) {
    const year = parseHandoverYear(p?.handover);
    if (year) {
      counts.set(year, (counts.get(year) || 0) + 1);
    } else if (p?.handover) {
      announcingSoonCount += 1;
    }
  }
  const options = [...counts.entries()]
    .map(([year, count]) => ({ value: String(year), count }))
    .sort((a, b) => a.value - b.value);
  if (announcingSoonCount > 0) {
    options.push({ value: ANNOUNCING_SOON, count: announcingSoonCount });
  }
  return options;
}

export function projectMatchesHandover(project, selectedValues) {
  if (!selectedValues || selectedValues.length === 0) return true;
  const year = parseHandoverYear(project?.handover);
  const value = year ? String(year) : project?.handover ? ANNOUNCING_SOON : null;
  return value != null && selectedValues.includes(value);
}

// --- Combined --------------------------------------------------------------

export function applyProjectFilters(projects, filters) {
  const { locations, minPrice, maxPrice, unitTypes, bedrooms, handoverYears } = filters;
  return projects.filter(
    (p) =>
      projectMatchesLocation(p, locations) &&
      projectMatchesPrice(p, minPrice, maxPrice) &&
      projectMatchesUnitType(p, unitTypes) &&
      projectMatchesBedrooms(p, bedrooms) &&
      projectMatchesHandover(p, handoverYears)
  );
}
