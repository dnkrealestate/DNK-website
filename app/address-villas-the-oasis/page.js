

import ADHeader from './components/ADHeader'
import HomeAddressHills from './components/HomeAddressHills'
import ADFooter from './components/ADFooter'

const title = "Address Villas at The Oasis by Emaar | DNK Real Estate";
const description = "Discover Address Villas at The Oasis — Emaar's exclusive high-end villa community in Dubai. Explore floor plans, payment plans, and investment opportunities with DNK Real Estate.";
const canonicalUrl = "https://www.dnkre.com/address-villas-the-oasis";

export const metadata = {
    title,
    description,
    keywords: [
        "Address Villas at The Oasis",
        "Emaar Address Villas",
        "The Oasis Dubai",
        "Emaar villas Dubai",
        "luxury villas Dubai",
    ].join(', '),
    openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: "DNK Real Estate",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
    },
    alternates: {
        canonical: canonicalUrl,
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/favicon-96x96.png", sizes: "96x96" },
            { url: "/favicon.svg", type: "image/svg+xml" }
        ],
        apple: "/apple-touch-icon.png",
    },
    robots: "index, follow",
};

export default function AddressVillaPage() {
  return (
      <>
        <ADHeader />
        <HomeAddressHills />
        <ADFooter />
      </>
  )
}