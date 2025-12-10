import React from 'react'
import SellProject from './components/SellProject'
import TalkSection from '../components/talkSection/TalkSection'
import SubBanner from '../components/subBanners/SubBanner'
import { getAd } from '@/services/projectServices';

const keywords = [
    "Sell Villa in Dubai",
    "Sell Apartment in Dubai",
    "Sell Commercial Space in Dubai",
    "Dubai Property Sales",
    "Real Estate Selling in Dubai",
    "Luxury Villas for Sale Dubai",
    "Apartments for Sale in Dubai",
    "Commercial Real Estate Dubai",
    "Property Valuation Dubai",
    "Sell My Property Dubai",
    "Dubai Real Estate Market",
    "Maximize Property Value Dubai",
    "Dubai Property Listings",
    "Sell Residential Property Dubai",
    "Investment Properties Dubai",
    "Dubai Real Estate Agents",
    "Property Selling Tips Dubai",
    "Quick Property Sales Dubai",
];

export const metadata = {
    metadataBase: new URL("https://dnkre.com/sell-project"),
    title: {
        default: "Sell a Property profitable in Dubai",
    },
    description:
        "Unlock Your Property's Full Potential with DNK Real Estate. Whether you’re selling a villa, apartment, or commercial space, our expert team is dedicated to ensuring a seamless and profitable process. Leveraging in-depth market insights, strategic marketing techniques, and a vast network of qualified buyers, we empower you to secure the best possible deal in Dubai’s dynamic real estate market. Trust DNK Real Estate to guide you toward a successful sale and maximize the value of your property.",
    keywords: keywords.join(", "),
    alternates: {
        canonical: "https://dnkre.com/sell-project",
    },
    openGraph: {
        title: "Sell a Property profitable in Dubai",
        description:
            "Unlock Your Property's Full Potential with DNK Real Estate. Whether you’re selling a villa, apartment, or commercial space, our expert team is dedicated to ensuring a seamless and profitable process. Leveraging in-depth market insights, strategic marketing techniques, and a vast network of qualified buyers, we empower you to secure the best possible deal in Dubai’s dynamic real estate market. Trust DNK Real Estate to guide you toward a successful sale and maximize the value of your property.",
        url: "https://dnkre.com/sell-project",
        siteName: "DNK Real Estate",
        images: [
            {
                url: "https://www.dnkre.com/logo.webp",
                width: 200,
                height: 200,
                alt: "DNK Real Estate Properties",
                type: "image/webp",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sell a Property profitable in Dubai",
        description:
            "Unlock Your Property's Full Potential with DNK Real Estate. Whether you’re selling a villa, apartment, or commercial space, our expert team is dedicated to ensuring a seamless and profitable process. Leveraging in-depth market insights, strategic marketing techniques, and a vast network of qualified buyers, we empower you to secure the best possible deal in Dubai’s dynamic real estate market. Trust DNK Real Estate to guide you toward a successful sale and maximize the value of your property.",
        images: ["https://www.dnkre.com/logo.webp"],
    },
    robots: "index, follow",
    author: "DNK Real Estate",
    favicon: "https://www.dnkre.com/logo.ico",
    appleTouchIcon: "https://www.dnkre.com/logo.webp",
    openGraphMetaTags: {
        url: "https://www.dnkre.com/sell-project",
        title: "Sell a Property profitable in Dubai",
        description:
            "Unlock Your Property's Full Potential with DNK Real Estate. Whether you’re selling a villa, apartment, or commercial space, our expert team is dedicated to ensuring a seamless and profitable process. Leveraging in-depth market insights, strategic marketing techniques, and a vast network of qualified buyers, we empower you to secure the best possible deal in Dubai’s dynamic real estate market. Trust DNK Real Estate to guide you toward a successful sale and maximize the value of your property.",
        image: "https://www.dnkre.com/logo.webp",
    },
    schemaMarkup: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "#website",
        headline:
            "Sell a Property profitable in Dubai",
        url: "https://dnkre.com/sell-project",
        name: "DNK Real Estate",
        alternateName: ["DNK Real Estate", "dnkre.com"],
        keywords:
            keywords.join(", "),
        description:
            "Unlock Your Property's Full Potential with DNK Real Estate. Whether you’re selling a villa, apartment, or commercial space, our expert team is dedicated to ensuring a seamless and profitable process. Leveraging in-depth market insights, strategic marketing techniques, and a vast network of qualified buyers, we empower you to secure the best possible deal in Dubai’s dynamic real estate market. Trust DNK Real Estate to guide you toward a successful sale and maximize the value of your property.",
        image: "https://www.dnkre.com/logo.webp",
        inLanguage: {
            "@type": "Language",
            name: ["Arabic", "English", "Hindi"],
        },
        copyrightHolder: {
            "@type": "Organization",
            name: "DNK Real Estate",
            logo: "https://www.dnkre.com/logo.webp",
            url: "https://www.dnkre.com/",
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+971555769195",
                contactType: "Sales",
                email: "info@dnkre.com",
                areaServed: "United Arab Emirates",
            },
            address: {
                "@type": "PostalAddress",
                addressCountry: "AE",
                streetAddress: "Suite No: 603, Sama Building, Al Barsha 1 - Al Barsha, Dubai, United Arab Emirates",
                addressLocality: "Al Barsha",
                addressRegion: "Dubai",
                postalCode: "26048",
            },
        },
    },
};

export default async function page() {
    let adData = null;
    try {
        const [ad] = await Promise.all([
              getAd(),
        ]);
        
        adData = ad.length > 0 ? ad[0] : null;

    } catch (error) {
    console.error("Error fetching data:", error)}
  return (
      <>
          <SubBanner ad={adData}/>
          <SellProject />
          <TalkSection />
      </>
  )
}