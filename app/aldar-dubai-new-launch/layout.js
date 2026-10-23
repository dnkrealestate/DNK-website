import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const OG_IMAGE = "/assets/aldar-dubai-launch/images/masterplan-pin.webp";

export const metadata = {
  title: "Aldar New Launch in Dubai | Villas, Townhouses & Payment Plan",
  description:
    "Explore Aldar's advertised new residential launch in Dubai, with three-bedroom townhouses from AED 2.875M, villas from AED 3.95M, and a 55/45 payment plan.",
  keywords:
    "Aldar new launch Dubai, Aldar townhouses Dubai, Aldar villas Dubai, Al Ain Road E66, Dubai Silicon Oasis villas, Academic City townhouses, Aldar Dubai 55/45 payment plan",
  icons: {
    icon: [
      { url: "/assets/aldar-dubai-launch/logos/logo-aldar-ink.svg", type: "image/svg+xml" },
    ],
    shortcut: "/assets/aldar-dubai-launch/logos/logo-aldar-ink.svg",
    apple: "/assets/aldar-dubai-launch/logos/logo-aldar-ink.svg",
  },
  openGraph: {
    title: "Aldar New Launch in Dubai | Villas, Townhouses & Payment Plan",
    description:
      "Three-bedroom townhouses from AED 2.875M, villas from AED 3.95M. Advertised 55/45 payment plan. Register your interest with DNK Real Estate.",
    url: "https://www.dnkre.com/aldar-dubai-new-launch",
    siteName: "DNK Real Estate",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 940,
        height: 1015,
        alt: "Aldar new residential launch in Dubai — advertised masterplan render",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aldar New Launch in Dubai | Villas, Townhouses & Payment Plan",
    description:
      "Three-bedroom townhouses from AED 2.875M, villas from AED 3.95M. Advertised 55/45 payment plan.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: "https://www.dnkre.com/aldar-dubai-new-launch",
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
  name: "Aldar New Residential Launch in Dubai",
  description:
    "An advertised Aldar new residential launch in Dubai featuring three-bedroom townhouses from AED 2.875M and three-bedroom villas from AED 3.95M, with a 55/45 payment plan. Exact project name, location and specifications are subject to developer confirmation.",
  url: "https://www.dnkre.com/aldar-dubai-new-launch",
  image: `https://www.dnkre.com${OG_IMAGE}`,
  brand: {
    "@type": "Organization",
    name: "Aldar",
  },
  additionalProperty: [
    { "@type": "PropertyValue", name: "Unit Types", value: "3 Bedroom Townhouses & Villas" },
    { "@type": "PropertyValue", name: "Payment Plan (Advertised)", value: "55/45" },
  ],
  offers: {
    "@type": "Offer",
    price: "2875000",
    priceCurrency: "AED",
    availability: "https://schema.org/PreOrder",
    url: "https://www.dnkre.com/aldar-dubai-new-launch",
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
      name: "Aldar New Launch Dubai",
      item: "https://www.dnkre.com/aldar-dubai-new-launch",
    },
  ],
};

export default function AldarDubaiNewLaunchLayout({ children }) {
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
