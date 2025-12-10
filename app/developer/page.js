import React from 'react'
import { getPartner } from "@/services/partnerServices";
import BannerDeveloperList from './component/BannerDeveloperList';
import DeveloperList from './component/DeveloperList';

export const metadata = {
    title: "Dubai Leading Developers",
    description:
        "Discover Dubai’s leading property developers known for delivering world-class real estate projects. Explore premium apartments, villas, and commercial spaces from the top names in Dubai’s real estate market.",
    keywords:
        "Dubai leading developers, top real estate developers Dubai, best property developers UAE, Dubai off-plan projects, luxury property developers Dubai, premium real estate developers Dubai, Dubai real estate companies, top builders in Dubai, trusted property developers UAE, famous real estate brands Dubai",
    openGraph: {
        title: "Dubai Leading Developers",
        description:
            "Discover Dubai’s leading property developers known for delivering world-class real estate projects. Explore premium apartments, villas, and commercial spaces from the top names in Dubai’s real estate market.",
        url: "https://www.dnkre.com/developer/",
        siteName: "DNK Real Estate",
        images: [
            {
                url: "https://www.dnkre.com/logo.webp",
                width: 1200,
                height: 630,
                alt: "DNK Real Estate Properties",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Dubai Leading Developers",
        description:
            "Discover Dubai’s leading property developers known for delivering world-class real estate projects. Explore premium apartments, villas, and commercial spaces from the top names in Dubai’s real estate market.",
        images: ["https://www.dnkre.com/logo.webp"], // Replace with your actual image URL
    },
    robots: "index, follow",
    alternates: {
        canonical: "https://www.dnkre.com/developer/",
    },
};


export default async function DeveloperListPage() {
    let partnerData = [];

    try {
    // Fetch all data concurrently
        const [partner] = await Promise.all([
          getPartner(),
        ]);

        partnerData = partner;

        if (partner && Array.isArray(partner)) {
            const sortedPartner = partner
            partnerData = sortedPartner
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  return (
      <>
          <BannerDeveloperList />
          <DeveloperList partnerData={partnerData} />
      </>
  )
}