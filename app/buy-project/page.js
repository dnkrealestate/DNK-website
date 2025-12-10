
import React from 'react'
import SubBanner from '../components/subBanners/SubBanner'
import ProjectGridList from './components/ProjectGridList'
import TalkSection from '../components/talkSection/TalkSection'
import { getProjectList } from '@/services/projectServices';
import { getPartner } from '@/services/partnerServices';

const keywords = [
    "Properties for Sale",
    "Available For Sale",
    "Property List",
    "Buy Properties",
    "Buy Dubai Properties",
    "Buy Dubai Home",
    "Buy Apartments in Dubai",
    "Buy Villas in UAE",
    "Buy Ready to Move Property",
    "Buy Property",
    "Buy Apartments",
    "Buy Villas",
    "Buy Townhouses",
    "Buy Penthouses",
    "Properties for Sale in UAE",
    "Properties for Sale in Sharjah",
    "Apartments for Sale in Dubai",
    "Villa for sale in Dubai",
    "Townhouses for sale in Dubai",
    "Office Space for sale in Dubai",
    "Warehouse for sale in Dubai",
];

export const metadata = {
    metadataBase: new URL("https://dnkre.com/buy-project"),
    title: {
        default: "Ready to Move - Apartment, Villa, Townhouse",
    },
    description:
        "At DNK Real Estate, we simplify your property journey. As the UAE's leading real estate hub, we offer a vast selection of residential and commercial properties, ensuring that you find the perfect match for your needs. Whether you're seeking to invest, buy, or rent, our platform provides cutting-edge tools and expert guidance every step of the way. Explore the finest properties across the UAE with confidence, knowing that DNK Real Estate has you covered for all your real estate aspirations.",
    keywords: keywords.join(", "),
    alternates: {
        canonical: "https://dnkre.com/buy-project",
    },
    openGraph: {
        title: "Ready to Move - Apartment, Villa, Townhouse",
        description:
            "At DNK Real Estate, we simplify your property journey. As the UAE's leading real estate hub, we offer a vast selection of residential and commercial properties, ensuring that you find the perfect match for your needs. Whether you're seeking to invest, buy, or rent, our platform provides cutting-edge tools and expert guidance every step of the way. Explore the finest properties across the UAE with confidence, knowing that DNK Real Estate has you covered for all your real estate aspirations.",
        url: "https://dnkre.com/buy-project",
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
        title: "Ready to Move - Apartment, Villa, Townhouse",
        description:
            "At DNK Real Estate, we simplify your property journey. As the UAE's leading real estate hub, we offer a vast selection of residential and commercial properties, ensuring that you find the perfect match for your needs. Whether you're seeking to invest, buy, or rent, our platform provides cutting-edge tools and expert guidance every step of the way. Explore the finest properties across the UAE with confidence, knowing that DNK Real Estate has you covered for all your real estate aspirations.",
        images: ["https://www.dnkre.com/logo.webp"],
    },
    robots: "index, follow",
    author: "DNK Real Estate",
    favicon: "https://www.dnkre.com/logo.ico",
    appleTouchIcon: "https://www.dnkre.com/logo.webp",
    openGraphMetaTags: {
        url: "https://www.dnkre.com/buy-project",
        title: "Ready to Move - Apartment, Villa, Townhouse",
        description:
            "At DNK Real Estate, we simplify your property journey. As the UAE's leading real estate hub, we offer a vast selection of residential and commercial properties, ensuring that you find the perfect match for your needs. Whether you're seeking to invest, buy, or rent, our platform provides cutting-edge tools and expert guidance every step of the way. Explore the finest properties across the UAE with confidence, knowing that DNK Real Estate has you covered for all your real estate aspirations.",
        image: "https://www.dnkre.com/logo.webp",
    },
    schemaMarkup: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "#website",
        headline:
            "Ready to Move - Apartment, Villa, Townhouse",
        url: "https://dnkre.com/buy-project",
        name: "DNK Real Estate",
        alternateName: ["DNK Real Estate", "dnkre.com"],
        keywords:
            keywords.join(", "),
        description:
            "At DNK Real Estate, we simplify your property journey. As the UAE's leading real estate hub, we offer a vast selection of residential and commercial properties, ensuring that you find the perfect match for your needs. Whether you're seeking to invest, buy, or rent, our platform provides cutting-edge tools and expert guidance every step of the way. Explore the finest properties across the UAE with confidence, knowing that DNK Real Estate has you covered for all your real estate aspirations.",
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
        .filter((data) => data.status === "buy")
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
  return (
    <>
          <SubBanner />
          <ProjectGridList projects={filteredProjects} partnerData={partnerData} />
          <TalkSection />
      </>
  )
}