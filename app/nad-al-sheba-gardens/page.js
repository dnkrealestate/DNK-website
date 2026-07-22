// app/nad-al-sheba-gardens/page.js
import React from "react";
import HeaderApt from "./component/HeaderApt";
import BannerNad from "./component/BannerNad";
import FormNad from "./component/FormNad";
import TypesNad from "./component/TypesNad";
import KeyNad from "./component/KeyNad";
import MasterPlanNad from "./component/MasterPlanNad";
import PaymentPlanNad from "./component/PaymentPlanNad";
import DownloadNad from "./component/DownloadNad";
import TalkFooterNad from "./component/TalkFooterNad";
import FooterNad from "./component/FooterNad";
import thumbnailImage from "@/public/assets/pojects/NadAlSheba/nad-popup.webp";
import logoImage from "@/public/assets/pojects/NadAlSheba/meraas-logo.webp";

const title = "Nad Al Sheba Gardens";
const description = "Discover luxurious apartments in Dubai with stunning views, world-class amenities, and prime locations. Explore premium properties for sale and rent, tailored to your lifestyle in the heart of Dubai.";
const canonicalUrl = "https://www.dnkre.com/nad-al-sheba-gardens";
// Static asset imports resolve to an object ({ src, width, height, ... }),
// not a URL string — .src is the actual path.
const thumbnailUrl = `https://www.dnkre.com${thumbnailImage.src}`;
const logoUrl = `https://www.dnkre.com${logoImage.src}`;

export const metadata = {
    title,
    description,
    keywords: "nad al sheba villas dubai, nad al sheba gardens by meraas, luxury villas for sale in dubai, Luxury Dubai villas, Dubai property investment, nad al sheba villas, nad al sheba gardens villas for sale",
    alternates: {
        canonical: canonicalUrl,
    },
    openGraph: {
        title,
        description,
        type: "website",
        url: canonicalUrl,
        images: [{ url: thumbnailUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [thumbnailUrl],
    },
};

const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: title,
    description,
    keywords: "nad al sheba villas dubai, nad al sheba gardens by meraas, luxury villas for sale in dubai, Luxury Dubai villas, Dubai property investment, nad al sheba villas, nad al sheba gardens villas for sale",
    url: canonicalUrl,
    logo: logoUrl,
    image: thumbnailUrl,
    telephone: "+971555769195",
};

const NadAlSheba = () => {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
            />

            <HeaderApt />
            <BannerNad />
            <FormNad />
            <TypesNad />
            <KeyNad />
            <MasterPlanNad />
            <PaymentPlanNad />
            <DownloadNad />
            <FooterNad />
            <TalkFooterNad />
        </>
    );
};

export default NadAlSheba;
