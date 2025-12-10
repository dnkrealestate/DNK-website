"use client";

import React from "react";
import Head from "next/head";
import Lbanner from "./ADbanner";
import LFormBanner from "./ADFormBanner";
import LaboutSection from "./ADaboutSection";
import LimgSlider from "./ADimgSlider";
import LFloorPlanComponent from "./ADFloorPlanComponents";
import LpaymentPlan from "./ADpaymentPlan";
import LAmenitiesImg from "./ADAmenitiesImg";
import LDownloadSection from "./ADDownloadSection";
import LBanner360 from "./ADBanner360";
import LTalkSection from "./ADTalkSection";
import ADMasterPlan from "./ADMasterPlan";

const HomeAddressHills = () => {
  return (
    <>
      <Head>
        <title>Address Villas the Oasis | Emaar Properties</title>
        <meta
          name="keywords"
          content="Address Villas the Oasis, Address Villas by Emaar, Address Villas the oasis by Emaar, Emaar Properties"
        />
        <meta
          name="description"
          content="Discover Address Villas at The Oasis – the first-ever branded villas by Emaar, offering ultra-luxury 4 to 6-bedroom residences with stunning lagoon views. Nestled in a serene waterfront community, these spacious villas boast world-class amenities, lush green landscapes, and seamless indoor-outdoor living. With a prime location near Dubai’s key landmarks, this exclusive development promises both prestige and long-term value."
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="DNK Real Estate" />
        <link
          rel="canonical"
          href="https://dnkre.com/address-villas-the-oasis"
        />
        <meta
          property="og:url"
          content="https://www.dnkre.com/address-villas-the-oasis"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Address Villas the Oasis | Emaar Properties"
        />
        <meta
          property="og:description"
          content="Discover Address Villas at The Oasis – the first-ever branded villas by Emaar, offering ultra-luxury 4 to 6-bedroom residences with stunning lagoon views."
        />
        <meta
          property="og:image"
          content="https://dnkre.com/static/media/cover.86efb7b7c489d59a9c20.webp"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Address Villas the Oasis | Emaar Properties"
        />
        <meta
          name="twitter:description"
          content="Discover Address Villas at The Oasis – ultra-luxury villas by Emaar with stunning views and amenities."
        />
        <meta
          name="twitter:image"
          content="https://dnkre.com/static/media/cover.86efb7b7c489d59a9c20.webp"
        />
        <link rel="shortcut icon" href="https://www.dnkre.com/emaar.webp" />
        <link rel="apple-touch-icon" href="https://www.dnkre.com/emaar.webp" />
        <link
          rel="preload"
          as="image"
          href="https://dnkre.com/static/media/cover.86efb7b7c489d59a9c20.webp"
          type="image/webp"
        />
        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "http://schema.org",
                "@type": "Organization",
                name: "DNK Real Estate",
                logo: "https://www.dnkre.com/logo.webp",
                url: "https://dnkre.com",
                sameAs: [
                  "https://www.instagram.com/dnk_re/",
                  "https://www.facebook.com/dnkrealestate1/",
                  "https://www.linkedin.com/company/dnkrealestate/",
                  "https://www.youtube.com/channel/UCKH7d3Sx2dkfb4pEXXaMpFA",
                ],
                telephone: "+971555769195",
                email: "info@dnkre.com",
                address:
                  "Suite No: 603, Sama Building, Al Barsha 1 - Al Barsha, Dubai, United Arab Emirates",
              },
              {
                "@context": "http://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    item: {
                      "@id": "https://dnkre.com",
                      name: "Home",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    item: {
                      "@id": "https://dnkre.com/off-plan-project",
                      name: "Properties",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    item: {
                      "@id": "https://www.dnkre.com/news",
                      name: "News",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    item: {
                      "@id": "https://dnkre.com/contact",
                      name: "Contact",
                    },
                  },
                ],
              },
              {
                "@context": "http://schema.org",
                "@type": "ItemPage",
                mainEntity: {
                  "@type": "WebPage",
                  name: "Address Villas the Oasis | Emaar Properties",
                  description:
                    "Discover Address Villas at The Oasis – branded villas by Emaar, offering lagoon views and indoor-outdoor luxury.",
                  keywords:
                    "Address Villas the Oasis, Address Villas by Emaar, Address Villas the oasis by Emaar, Emaar Properties",
                  url: "https://dnkre.com/address-villas-the-oasis",
                  image:
                    "https://dnkre.com/static/media/cover.86efb7b7c489d59a9c20.webp",
                  offers: [
                    {
                      "@type": "Offer",
                      name: "Address Villas the Oasis | Emaar Properties",
                      availability: "https://schema.org/InStock",
                      price: "Call Us",
                      priceCurrency: "AED",
                      itemOffered: {
                        "@type": "House",
                        name: "Address Villas the Oasis | Emaar Properties",
                        url: "https://dnkre.com/address-villas-the-oasis",
                        image:
                          "https://dnkre.com/static/media/cover.86efb7b7c489d59a9c20.webp",
                      },
                      offeredBy: {
                        "@type": "Organization",
                        name: "DNK Real Estate",
                        address:
                          "Suite No: 603, Sama Building, Al Barsha 1 - Al Barsha, Dubai, United Arab Emirates",
                        telephone: "+971555769195",
                        email: "info@dnkre.com",
                        image: "https://www.dnkre.com/logo.webp",
                        sponsor: {
                          "@type": "Organization",
                          url: "https://dnkre.com/address-villas-the-oasis",
                          name: "Emaar",
                        },
                      },
                    },
                  ],
                },
              },
            ]),
          }}
        />
      </Head>

      <div className="bg-[#000]">
        <div className="overflow-hidden">
          <Lbanner />
          <LFormBanner />
          <LaboutSection />
          <LimgSlider />
          <LFloorPlanComponent />
          <ADMasterPlan />
          <LpaymentPlan />
          <LAmenitiesImg />
          <LDownloadSection />
          <LBanner360 />
          <LTalkSection />
        </div>
      </div>
    </>
  );
};

export default HomeAddressHills;
