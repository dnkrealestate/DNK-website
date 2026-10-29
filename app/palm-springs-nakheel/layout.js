import { Cormorant_Garamond, Manrope } from "next/font/google";
import { FAQ_ITEMS } from "./faqData";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const OG_IMAGE = "/assets/palm-springs-nakheel/images/hero-waterfront-sunset.png";

export const metadata = {
  title: "Palm Springs by Nakheel | Townhouses & Villas, Dubai",
  description:
    "Palm Springs by Nakheel — 3 & 4-bedroom townhouses and 4 & 5-bedroom villas on Dubai's waterfront, advertised from AED 3.8M. Register your interest with DNK Real Estate for verified pricing and floor plans.",
  keywords:
    "Palm Springs Nakheel, Nakheel Dubai villas, Palm Springs Dubai, Nakheel new launch, Dubai waterfront villas, Nakheel townhouses Dubai",
  openGraph: {
    title: "Palm Springs by Nakheel | Townhouses & Villas, Dubai",
    description:
      "3 & 4-bedroom townhouses and 4 & 5-bedroom villas, advertised from AED 3.8M. Register your interest with DNK Real Estate.",
    url: "https://www.dnkre.com/palm-springs-nakheel",
    siteName: "DNK Real Estate",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1674,
        height: 940,
        alt: "Palm Springs by Nakheel — waterfront villa community at sunset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Palm Springs by Nakheel | Waterfront Villas, Dubai",
    description: "A new residential vision by Nakheel on Dubai's waterfront. Register your interest today.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://www.dnkre.com/palm-springs-nakheel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.dnkre.com" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Palm Springs by Nakheel",
      item: "https://www.dnkre.com/palm-springs-nakheel",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function PalmSpringsNakheelLayout({ children }) {
  return (
    <div className={`${cormorant.variable} ${manrope.variable} font-[family-name:var(--font-body)]`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </div>
  );
}
