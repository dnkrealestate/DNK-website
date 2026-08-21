
import React from 'react'
import SubBanner from '../components/subBanners/SubBanner'
import OffPlanProjectGridList from './components/OffPlanProjectGridList';
import { getPartner } from '@/services/partnerServices';
import { getPaginatedProjectList } from '@/services/projectServices';
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

const description =
    "Explore the latest off-plan projects in Dubai with DNK Real Estate — apartments, villas, and commercial spaces with flexible payment plans.";

export const metadata = {
    title: {
        default: "Latest Off Plan Projects - Developments in Dubai",
    },
    description,
    keywords: keywords.join(", "),
    alternates: {
        canonical: "https://www.dnkre.com/off-plan-project",
    },
    openGraph: {
        title: "Latest Off Plan Projects - Developments in Dubai",
        description,
        url: "https://www.dnkre.com/off-plan-project",
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
    headline: "Latest Off Plan Projects - Developments in Dubai",
    url: "https://www.dnkre.com/off-plan-project",
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
            getPaginatedProjectList({ status: "off-plan", next: 0 }),
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
          <OffPlanProjectGridList
              partnerData={partnerData}
              initialData={initialProjects.data}
              initialTotal={initialProjects.total}
              initialFilterOptions={initialProjects.filterOptions}
          />
          <TalkSection />
      </>
  )
}