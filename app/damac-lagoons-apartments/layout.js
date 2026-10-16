const OG_IMAGE = "/assets/damac-lagoons/hero-poster.webp";

export const metadata = {
  title: "Damac Lagoons Apartments | Lagoon Views 1 & 2 BR, Dubailand",
  description:
    "Lagoon Views at Damac Lagoons — 1 & 2 bedroom Mediterranean-inspired apartments in Dubailand, Dubai. Starting from AED 1.353M, handover Q4 2027. Register your interest with DNK Real Estate.",
  keywords:
    "Damac Lagoons, Damac Lagoons apartments, Lagoon Views Damac, Damac Lagoons Dubailand, 1 bedroom apartment Dubai, 2 bedroom apartment Dubai, off-plan apartments Dubai, Damac Properties, Dubai lagoon community",
  openGraph: {
    title: "Damac Lagoons Apartments | Lagoon Views 1 & 2 BR, Dubailand",
    description:
      "1 & 2 bedroom Mediterranean-inspired apartments at Damac Lagoons from AED 1.353M. Handover Q4 2027. Register your interest today.",
    url: "https://www.dnkre.com/damac-lagoons-apartments",
    siteName: "DNK Real Estate",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1920,
        height: 1080,
        alt: "Lagoon Views apartments at Damac Lagoons, Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Damac Lagoons Apartments | Lagoon Views 1 & 2 BR, Dubailand",
    description:
      "1 & 2 bedroom Mediterranean-inspired apartments at Damac Lagoons from AED 1.353M. Handover Q4 2027. Register your interest today.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: "https://www.dnkre.com/damac-lagoons-apartments",
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
  name: "Damac Lagoons Apartments - Lagoon Views",
  description:
    "1 & 2 bedroom Mediterranean-inspired apartments at Lagoon Views, Damac Lagoons, Dubailand. Sizes up to 1,418 sqft (1BR) and 1,797 sqft (2BR). Handover Q4 2027.",
  url: "https://www.dnkre.com/damac-lagoons-apartments",
  image: `https://www.dnkre.com${OG_IMAGE}`,
  brand: {
    "@type": "Organization",
    name: "Damac Properties",
  },
  additionalProperty: [
    { "@type": "PropertyValue", name: "Unit Types", value: "1 & 2 Bedroom Apartments" },
    { "@type": "PropertyValue", name: "1BR Size", value: "Up to 1,418 sqft" },
    { "@type": "PropertyValue", name: "2BR Size", value: "Up to 1,797 sqft" },
    { "@type": "PropertyValue", name: "Handover", value: "Q4 2027" },
  ],
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "1353000",
    highPrice: "1801000",
    priceCurrency: "AED",
    availability: "https://schema.org/InStock",
    url: "https://www.dnkre.com/damac-lagoons-apartments",
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
      name: "Damac Lagoons Apartments",
      item: "https://www.dnkre.com/damac-lagoons-apartments",
    },
  ],
};

export default function DamacLagoonsApartmentsLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
