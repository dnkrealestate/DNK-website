export const metadata = {
  title: "Palm Jebel Ali Beach Villas | Ultra-Luxury Waterfront Living, Dubai",
  description:
    "Reserve a Beach Villa on Palm Jebel Ali — 5-6BR ultra-luxury beachfront residences from AED 30M. Private beach frontage, bespoke design, EOI AED 1M. Register your interest with DNK Real Estate.",
  keywords:
    "Palm Jebel Ali, Palm Jebel Ali Beach Villas, Palm Jebel Ali Coral Villas, Nakheel Palm Jebel Ali, ultra luxury villas Dubai, beachfront villas Dubai, Palm Jebel Ali EOI, Dubai luxury real estate, private beach villa Dubai",
  openGraph: {
    title: "Palm Jebel Ali Beach Villas | Ultra-Luxury Waterfront Living",
    description:
      "5-6BR beachfront villas on Palm Jebel Ali from AED 30M. Private beach, bespoke architecture. Register your interest today.",
    url: "https://www.dnkre.com/palmjebelali/beach-villas",
    siteName: "DNK Real Estate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Palm Jebel Ali Beach Villas | Ultra-Luxury Waterfront Living",
    description:
      "5-6BR beachfront villas on Palm Jebel Ali from AED 30M. Private beach, bespoke architecture. Register your interest today.",
  },
  alternates: {
    canonical: "https://www.dnkre.com/palmjebelali/beach-villas",
  },
  robots: "index, follow",
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Palm Jebel Ali Beach Villas",
  description:
    "Ultra-luxury 5-6 bedroom beachfront villas on Palm Jebel Ali, Dubai. Private beach frontage, plot 7,300–8,800 sqft, BUA 7,600–8,600 sqft. Expression of Interest AED 1,000,000.",
  url: "https://www.dnkre.com/palmjebelali/beach-villas",
  brand: {
    "@type": "Organization",
    name: "Nakheel",
  },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "30000000",
    highPrice: "33000000",
    priceCurrency: "AED",
    availability: "https://schema.org/LimitedAvailability",
    url: "https://www.dnkre.com/palmjebelali/beach-villas",
    seller: {
      "@type": "Organization",
      name: "DNK Real Estate",
      url: "https://dnkre.com",
    },
  },
};

export default function PalmJebelAliBeachVillasLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      {children}
    </>
  );
}
