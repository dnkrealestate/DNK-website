
import React from 'react'
import CareerPage from './components/CareerPage';
import BannerCareer from './components/BannerCareer';
import PartnerSection from '../components/partner/PartnerSection';
import { getPartner } from '@/services/partnerServices';

const keywords = [
    "Careers at DNK Real Estate",
    "Real Estate Jobs in Dubai",
    "Join Our Team",
    "Property Management Careers",
    "Sales and Marketing Jobs Dubai",
    "Real Estate Careers",
    "Work at DNK Real Estate",
    "Job Opportunities in Dubai Real Estate",
    "Real Estate Employment",
    "Professional Development in Real Estate",
    "Dynamic Workplace Dubai",
    "Inclusive Work Environment",
    "Talent Development Dubai",
    "Real Estate Industry Careers",
    "Join a Passionate Team",
];

export const metadata = {
    metadataBase: new URL("https://dnkre.com/careers"),
    title: {
        default: "Join Our Team at DNK Real Estate",
    },
    description:
        "At DNK Real Estate, we are committed to fostering a dynamic and inclusive workplace where talent thrives. Explore exciting career opportunities in the real estate sector, from sales and marketing to property management and administration. Join us and be part of a passionate team dedicated to excellence and innovation in Dubai's vibrant real estate market.",
    keywords: keywords.join(", "),
    alternates: {
        canonical: "https://dnkre.com/careers",
    },
    openGraph: {
        title: "Join Our Team at DNK Real Estate",
        description:
            "At DNK Real Estate, we are committed to fostering a dynamic and inclusive workplace where talent thrives. Explore exciting career opportunities in the real estate sector, from sales and marketing to property management and administration. Join us and be part of a passionate team dedicated to excellence and innovation in Dubai's vibrant real estate market.",
        url: "https://dnkre.com/careers",
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
        title: "Join Our Team at DNK Real Estate",
        description:
            "At DNK Real Estate, we are committed to fostering a dynamic and inclusive workplace where talent thrives. Explore exciting career opportunities in the real estate sector, from sales and marketing to property management and administration. Join us and be part of a passionate team dedicated to excellence and innovation in Dubai's vibrant real estate market.",
        images: ["https://www.dnkre.com/logo.webp"],
    },
    robots: "index, follow",
    author: "DNK Real Estate",
    favicon: "https://www.dnkre.com/logo.ico",
    appleTouchIcon: "https://www.dnkre.com/logo.webp",
    openGraphMetaTags: {
        url: "https://www.dnkre.com/careers",
        title: "Join Our Team at DNK Real Estate",
        description:
            "At DNK Real Estate, we are committed to fostering a dynamic and inclusive workplace where talent thrives. Explore exciting career opportunities in the real estate sector, from sales and marketing to property management and administration. Join us and be part of a passionate team dedicated to excellence and innovation in Dubai's vibrant real estate market.",
        image: "https://www.dnkre.com/logo.webp",
    },
    schemaMarkup: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "#website",
        headline:
            "Join Our Team at DNK Real Estate",
        url: "https://dnkre.com/careers",
        name: "DNK Real Estate",
        alternateName: ["DNK Real Estate", "dnkre.com"],
        keywords:
            keywords.join(", "),
        description:
            "At DNK Real Estate, we are committed to fostering a dynamic and inclusive workplace where talent thrives. Explore exciting career opportunities in the real estate sector, from sales and marketing to property management and administration. Join us and be part of a passionate team dedicated to excellence and innovation in Dubai's vibrant real estate market.",
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

export default async function Careers() {
    let partnerData = [];
    try {
         const [partner] = await Promise.all([
              getPartner(),
         ]);
        partnerData = partner;
        if (partner && Array.isArray(partner)) {
            const sortedPartner = partner
                .map((item) => ({ ...item, sortKey: Math.random() }))
                .sort((a, b) => a.sortKey - b.sortKey)
                .slice(0, 12);
            partnerData = sortedPartner
        }
    }catch(error){
        console.error("Error fetching data:", error);
}
    return (
        <>
        <BannerCareer />
            <CareerPage />
            <PartnerSection partnerData={partnerData} />
        </>
    );
}