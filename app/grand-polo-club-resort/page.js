

import GPHeader from './components/GPHeader'
import HomeGrandPolo from './components/HomeGrandPolo'
import GPFooter from './components/GPFooter'

const title = "Grand Polo Club & Resort Dubai | DNK Real Estate";
const description = "Explore Grand Polo Club & Resort — an exclusive new polo-lifestyle community in Dubai. View floor plans, amenities, and investment opportunities with DNK Real Estate.";
const canonicalUrl = "https://www.dnkre.com/grand-polo-club-resort";

export const metadata = {
    title,
    description,
    keywords: [
        "Grand Polo Club and Resort",
        "Grand Polo Club Dubai",
        "polo community Dubai",
        "Dubai luxury villas",
        "Dubai off-plan property",
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
            <GPHeader />
            <HomeGrandPolo />
            <GPFooter />
        </>
    )
}