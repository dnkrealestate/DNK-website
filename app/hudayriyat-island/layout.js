export const metadata = {
  title: "Hudayriyat Island Abu Dhabi | Waterfront Living by Modon",
  description:
    "Discover Hudayriyat Island – Abu Dhabi's newest landmark waterfront community. 1-4 bedroom apartments starting from AED 2.3 Million. 10% booking, 50/50 payment plan, Q4 2029 handover by Modon.",
  keywords:
    "Hudayriyat Island, Abu Dhabi off-plan, Modon properties, waterfront apartments Abu Dhabi, island living Abu Dhabi, Hudayriyat real estate",
  openGraph: {
    title: "Hudayriyat Island Abu Dhabi | Waterfront Living by Modon",
    description:
      "Experience serene island living with world-class leisure attractions. Starting AED 2.3M with 10% booking.",
    url: "https://www.dnkre.com/hudayriyat-island",
    siteName: "DNK Real Estate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hudayriyat Island Abu Dhabi | Waterfront Living by Modon",
    description:
      "Experience serene island living with world-class leisure attractions. Starting AED 2.3M with 10% booking.",
  },
  alternates: {
    canonical: "https://www.dnkre.com/hudayriyat-island",
  },
  robots: "index, follow",
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Hudayriyat Island Abu Dhabi",
  description:
    "Discover Hudayriyat Island – Abu Dhabi's newest landmark waterfront community. 1-4 bedroom apartments starting from AED 2.3 Million. 10% booking, 50/50 payment plan, Q4 2029 handover by Modon.",
  url: "https://www.dnkre.com/hudayriyat-island",
  brand: {
    "@type": "Organization",
    name: "Modon Properties",
  },
  offers: {
    "@type": "Offer",
    price: "2300000",
    priceCurrency: "AED",
    availability: "https://schema.org/InStock",
    url: "https://www.dnkre.com/hudayriyat-island",
    seller: {
      "@type": "Organization",
      name: "DNK Real Estate",
      url: "https://dnkre.com",
    },
  },
};

export default function HudayriyatLayout({ children }) {
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
