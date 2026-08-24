export const metadata = {
  title: "Register Your Interest | Palm Jebel Ali Beach Villas",
  description:
    "Reserve a Beach Villa on Palm Jebel Ali. Submit your details to receive floor plans, pricing and priority allocation from DNK Real Estate.",
  alternates: {
    canonical: "https://www.dnkre.com/palmjebelali/beach-villas",
  },
  // Thin, form-only landing page built for paid traffic — kept out of the
  // search index so it doesn't compete with the full main page for rankings.
  robots: {
    index: false,
    follow: true,
  },
};

export default function PalmJebelAliFormLayout({ children }) {
  return children;
}
