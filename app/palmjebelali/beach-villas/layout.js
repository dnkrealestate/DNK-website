import Script from "next/script";

const OG_IMAGE = "/assets/other/palmjebelaliImg.webp";

export const metadata = {
  title: "Palm Jebel Ali Beach Villas | Ultra-Luxury Waterfront Living, Dubai",
  description:
    "Reserve a Beach Villa on Palm Jebel Ali — 5-6BR ultra-luxury beachfront residences from AED 30M (~USD 8.2M). Private beach frontage, bespoke design, EOI AED 1M (~USD 272K). Register your interest with DNK Real Estate.",
  keywords:
    "Palm Jebel Ali, Palm Jebel Ali Beach Villas, Palm Jebel Ali Coral Villas, Nakheel Palm Jebel Ali, ultra luxury villas Dubai, beachfront villas Dubai, Palm Jebel Ali EOI, Dubai luxury real estate, private beach villa Dubai",
  openGraph: {
    title: "Palm Jebel Ali Beach Villas | Ultra-Luxury Waterfront Living",
    description:
      "5-6BR beachfront villas on Palm Jebel Ali from AED 30M (~USD 8.2M). Private beach, bespoke architecture. Register your interest today.",
    url: "https://www.dnkre.com/palmjebelali/beach-villas",
    siteName: "DNK Real Estate",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1920,
        height: 1068,
        alt: "Aerial view of Palm Jebel Ali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Palm Jebel Ali Beach Villas | Ultra-Luxury Waterfront Living",
    description:
      "5-6BR beachfront villas on Palm Jebel Ali from AED 30M (~USD 8.2M). Private beach, bespoke architecture. Register your interest today.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: "https://www.dnkre.com/palmjebelali/beach-villas",
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
  name: "Palm Jebel Ali Beach Villas",
  description:
    "Ultra-luxury 5-6 bedroom beachfront villas on Palm Jebel Ali, Dubai. Private beach frontage, plot 7,300–8,800 sqft, BUA 7,600–8,600 sqft. Expression of Interest AED 1,000,000 (~USD 272,000).",
  url: "https://www.dnkre.com/palmjebelali/beach-villas",
  image: `https://www.dnkre.com${OG_IMAGE}`,
  brand: {
    "@type": "Organization",
    name: "Nakheel",
  },
  additionalProperty: [
    { "@type": "PropertyValue", name: "Bedrooms", value: "5–6 BR" },
    { "@type": "PropertyValue", name: "Plot Size", value: "7,300–8,800 sqft" },
    { "@type": "PropertyValue", name: "BUA", value: "7,600–8,600 sqft" },
  ],
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "30000000",
    highPrice: "33000000",
    priceCurrency: "AED",
    availability: "https://schema.org/LimitedAvailability",
    url: "https://www.dnkre.com/palmjebelali/beach-villas",
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
      name: "Palm Jebel Ali Beach Villas",
      item: "https://www.dnkre.com/palmjebelali/beach-villas",
    },
  ],
};

export default function PalmJebelAliBeachVillasLayout({ children }) {
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

      {/* Google Ads conversion tag — scoped to this campaign page */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-16927541094"
        strategy="afterInteractive"
      />
      <Script id="pj-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16927541094');
        `}
      </Script>

      {children}
    </>
  );
}
