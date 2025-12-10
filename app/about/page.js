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

export const metadata = {
  metadataBase: new URL("https://dnkre.com/about"),
  title: {
    default: "About Us - Buy and Sale Property Dubai",
  },
  description:
    "DNK is the harmony, dream and friendship between Dann Leslie and Waseem Khursheed who placed their trust and confidence in each other and believed in each other to make a tangible difference in people's lives, in their communities, and this ambitious commitment and burning passion endured them through life's challenges and helped them emerge as successful. Hence, they understand the importance of trust, confidence, and commitment extremely well. These are the tenets of DNK morals and each member of the DNK family swears to extend the same values to every client, investor, and shareholder they cross paths with. DNK Real Estate, we are dedicated to understanding the unique needs of our clients, listening to their stories, and empathetically guiding them toward the perfect home. Through unwavering commitment and world-class service, we transform dreams into reality, nurturing investments and safeguarding the vision of families, entrepreneurs, and dreamers.",
  keywords: keywords.join(", "),
  alternates: {
    canonical: "https://dnkre.com/about",
  },
  openGraph: {
    title: "About Us - Buy and Sale Property Dubai",
    description:
      "DNK is the harmony, dream and friendship between Dann Leslie and Waseem Khursheed who placed their trust and confidence in each other and believed in each other to make a tangible difference in people's lives, in their communities, and this ambitious commitment and burning passion endured them through life's challenges and helped them emerge as successful. Hence, they understand the importance of trust, confidence, and commitment extremely well. These are the tenets of DNK morals and each member of the DNK family swears to extend the same values to every client, investor, and shareholder they cross paths with. DNK Real Estate, we are dedicated to understanding the unique needs of our clients, listening to their stories, and empathetically guiding them toward the perfect home. Through unwavering commitment and world-class service, we transform dreams into reality, nurturing investments and safeguarding the vision of families, entrepreneurs, and dreamers.",
    url: "https://dnkre.com/about",
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
    description:
      "DNK is the harmony, dream and friendship between Dann Leslie and Waseem Khursheed who placed their trust and confidence in each other and believed in each other to make a tangible difference in people's lives, in their communities, and this ambitious commitment and burning passion endured them through life's challenges and helped them emerge as successful. Hence, they understand the importance of trust, confidence, and commitment extremely well. These are the tenets of DNK morals and each member of the DNK family swears to extend the same values to every client, investor, and shareholder they cross paths with. DNK Real Estate, we are dedicated to understanding the unique needs of our clients, listening to their stories, and empathetically guiding them toward the perfect home. Through unwavering commitment and world-class service, we transform dreams into reality, nurturing investments and safeguarding the vision of families, entrepreneurs, and dreamers.",
    images: ["https://www.dnkre.com/logo.webp"],
  },
  robots: "index, follow",
  author: "DNK Real Estate",
  favicon: "https://www.dnkre.com/logo.ico",
  appleTouchIcon: "https://www.dnkre.com/logo.webp",
  openGraphMetaTags: {
    url: "https://dnkre.com/about",
    title: "About Us - Buy and Sale Property Dubai",
    description:
      "DNK is the harmony, dream and friendship between Dann Leslie and Waseem Khursheed who placed their trust and confidence in each other and believed in each other to make a tangible difference in people's lives, in their communities, and this ambitious commitment and burning passion endured them through life's challenges and helped them emerge as successful. Hence, they understand the importance of trust, confidence, and commitment extremely well. These are the tenets of DNK morals and each member of the DNK family swears to extend the same values to every client, investor, and shareholder they cross paths with. DNK Real Estate, we are dedicated to understanding the unique needs of our clients, listening to their stories, and empathetically guiding them toward the perfect home. Through unwavering commitment and world-class service, we transform dreams into reality, nurturing investments and safeguarding the vision of families, entrepreneurs, and dreamers.",
    image: "https://www.dnkre.com/logo.webp",
  },
  schemaMarkup: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "#website",
    headline:
      "About Us - Buy and Sale Property Dubai",
    url: "https://dnkre.com/about",
    name: "DNK Real Estate",
    alternateName: ["DNK Real Estate", "dnkre.com"],
    keywords:
      keywords.join(", "),
    description:
      "DNK is the harmony, dream and friendship between Dann Leslie and Waseem Khursheed who placed their trust and confidence in each other and believed in each other to make a tangible difference in people's lives, in their communities, and this ambitious commitment and burning passion endured them through life's challenges and helped them emerge as successful. Hence, they understand the importance of trust, confidence, and commitment extremely well. These are the tenets of DNK morals and each member of the DNK family swears to extend the same values to every client, investor, and shareholder they cross paths with. DNK Real Estate, we are dedicated to understanding the unique needs of our clients, listening to their stories, and empathetically guiding them toward the perfect home. Through unwavering commitment and world-class service, we transform dreams into reality, nurturing investments and safeguarding the vision of families, entrepreneurs, and dreamers.",
    image: "https://www.dnkre.com/logo.webp",
    inLanguage: {
      "@type": "Language",
      name: ["Arabic", "English", "Hindi"],
    },
    copyrightHolder: {
      "@type": "Organization",
      name: "DNK Real Estate",
      logo: "https://www.dnkre.com/logo.webp",
      url: "https://dnkre.com/",
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