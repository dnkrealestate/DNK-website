import React from 'react';
import HeaderApt from './component/HeaderApt.jsx';
import BannerApt from './component/BannerApt.jsx';
import FormApt from './component/FormApt.jsx';
import ListApartment from './component/ListApartment.jsx';
import WhyChoose from './component/WhyChoose';
import DeveloperStn from './component/DeveloperStn';
import CommunitieStn from './component/CommunitieStn';
import BestSaleStn from './component/BestSaleStn';
import TalkStn from './component/TalkStn';
import { getProjectList } from '@/services/projectServices';
import { getCreatedTime } from '@/utils/projectSort';

const APARTMENT_TYPE_FIELDS = ["type", "type2", "type3", "type4", "type5", "type6"];

const title = "Best Apartments - Dubai";
const description = "Discover luxurious apartments in Dubai with stunning views, world-class amenities, and prime locations. Explore premium properties for sale and rent, tailored to your lifestyle in the heart of Dubai.";
const keywords = "Dubai apartments for sale, Apartments in Dubai, Luxury apartments Dubai, Dubai apartment rentals, Affordable apartments in Dubai, Buy apartment in Dubai, Dubai property investment, Waterfront apartments Dubai, High-rise apartments in Dubai, Dubai apartments with sea view, Downtown Dubai apartments, Apartments near Dubai Marina, Studio apartments in Dubai, Family apartments in Dubai";
const canonicalUrl = "https://www.dnkre.com/dubai-apartments";

export const metadata = {
  title,
  description,
  keywords,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
    type: "website",
    images: [{ url: "https://www.dnkre.com/logo192.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://www.dnkre.com/logo192.png"],
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: title,
  description,
  keywords,
  url: canonicalUrl,
  logo: "https://www.dnkre.com/logo192.png",
  image: "https://www.dnkre.com/logo192.png",
  sameAs: [
    "https://www.facebook.com/dnkrealestate1/",
    "https://www.instagram.com/dnk_re/",
    "https://www.linkedin.com/company/dnkrealestate/mycompany/",
  ],
  telephone: "+971555769195",
};

const ApartmentsDubai = async () => {
  // Fetched here server-side, so the carousel's first 10 apartments are
  // already in the HTML on first paint instead of showing a spinner while
  // a client-side fetch runs after mount.
  let initialProjects = [];
  try {
    const projects = await getProjectList();
    initialProjects = (projects || [])
      .filter((data) => APARTMENT_TYPE_FIELDS.some((typeKey) => data[typeKey] === "apartment"))
      .sort((a, b) => getCreatedTime(b) - getCreatedTime(a))
      .slice(0, 10);
  } catch (error) {
    console.error("Error fetching apartment list:", error);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <HeaderApt />
      <BannerApt />
      <FormApt />
      <ListApartment initialProjects={initialProjects} />
      <WhyChoose />
      <DeveloperStn />
      <CommunitieStn />
      <BestSaleStn />
      <TalkStn />
    </>
  );
};

export default ApartmentsDubai;
