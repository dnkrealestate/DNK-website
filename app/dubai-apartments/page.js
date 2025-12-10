'use client';

import React from 'react';
import Head from 'next/head';
import HeaderApt from './component/HeaderApt.jsx';
import BannerApt from './component/BannerApt.jsx';
import FormApt from './component/FormApt.jsx';
import ListApartment from './component/ListApartment.jsx';
import WhyChoose from './component/WhyChoose';
import DeveloperStn from './component/DeveloperStn';
import CommunitieStn from './component/CommunitieStn';
import BestSaleStn from './component/BestSaleStn';
import TalkStn from './component/TalkStn';

const ApartmentsDubai = () => {
  return (
    <>
      <Head>
        <title>Best Apartments - Dubai</title>
        <meta
          name="description"
          content="Discover luxurious apartments in Dubai with stunning views, world-class amenities, and prime locations. Explore premium properties for sale and rent, tailored to your lifestyle in the heart of Dubai."
        />
        <meta
          name="keywords"
          content="Dubai apartments for sale, Apartments in Dubai, Luxury apartments Dubai, Dubai apartment rentals, Affordable apartments in Dubai, Buy apartment in Dubai, Dubai property investment, Waterfront apartments Dubai, High-rise apartments in Dubai, Dubai apartments with sea view, Downtown Dubai apartments, Apartments near Dubai Marina, Studio apartments in Dubai, Family apartments in Dubai"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Best Apartments - Dubai",
              "description": "Discover luxurious apartments in Dubai with stunning views, world-class amenities, and prime locations. Explore premium properties for sale and rent, tailored to your lifestyle in the heart of Dubai.",
              "keywords": "Dubai apartments for sale, Apartments in Dubai, Luxury apartments Dubai, Dubai apartment rentals, Affordable apartments in Dubai, Buy apartment in Dubai, Dubai property investment, Waterfront apartments Dubai, High-rise apartments in Dubai, Dubai apartments with sea view, Downtown Dubai apartments, Apartments near Dubai Marina, Studio apartments in Dubai, Family apartments in Dubai",
              "url": "https://www.dnkre.com",
              "logo": "https://www.dnkre.com/logo192.png",
              "image": "https://www.dnkre.com/logo192.png",
              "sameAs": [
                "https://www.facebook.com/dnkrealestate1/",
                "https://www.instagram.com/dnk_re/",
                "https://www.linkedin.com/company/dnkrealestate/mycompany/"
              ],
              "telephone": "+971555769195"
            }
          `,
          }}
        />
      </Head>

      <HeaderApt />
      <BannerApt />
      <FormApt />
      <ListApartment />
      <WhyChoose />
      <DeveloperStn />
      <CommunitieStn />
      <BestSaleStn />
      <TalkStn />
    </>
  );
};

export default ApartmentsDubai;
