import HomeDamacIslands from './components/HomeDamacIslands'

const title = "Damac Islands | Villas & Townhouses | Dubailand, Dubai";
const description = "Discover Damac Islands in Dubailand, Dubai — a tropical, island-inspired community of villas and townhouses starting from AED 2.75M, with lagoons, an aqua park, jungle river and resort-style amenities.";
const canonicalUrl = "https://www.dnkre.com/damac-islands";
const ogImage = "/assets/damac-islands/hero-poster.webp";
const iconUrl = "https://dnkserver.com/e42c7012-8478-4b82-9735-b2b3c05123e8damac.svg";

export const metadata = {
  title,
  description,
  keywords: "Damac Islands, Damac Islands Dubai, villas Dubailand, townhouses for sale Dubai, island themed community Dubai, Damac Properties, off-plan villas Dubai, investment property Dubai",
  authors: [{ name: "DNK Real Estate" }],
  robots: "index, follow",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
    type: "website",
    images: [{ url: ogImage, width: 1920, height: 1080, alt: "Damac Islands villas and lagoons in Dubailand" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  icons: {
    icon: iconUrl,
    apple: iconUrl,
    shortcut: iconUrl,
  },
};

const jsonLdSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DNK Real Estate",
    logo: "https://www.dnkre.com/favicon.ico",
    url: "https://www.dnkre.com",
    sameAs: [
      "https://www.instagram.com/dnk_re/",
      "https://www.facebook.com/dnkrealestate1/",
      "https://www.linkedin.com/company/dnkrealestate/",
      "https://www.youtube.com/channel/UCKH7d3Sx2dkfb4pEXXaMpFA",
    ],
    telephone: "+971555769195",
    email: "info@dnkre.com",
    address:
      "Suite No: 603, Sama Building, Al Barsha 1 - Al Barsha, Dubai, United Arab Emirates",
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Damac Islands - Villas & Townhouses",
    description:
      "Tropical, island-inspired villas and townhouses at Damac Islands, Dubailand. Lagoons, aqua park, jungle river and resort-style amenities.",
    image: `https://www.dnkre.com${ogImage}`,
    url: canonicalUrl,
    brand: {
      "@type": "Organization",
      name: "Damac Properties",
    },
    offers: {
      "@type": "Offer",
      price: "2750000",
      priceCurrency: "AED",
      availability: "https://schema.org/InStock",
      url: canonicalUrl,
      seller: {
        "@type": "RealEstateAgent",
        name: "DNK Real Estate",
        url: "https://www.dnkre.com",
        telephone: "+971555769195",
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.dnkre.com" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Damac Islands",
        item: canonicalUrl,
      },
    ],
  },
];

export default function DamacIslandsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchemas) }}
      />
      <HomeDamacIslands />
    </>
  )
}
