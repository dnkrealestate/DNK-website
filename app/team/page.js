import { getTeamList } from '@/services/teamServices';
import React from 'react'
import AboutBanner from './components/AboutBanner';
import TeamList from './components/TeamList';
import OurProcess from '../components/ourProcess/OurProcess';
import { getReview } from '@/services/reviewServices';
import { getPartner } from '@/services/partnerServices';
import ReviewSection from '../components/reviewSection/ReviewSection';
import PartnerSection from '../components/partner/PartnerSection';
import GalleryComponent from '../gallery/component/GalleryComponent';

const keywords = [
  "Real estate team", "Dubai real estate experts",
  "Property buying and selling", "Real estate professionals",
  "Top real estate agents", "Experienced real estate agents",
  "Real estate services", "Property investment advisors",
  "Real estate guidance", "Best real estate team in Dubai",
  "Buy, sell, invest in real estate", "Residential and commercial real estate",
  "Dubai property market experts", "Real estate consultants",
  "Personalized real estate services", "joining a real estate team"
];

const description =
  "Meet DNK Real Estate's expert Dubai property team — experienced agents ready to guide you through buying, selling, or investing with confidence.";

export const metadata = {
  title: {
    default: "Meet The Top Real Estate Agents in Dubai | Buy and Sale Property Dubai",
  },
  description,
  keywords: keywords.join(", "),
  alternates: {
    canonical: "https://www.dnkre.com/team",
  },
  openGraph: {
    title: "Meet The Top Real Estate Agents in Dubai | Buy and Sale Property Dubai",
    description,
    url: "https://www.dnkre.com/team",
    siteName: "Team DNK Real Estate",
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
    title: "Meet The Top Real Estate Agents in Dubai | Buy and Sale Property Dubai",
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
  headline: "Meet The Top Real Estate Agents in Dubai | Buy and Sale Property Dubai",
  url: "https://www.dnkre.com/team",
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

export default async function Team() {
  let teamData = [];
  let reviewData = [];
  let partnerData = [];

  try {
    const [team, review, partner] = await Promise.all([
      getTeamList(),
      getReview(),
      getPartner(),
    ]);
    
    if (team && Array.isArray(team)) {
      const sortedTeam = team.sort((a, b) => {
        const orderA = Number(a.ordernumber);
        const orderB = Number(b.ordernumber);

        const hasOrderA = !isNaN(orderA);
        const hasOrderB = !isNaN(orderB);

        if (hasOrderA && hasOrderB) {
          return orderA - orderB; // sort ascending
        }
        if (hasOrderA) return -1; // a has order, goes first
        if (hasOrderB) return 1;  // b has order, goes first
        return 0; // both empty, keep relative order
      });
      
      teamData = sortedTeam;
    }


    reviewData = review;
    partnerData = partner;
    if (partner && Array.isArray(partner)) {
      const sortedPartner = partner
        .map((item) => ({ ...item, sortKey: Math.random() }))
        .sort((a, b) => a.sortKey - b.sortKey)
        .slice(0, 12);
      partnerData = sortedPartner
    }
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  const sortReview = reviewData
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <AboutBanner teamData={teamData} />
      <TeamList teamData={teamData} />
      <GalleryComponent />
      <OurProcess />
      <ReviewSection reviewData={sortReview} />
      <PartnerSection partnerData={partnerData} />

    </>
  )
}