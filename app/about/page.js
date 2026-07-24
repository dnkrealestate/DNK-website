import React from 'react'
import AboutBanner from '../team/components/AboutBanner'
import { getTeamList } from '@/services/teamServices';
import { getReview } from '@/services/reviewServices';
import { getPartner } from '@/services/partnerServices';
import AboutDetail from './components/AboutDetail';
import TeamSection from '../components/team/TeamSection';
import OurProcess from '../components/ourProcess/OurProcess';
import ReviewSection from '../components/reviewSection/ReviewSection';
import PartnerSection from '../components/partner/PartnerSection';
import TalkSection from '../components/talkSection/TalkSection';
import GalleryComponent from '../gallery/component/GalleryComponent';

const keywords = [
  "About us", "DNK Real Estate", "DNK Properties",
  "About DNK Company", " About DNK Real Estate",
  "About DNK Dubai", "Marketing Team",
  "team", "values", "Vision", "Mission",
  "Friends", "Love", "Team Work",
];

const description =
  "Learn about DNK Real Estate, Dubai's trusted property partner founded on trust and commitment, dedicated to guiding clients to their perfect home.";

export const metadata = {
  title: {
    default: "About Us - Buy and Sale Property Dubai",
  },
  description,
  keywords: keywords.join(", "),
  alternates: {
    canonical: "https://www.dnkre.com/about",
  },
  openGraph: {
    title: "About Us - Buy and Sale Property Dubai",
    description,
    url: "https://www.dnkre.com/about",
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
    title: "About Us - Buy and Sale Property Dubai",
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
  headline: "About Us - Buy and Sale Property Dubai",
  url: "https://www.dnkre.com/about",
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

export default async function About() {
  let teamData = [];
  let reviewData = [];
  let partnerData = [];

   try {
      const [team, review, partner] = await Promise.all([
        getTeamList(),
        getReview(),
        getPartner(),
     ]);
      reviewData = review;
      partnerData = partner;
      if (partner && Array.isArray(partner)) {
        const sortedPartner = partner
          .map((item) => ({ ...item, sortKey: Math.random() }))
          .sort((a, b) => a.sortKey - b.sortKey)
          .slice(0, 12);
        partnerData = sortedPartner
     }
     
     if (team && Array.isArray(team)) {
       const sortedTeam = team
         .map((item) => ({ ...item, sortKey: Math.random() }))
         .sort((a, b) => a.sortKey - b.sortKey)
       teamData = sortedTeam
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
      <AboutDetail />
      <GalleryComponent />
      <TeamSection teamData={teamData} />
      <OurProcess />
      <ReviewSection reviewData={sortReview} />
      <PartnerSection partnerData={partnerData} />
      <TalkSection />
    </>
  )
}