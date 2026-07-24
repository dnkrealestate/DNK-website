
import React from 'react'
import SubBanner from '../components/subBanners/SubBanner'
import ProjectGridList from './components/ProjectGridList'
import TalkSection from '../components/talkSection/TalkSection'
import { getPartner } from '@/services/partnerServices';
import { getPaginatedProjectList } from '@/services/projectServices';

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

const description =
    "Buy ready-to-move apartments, villas, and townhouses in Dubai with DNK Real Estate — the UAE's trusted platform for finding your perfect property.";

export const metadata = {
    title: {
        default: "Ready to Move - Apartment, Villa, Townhouse",
    },
    description,
    keywords: keywords.join(", "),
    alternates: {
        canonical: "https://www.dnkre.com/buy-project",
    },
    openGraph: {
        title: "Ready to Move - Apartment, Villa, Townhouse",
        description,
        url: "https://www.dnkre.com/buy-project",
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
    headline: "Ready to Move - Apartment, Villa, Townhouse",
    url: "https://www.dnkre.com/buy-project",
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
    let partnerData = [];
    // First batch is fetched here, server-side, so it's already baked into
    // the HTML the browser receives — no visible loading state on first
    // paint. The grid component only fetches client-side after that, for
    // "Load More" or when the user changes search/filters.
    let initialProjects = { data: [], total: 0, next: null, filterOptions: null };
    try {
        const [partner, projects] = await Promise.all([
            getPartner(),
            getPaginatedProjectList({ status: "buy", next: 0 }),
        ]);
        partnerData = partner;
        initialProjects = projects;

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

  return (
    <>
          <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
          />
          <SubBanner />
          <ProjectGridList
              partnerData={partnerData}
              initialData={initialProjects.data}
              initialTotal={initialProjects.total}
              initialNext={initialProjects.next}
              initialFilterOptions={initialProjects.filterOptions}
          />
          <TalkSection />
      </>
  )
}