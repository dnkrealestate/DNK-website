
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

const description =
    "Explore career opportunities at DNK Real Estate — join our dynamic Dubai real estate team in sales, marketing, and property management.";

export const metadata = {
    title: {
        default: "Join Our Team at DNK Real Estate",
    },
    description,
    keywords: keywords.join(", "),
    alternates: {
        canonical: "https://www.dnkre.com/careers",
    },
    openGraph: {
        title: "Join Our Team at DNK Real Estate",
        description,
        url: "https://www.dnkre.com/careers",
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
    headline: "Join Our Team at DNK Real Estate",
    url: "https://www.dnkre.com/careers",
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
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        <BannerCareer />
            <CareerPage />
            <PartnerSection partnerData={partnerData} />
        </>
    );
}