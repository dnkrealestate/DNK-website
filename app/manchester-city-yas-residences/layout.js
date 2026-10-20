const OG_IMAGE = "/assets/manchester-city-yas/video/hero-poster.webp";

export const metadata = {
  title: "Manchester City Yas Residences | Ohana Development, Yas Island Abu Dhabi",
  description:
    "Manchester City Yas Residences by Ohana — waterfront villas, duplexes & townhouses on Yas Canal, Yas Island, Abu Dhabi. Starting from AED 3.5M, 30/70 payment plan, 5% down payment. Register your interest with DNK Real Estate.",
  keywords:
    "Manchester City Yas Residences, Ohana Development, Yas Island Abu Dhabi, Yas Canal villas, waterfront townhouses Abu Dhabi, Manchester City branded residences, luxury villas Yas Island, off-plan Abu Dhabi real estate",
  openGraph: {
    title: "Manchester City Yas Residences | Ohana Development, Yas Island Abu Dhabi",
    description:
      "Waterfront villas, duplexes & townhouses on Yas Canal from AED 3.5M. 30/70 payment plan, 5% down payment. Register your interest today.",
    url: "https://www.dnkre.com/manchester-city-yas-residences",
    siteName: "DNK Real Estate",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1920,
        height: 1080,
        alt: "Manchester City Yas Residences by Ohana, Yas Island Abu Dhabi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manchester City Yas Residences | Ohana Development, Yas Island Abu Dhabi",
    description:
      "Waterfront villas, duplexes & townhouses on Yas Canal from AED 3.5M. 30/70 payment plan, 5% down payment.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: "https://www.dnkre.com/manchester-city-yas-residences",
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
  name: "Manchester City Yas Residences by Ohana",
  description:
    "Waterfront villas, duplexes and townhouses on Yas Canal, Yas Island, Abu Dhabi. Starting from AED 3.5M with a 30/70 payment plan and 5% down payment.",
  url: "https://www.dnkre.com/manchester-city-yas-residences",
  image: `https://www.dnkre.com${OG_IMAGE}`,
  brand: {
    "@type": "Organization",
    name: "Ohana Development",
  },
  additionalProperty: [
    { "@type": "PropertyValue", name: "Unit Types", value: "Luxury Waterfront Villas & Townhouses" },
    { "@type": "PropertyValue", name: "Payment Plan", value: "30/70" },
    { "@type": "PropertyValue", name: "Down Payment", value: "5%" },
  ],
  offers: {
    "@type": "Offer",
    price: "3500000",
    priceCurrency: "AED",
    availability: "https://schema.org/InStock",
    url: "https://www.dnkre.com/manchester-city-yas-residences",
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
      name: "Manchester City Yas Residences",
      item: "https://www.dnkre.com/manchester-city-yas-residences",
    },
  ],
};

export default function ManchesterCityYasResidencesLayout({ children }) {
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
