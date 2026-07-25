// Shared between the roadshow create/edit form (CreateRoadshow.jsx) and the
// /live/[slug] wallboard clock (VenueClock.jsx) so the country label shown
// on the clock always matches what was picked when the roadshow was set up.
export const TIMEZONE_OPTIONS = [
  { value: "Asia/Kolkata", label: "India", abbr: "IST" },
  { value: "Asia/Dubai", label: "UAE", abbr: "GST" },
  { value: "Asia/Riyadh", label: "Saudi Arabia", abbr: "AST" },
  { value: "Asia/Qatar", label: "Qatar", abbr: "AST" },
  { value: "Asia/Kuwait", label: "Kuwait", abbr: "AST" },
  { value: "Asia/Bahrain", label: "Bahrain", abbr: "AST" },
  { value: "Asia/Muscat", label: "Oman", abbr: "GST" },
  { value: "Asia/Karachi", label: "Pakistan", abbr: "PKT" },
  { value: "Asia/Dhaka", label: "Bangladesh", abbr: "BST" },
  { value: "Europe/London", label: "United Kingdom", abbr: "GMT/BST" },
  { value: "America/New_York", label: "US Eastern", abbr: "ET" },
];

export function getTimezoneLabel(timezone) {
  return TIMEZONE_OPTIONS.find((tz) => tz.value === timezone) || null;
}
