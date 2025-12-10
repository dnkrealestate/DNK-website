
import React from 'react'
import SubBanner from '../components/subBanners/SubBanner'
import { getProjectList } from '@/services/projectServices';
import OffPlanProjectGridList from './components/OffPlanProjectGridList';
import { getPartner } from '@/services/partnerServices';
import TalkSection from '../components/talkSection/TalkSection';

const keywords = [
    "Latest",
    "Off Plan Projects",
    "Latest Offplan Projects",
    "Developments in Dubai",
    "Buy Dubai Properties",
    "DNK Real Estate",
    "New Off Plan Project",
    "Upcoming Off Plan Projects",
    "Dubai Properties Projects",
    "Dubai Real Estate",
    "Real Estate Projects in Dubai",
    "New Launches",
    "Under Constructions",
    "Ready to Move",
    "Latest Off Plan Projects in Dubai",
    "Latest Properties in Dubai",
    "New Launch Properties",
    "New Launch",
    "Dubai",
];

export const metadata = {
    metadataBase: new URL("https://dnkre.com/off-plan-project"),
    title: {
        default: "Latest Off Plan Projects - Developments in Dubai",
    },
    description:
        "Explore the Latest Off-Plan Projects and Developments in Dubai with DNK Real Estate. Our platform offers exclusive access to some of the most desirable new developments in the city, providing exceptional opportunities for both investors and homebuyers. Whether you’re seeking contemporary apartments, luxurious villas, or prime commercial spaces, our listings showcase innovative designs, premium amenities, and flexible payment plans. Step into the future of Dubai’s real estate market and claim your place in one of the world’s most dynamic cities with DNK Real Estate.",
    keywords: keywords.join(", "),
    alternates: {
        canonical: "https://dnkre.com/off-plan-project",
    },
    openGraph: {
        title: "Latest Off Plan Projects - Developments in Dubai",
        description:
            "Explore the Latest Off-Plan Projects and Developments in Dubai with DNK Real Estate. Our platform offers exclusive access to some of the most desirable new developments in the city, providing exceptional opportunities for both investors and homebuyers. Whether you’re seeking contemporary apartments, luxurious villas, or prime commercial spaces, our listings showcase innovative designs, premium amenities, and flexible payment plans. Step into the future of Dubai’s real estate market and claim your place in one of the world’s most dynamic cities with DNK Real Estate.",
        url: "https://dnkre.com/off-plan-project",
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
        title: "Latest Off Plan Projects - Developments in Dubai",
        description:
            "Explore the Latest Off-Plan Projects and Developments in Dubai with DNK Real Estate. Our platform offers exclusive access to some of the most desirable new developments in the city, providing exceptional opportunities for both investors and homebuyers. Whether you’re seeking contemporary apartments, luxurious villas, or prime commercial spaces, our listings showcase innovative designs, premium amenities, and flexible payment plans. Step into the future of Dubai’s real estate market and claim your place in one of the world’s most dynamic cities with DNK Real Estate.",
        images: ["https://www.dnkre.com/logo.webp"],
    },
    robots: "index, follow",
    author: "DNK Real Estate",
    favicon: "https://www.dnkre.com/logo.ico",
    appleTouchIcon: "https://www.dnkre.com/logo.webp",
    openGraphMetaTags: {
        url: "https://www.dnkre.com/off-plan-project",
        title: "Latest Off Plan Projects - Developments in Dubai",
        description:
            "Explore the Latest Off-Plan Projects and Developments in Dubai with DNK Real Estate. Our platform offers exclusive access to some of the most desirable new developments in the city, providing exceptional opportunities for both investors and homebuyers. Whether you’re seeking contemporary apartments, luxurious villas, or prime commercial spaces, our listings showcase innovative designs, premium amenities, and flexible payment plans. Step into the future of Dubai’s real estate market and claim your place in one of the world’s most dynamic cities with DNK Real Estate.",
        image: "https://www.dnkre.com/logo.webp",
    },
    schemaMarkup: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "#website",
        headline:
            "Latest Off Plan Projects - Developments in Dubai",
        url: "https://dnkre.com/off-plan-project",
        name: "DNK Real Estate",
        alternateName: ["DNK Real Estate", "dnkre.com"],
        keywords:
            keywords.join(", "),
        description:
            "Explore the Latest Off-Plan Projects and Developments in Dubai with DNK Real Estate. Our platform offers exclusive access to some of the most desirable new developments in the city, providing exceptional opportunities for both investors and homebuyers. Whether you’re seeking contemporary apartments, luxurious villas, or prime commercial spaces, our listings showcase innovative designs, premium amenities, and flexible payment plans. Step into the future of Dubai’s real estate market and claim your place in one of the world’s most dynamic cities with DNK Real Estate.",
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
    let projects = [];
    let partnerData = [];
        try {
            const [projectsData, partner] = await Promise.all([
                getProjectList(),
                getPartner(),
            ])
            projects = projectsData;
            partnerData = partner;

            if (partner && Array.isArray(partner)) {
                const sortedPartner = partner
                    .slice()
                    .sort((a, b) => {
                        const nameA = a.partner_name?.toLowerCase() || '';
                        const nameB = b.partner_name?.toLowerCase() || '';
                        return nameA.localeCompare(nameB);
                    });
                partnerData = sortedPartner
            }
        } catch (error) {
            console.error("Error fetching data:", error);
    }
    
    const filteredProjects = projects
        .filter((data) => data.status === "off-plan")
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  return (
      <>
          <SubBanner />
          <OffPlanProjectGridList projects={filteredProjects} partnerData={partnerData} />
          <TalkSection />
      </>
  )
}