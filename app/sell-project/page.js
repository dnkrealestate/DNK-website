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

const description =
    "Sell your villa, apartment, or commercial property in Dubai profitably with DNK Real Estate's market expertise and qualified buyer network.";

export const metadata = {
    title: {
        default: "Sell a Property profitable in Dubai",
    },
    description,
    keywords: keywords.join(", "),
    alternates: {
        canonical: "https://www.dnkre.com/sell-project",
    },
    openGraph: {
        title: "Sell a Property profitable in Dubai",
        description,
        url: "https://www.dnkre.com/sell-project",
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
        description,
        images: ["https://www.dnkre.com/logo.webp"],
    },
    robots: "index, follow",
    author: "DNK Real Estate",
};

const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "#website",
    headline: "Sell a Property profitable in Dubai",
    url: "https://www.dnkre.com/sell-project",
    name: "DNK Real Estate",
    alternateName: ["DNK Real Estate", "dnkre.com"],
    keywords: keywords.join(", "),
    description,
    image: "https://www.dnkre.com/logo.webp",
    inLanguage: {
        "@type": "Language",
        name: "English",
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
          <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
          />
          <SubBanner ad={adData}/>
          <SellProject />
          <TalkSection />
      </>
  )
}