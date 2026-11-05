import { Playfair_Display, Manrope } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const OG_IMAGE =
  "https://www.dnkre.com/assets/palm-springs-nakheel/images/hero-waterfront-sunset.png";
const PAGE_URL = "https://www.dnkre.com/palm-springs-nakheel-premium";

export const metadata = {
  title: "Palm Springs by Nakheel | Private Waterfront Presentation | DNK Real Estate",
  description:
    "A private waterfront presentation of Palm Springs by Nakheel, Dubai — 3 & 4 bedroom townhouses and 4 & 5 bedroom villas, as advertised from AED 3.8M. Register with DNK Real Estate for verified details.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Palm Springs by Nakheel | Private Waterfront Presentation",
    description:
      "An exclusive waterfront residence collection by Nakheel, Dubai. As advertised from AED 3.8M — register with DNK Real Estate for verified project details.",
    url: PAGE_URL,
    siteName: "DNK Real Estate",
    images: [{ url: OG_IMAGE, width: 1674, height: 940, alt: "Palm Springs by Nakheel — waterfront villas at sunset" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Palm Springs by Nakheel | DNK Real Estate",
    description:
      "An exclusive waterfront residence collection by Nakheel, Dubai. As advertised from AED 3.8M.",
    images: [OG_IMAGE],
  },
  robots: "index, follow",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.dnkre.com/" },
    { "@type": "ListItem", position: 2, name: "Palm Springs by Nakheel", item: PAGE_URL },
  ],
};

export default function PalmSpringsPremiumLayout({ children }) {
  return (
    <div className={`${playfair.variable} ${manrope.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </div>
  );
}
