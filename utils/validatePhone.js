import { parsePhoneNumberFromString, validatePhoneNumberLength } from "libphonenumber-js";

// react-phone-input-2's onChange value is normally digits only (country
// calling code + number, no leading "+"), but a pasted number can carry
// through stray spaces/dashes/parentheses — strip anything non-numeric
// defensively before validating. (A redundant single leading trunk zero,
// e.g. pasting a local-format "0501234567" into an already-UAE-prefixed
// field, is handled correctly by libphonenumber-js itself — no extra
// stripping needed for that case.)
const normalizeDigits = (value) => (value || "").replace(/\D/g, "");

// This checks the number is actually valid for its country (correct
// length/format), not just non-empty — the bug this replaces let any
// non-empty string (e.g. "123") through as a "valid" lead.
export const isValidPhoneNumber = (value) => {
  const digits = normalizeDigits(value);
  if (!digits) return false;
  const parsed = parsePhoneNumberFromString(`+${digits}`);
  return !!parsed && parsed.isValid();
};

// Gives the specific reason a number is invalid (too short, too long, wrong
// country code, etc.) instead of a generic "invalid" message — "" means the
// number is valid (or the field is empty, where no message should show).
export const getPhoneValidationMessage = (value) => {
  const digits = normalizeDigits(value);
  if (!digits) return "";
  const withPlus = `+${digits}`;
  const parsed = parsePhoneNumberFromString(withPlus);
  if (parsed && parsed.isValid()) return "";

  switch (validatePhoneNumberLength(withPlus)) {
    case "TOO_SHORT":
      return "Phone number is too short";
    case "TOO_LONG":
      return "Phone number is too long";
    case "INVALID_COUNTRY":
      return "Unrecognized country code";
    case "NOT_A_NUMBER":
      return "Enter digits only";
    case "INVALID_LENGTH":
      return "Incorrect number of digits";
    default:
      return parsed?.country
        ? `Not a valid ${parsed.country} phone number`
        : "Invalid phone number";
  }
};
