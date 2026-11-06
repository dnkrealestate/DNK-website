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
  title: "Palm Springs by Nakheel | Pre-Launch Townhouses & Villas, Dubai",
  description:
    "Palm Springs by Nakheel in Jebel Ali, Dubai — new pre-launch townhouses and villas expected from $1.03M. Register now for pricing, floor plans and the first release.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Palm Springs by Nakheel | Pre-Launch Townhouses & Villas, Dubai",
    description:
      "A new Nakheel community in Jebel Ali, Dubai. Townhouses and villas expected from $1.03M — register now for pricing, floor plans and the first release.",
    url: PAGE_URL,
    siteName: "Palm Springs by Nakheel",
    images: [{ url: OG_IMAGE, width: 1674, height: 940, alt: "Palm Springs by Nakheel — villas at sunset" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Palm Springs by Nakheel | Pre-Launch, Jebel Ali",
    description:
      "New townhouses and villas by Nakheel in Jebel Ali, Dubai, expected from $1.03M. Register now for the first release.",
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
