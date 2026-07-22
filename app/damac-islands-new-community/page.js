import ADHeader from './components/ADHeader'
import HomeAddressHills from './components/HomeAddressHills'

const title = "Damac Island Phase 2 | Dubailand";
const description = "Discover luxury waterfront townhouses and villas at Damac Islands 2 in Dubailand, Dubai. Starting from AED 2.3M, enjoy private beaches, lagoons, and resort-style living with flexible 1% monthly payment plans. Completion June 2029.";
const canonicalUrl = "https://dnkre.com/damac-islands-new-community";
const ogImage = "https://api.dnkre.com/image/islands2ad.webp";
const iconUrl = "https://api.dnkre.com/e42c7012-8478-4b82-9735-b2b3c05123e8damac.svg";

export const metadata = {
  title,
  description,
  keywords: "Damac Islands 2, Damac Islands Dubai, waterfront villas Dubai, luxury villas Dubailand, townhouses for sale Dubai, villas with private beach, gated community villas Dubai, investment property Dubai, high rental yield Dubai",
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
    images: [{ url: ogImage }],
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
    "@context": "http://schema.org",
    "@type": "Organization",
    name: "DNK Real Estate",
    logo: "https://dnkre.com/favicon.ico",
    url: "https://dnkre.com",
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
    "@context": "http://schema.org",
    "@type": "Product",
    name: "Damac Island Phase 2 | Dubailand",
    description:
      "Luxury waterfront townhouses and villas at Damac Islands 2 in Dubailand, Dubai. Starting from AED 2.3M with private beaches, lagoons, and resort-style living.",
    image: ogImage,
    url: canonicalUrl,
    brand: {
      "@type": "Organization",
      name: "Damac Properties",
    },
    offers: {
      "@type": "Offer",
      price: "2300000",
      priceCurrency: "AED",
      availability: "https://schema.org/InStock",
      url: canonicalUrl,
      seller: {
        "@type": "Organization",
        name: "DNK Real Estate",
        url: "https://dnkre.com",
      },
    },
  },
];

export default function AddressVillaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchemas) }}
      />
      <ADHeader />
      <HomeAddressHills />
    </>
  )
}
