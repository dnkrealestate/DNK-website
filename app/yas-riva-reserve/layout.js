import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const OG_IMAGE = "/assets/yas-riva-reserve/hero/hero-1.webp";

export const metadata = {
  title: "Yas Riva Reserve by Aldar | 4–6 Bedroom Villas, Yas Island",
  description:
    "Yas Riva Reserve by Aldar — a gated canal-front villa community on Yas Island, Abu Dhabi. 4–6 bedroom inland & waterfront villas from AED 7.9M. 5% booking, 5-year service charge waiver. Register your interest with DNK Real Estate.",
  keywords:
    "Yas Riva Reserve, Aldar Yas Island, Yas Island villas, canal villas Abu Dhabi, waterfront villas Yas Island, Aldar Properties, gated community Abu Dhabi, off-plan villas Abu Dhabi",
  openGraph: {
    title: "Yas Riva Reserve by Aldar | 4–6 Bedroom Villas, Yas Island",
    description:
      "A gated canal-front villa community on Yas Island, Abu Dhabi. 4–6 bedroom villas from AED 7.9M. 5% booking, 5-year service charge waiver.",
    url: "https://www.dnkre.com/yas-riva-reserve",
    siteName: "DNK Real Estate",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1600,
        height: 900,
        alt: "Yas Riva Reserve by Aldar, Yas Island Abu Dhabi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yas Riva Reserve by Aldar | 4–6 Bedroom Villas, Yas Island",
    description:
      "A gated canal-front villa community on Yas Island, Abu Dhabi. 4–6 bedroom villas from AED 7.9M.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: "https://www.dnkre.com/yas-riva-reserve",
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

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Yas Riva Reserve by Aldar",
  description:
    "A gated canal-front villa community on Yas Island, Abu Dhabi. 292 villas (4–6 bedroom, inland & waterfront) starting from AED 7.9M.",
  url: "https://www.dnkre.com/yas-riva-reserve",
  image: `https://www.dnkre.com${OG_IMAGE}`,
  brand: {
    "@type": "Organization",
    name: "Aldar Properties",
  },
  additionalProperty: [
    { "@type": "PropertyValue", name: "Unit Types", value: "4–6 Bedroom Inland & Waterfront Villas" },
    { "@type": "PropertyValue", name: "Total Units", value: "292" },
    { "@type": "PropertyValue", name: "Booking", value: "5%" },
  ],
  offers: {
    "@type": "Offer",
    price: "7900000",
    priceCurrency: "AED",
    availability: "https://schema.org/InStock",
    url: "https://www.dnkre.com/yas-riva-reserve",
    seller: {
      "@type": "RealEstateAgent",
      name: "DNK Real Estate",
      url: "https://dnkre.com",
      telephone: "+971555769195",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Suite No: 603, Sama Building, Al Barsha 1",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
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
      name: "Yas Riva Reserve",
      item: "https://www.dnkre.com/yas-riva-reserve",
    },
  ],
};

export default function YasRivaReserveLayout({ children }) {
  return (
    <div className={cormorant.variable}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </div>
  );
}
