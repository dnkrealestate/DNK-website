const OG_IMAGE = "/assets/damac-lagoons/hero-poster.webp";

export const metadata = {
  title: "Sorrento Lagoon Views | Damac Lagoons Apartments, Dubailand",
  description:
    "Sorrento Lagoon Views at Damac Lagoons — Studio & 1 Bedroom Mediterranean-inspired apartments in Dubailand, Dubai. Starting from AED 680K, 50/50 payment plan, 4% DLD fee waiver. Register your interest with DNK Real Estate.",
  keywords:
    "Damac Lagoons, Sorrento Lagoon Views, Damac Lagoons apartments, Damac Lagoons Dubailand, studio apartment Dubai, 1 bedroom apartment Dubai, off-plan apartments Dubai, Damac Properties, Dubai lagoon community",
  openGraph: {
    title: "Sorrento Lagoon Views | Damac Lagoons Apartments, Dubailand",
    description:
      "Studio & 1 Bedroom Mediterranean-inspired apartments at Damac Lagoons from AED 680K. 50/50 payment plan, 4% DLD fee waiver. Register your interest today.",
    url: "https://www.dnkre.com/damac-lagoons-apartments",
    siteName: "DNK Real Estate",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1920,
        height: 1080,
        alt: "Sorrento Lagoon Views apartments at Damac Lagoons, Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sorrento Lagoon Views | Damac Lagoons Apartments, Dubailand",
    description:
      "Studio & 1 Bedroom Mediterranean-inspired apartments at Damac Lagoons from AED 680K. 50/50 payment plan, 4% DLD fee waiver. Register your interest today.",
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
  name: "Sorrento Lagoon Views - Damac Lagoons",
  description:
    "Studio & 1 Bedroom Mediterranean-inspired apartments at Sorrento Lagoon Views, Damac Lagoons, Dubailand. Starting from AED 680K with a 50/50 payment plan and 4% DLD fee waiver.",
  url: "https://www.dnkre.com/damac-lagoons-apartments",
  image: `https://www.dnkre.com${OG_IMAGE}`,
  brand: {
    "@type": "Organization",
    name: "Damac Properties",
  },
  additionalProperty: [
    { "@type": "PropertyValue", name: "Unit Types", value: "Studio & 1 Bedroom Apartments" },
    { "@type": "PropertyValue", name: "Payment Plan", value: "50/50" },
    { "@type": "PropertyValue", name: "DLD Fee Waiver", value: "4%" },
  ],
  offers: {
    "@type": "Offer",
    price: "680000",
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
