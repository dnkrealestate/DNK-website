// Curated set of Google Fonts for the WhatsApp invitation editor. Each `family`
// value is the exact Google Fonts CSS2 API name (spaces -> "+"); `value` is the
// CSS font-family string to apply inline once the stylesheet is loaded.
export const GOOGLE_FONTS = [
  { label: "Poppins", family: "Poppins", value: "'Poppins', sans-serif" },
  { label: "Roboto", family: "Roboto", value: "'Roboto', sans-serif" },
  { label: "Open Sans", family: "Open+Sans", value: "'Open Sans', sans-serif" },
  { label: "Montserrat", family: "Montserrat", value: "'Montserrat', sans-serif" },
  { label: "Lato", family: "Lato", value: "'Lato', sans-serif" },
  { label: "Inter", family: "Inter", value: "'Inter', sans-serif" },
  { label: "Nunito", family: "Nunito", value: "'Nunito', sans-serif" },
  { label: "Raleway", family: "Raleway", value: "'Raleway', sans-serif" },
  { label: "Oswald", family: "Oswald", value: "'Oswald', sans-serif" },
  { label: "Playfair Display", family: "Playfair+Display", value: "'Playfair Display', serif" },
  { label: "Merriweather", family: "Merriweather", value: "'Merriweather', serif" },
  { label: "Lora", family: "Lora", value: "'Lora', serif" },
  { label: "Dancing Script", family: "Dancing+Script", value: "'Dancing Script', cursive" },
  { label: "Pacifico", family: "Pacifico", value: "'Pacifico', cursive" },
  { label: "Bebas Neue", family: "Bebas+Neue", value: "'Bebas Neue', sans-serif" },
  { label: "Quicksand", family: "Quicksand", value: "'Quicksand', sans-serif" },
];

export function buildGoogleFontsUrl(familyNames) {
  const params = familyNames
    .map((family) => `family=${family}:wght@400;500;600;700`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}

export const ALL_GOOGLE_FONTS_URL = buildGoogleFontsUrl(GOOGLE_FONTS.map((f) => f.family));

export function findFontByValue(value) {
  return GOOGLE_FONTS.find((f) => f.value === value);
}
