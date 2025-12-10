// pages/nad-al-sheba-gardens.jsx or app/nad-al-sheba-gardens/page.jsx
import React from "react";
import Head from "next/head";
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

const NadAlSheba = () => {
    return (
        <>
            <Head>
                <title>Nad Al Sheba Gardens</title>
                <meta
                    name="description"
                    content="Discover luxurious apartments in Dubai with stunning views, world-class amenities, and prime locations. Explore premium properties for sale and rent, tailored to your lifestyle in the heart of Dubai."
                />
                <meta
                    name="keywords"
                    content="nad al sheba villas dubai, nad al sheba gardens by meraas, luxury villas for sale in dubai, Luxury Dubai villas, Dubai property investment, nad al sheba villas, nad al sheba gardens villas for sale"
                />
                <link rel="canonical" href="https://www.dnkre.com/nad-al-sheba-gardens" />
                {/* ✅ Open Graph Tags */}
                <meta property="og:title" content="Nad Al Sheba Gardens" />
                <meta property="og:description" content="Discover luxurious apartments in Dubai with stunning views, world-class amenities, and prime locations." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.dnkre.com/nad-al-sheba-gardens" />
                <meta property="og:image" content={`https://dnkre.com/${thumbnailImage}`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Nad Al Sheba Gardens" />

                {/* ✅ Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Nad Al Sheba Gardens" />
                <meta name="twitter:description" content="Discover luxurious apartments in Dubai with stunning views, world-class amenities, and prime locations." />
                <meta name="twitter:image" content={`https://dnkre.com/${thumbnailImage}`} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            name: "Nad Al Sheba Gardens",
                            description:
                                "Discover luxurious apartments in Dubai with stunning views, world-class amenities, and prime locations. Explore premium properties for sale and rent, tailored to your lifestyle in the heart of Dubai.",
                            keywords:
                                "nad al sheba villas dubai, nad al sheba gardens by meraas, luxury villas for sale in dubai, Luxury Dubai villas, Dubai property investment, nad al sheba villas, nad al sheba gardens villas for sale",
                            url: "https://www.dnkre.com/nad-al-sheba-gardens",
                            logo: `https://dnkre.com/${logoImage}`, 
                            image: `https://dnkre.com/${thumbnailImage}`,
                            telephone: "+971555769195",
                        }),
                    }}
                />
            </Head>

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