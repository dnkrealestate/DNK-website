import React from 'react'
import AboutPage from './components/AboutPage'
import { URL, WWURL } from '@/url/axios';

async function fetchPromotions() {
  const res = await fetch(`${URL}promo/get-promotion`, { next: { revalidate: 60 } });
  const data = await res.json();
  return data.success ? data.data : [];
}

async function fetchPromotionBySlug(slug) {
  const promotions = await fetchPromotions();
  const matched = promotions.find((promo) => {
    const promoSlug = promo.promoUrl.trim().replace(/\s+/g, "-").toLowerCase()
    return promoSlug === slug;
  });
  return matched || null;
}




export async function generateMetadata({ params }) {

  const resolvedParams = await params; 
  const { slug } = resolvedParams;
  const promotionData = await fetchPromotionBySlug(slug);

  if (!promotionData) {
    return {
      title: "Promotion not found | DNK Real Estate",
      description: "The requested promotion could not be found.",
    };
  }

  const title = `${promotionData.seoTitleAbout? promotionData.seoTitleAbout : promotionData.seoTitle}`;
  const description = `${promotionData?.projectdescriptionAbout ? promotionData.projectdescriptionAbout : promotionData.projectdescription}`;
  const keywords = [
    promotionData.projectName,
    promotionData.projectkeywordAbout ? promotionData.projectkeywordAbout : promotionData.projectkeyword,
    promotionData.developer.replace(/-/g, ' '),
  ];

  const canonicalUrl = `https://www.dnkre.com/promotion/${promotionData.promoUrl.replace(/\s+/g, "-").toLowerCase()}/about`;
  const coverImageUrl = promotionData?.aboutImg1? `${WWURL}${promotionData.aboutImg1}` : null;
  const developerLogoUrl = promotionData?.developerlogo
    ? `${WWURL}${encodeURIComponent(promotionData.developerlogo)}`
    : 'https://www.dnkre.com/favicon.ico';
  const thumbnailUrl = promotionData?.aboutImg1? `${WWURL}${promotionData.aboutImg1}` : null;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'DNK Real Estate',
      type: 'website',
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/webp',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [thumbnailUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    link: [
      { rel: 'canonical', href: canonicalUrl },
      { rel: 'preload', as: 'image', href: coverImageUrl, type: 'image/webp', fetchpriority: 'high' },
      { rel: 'preload', as: 'image', href: developerLogoUrl, type: 'image/webp', fetchpriority: 'high' },
      { rel: 'shortcut icon', href: 'https://www.dnkre.com/favicon.ico' },
    ],
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-96x96.png", sizes: "96x96" },
        { url: "/favicon.svg", type: "image/svg+xml" }
      ],
      apple: "/apple-touch-icon.png",
    },
    meta: {
      author: 'DNK Real Estate',
      robots: 'index, follow',
    },
    metadataBase: "https://www.dnkre.com",
    jsonLd: [
      {
        "@context": "http://schema.org",
        "@type": "Organization",
        name: "DNK Real Estate",
        logo: "https://www.dnkre.com/favicon.ico",
        url: "https://dnkre.com",
        sameAs: [
          "https://www.instagram.com/dnk_re/",
          "https://www.facebook.com/dnkrealestate1/",
          "https://www.linkedin.com/company/dnkrealestate/",
          "https://www.youtube.com/channel/UCKH7d3Sx2dkfb4pEXXaMpFA",
        ],
        telephone: "+971555769195",
        email: "info@dnkre.com",
        address: "Suite No: 603, Sama Building, Al Barsha 1 - Al Barsha, Dubai, United Arab Emirates",
      },
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": `https://dnkre.com/promotion/${promotionData.promoUrl.replace(/\s+/g, "-").toLowerCase()}`,
              name: "Home",
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "AboutPage",
              name: "About",
              "@id": `https://dnkre.com/promotion/${promotionData.promoUrl.replace(/\s+/g, "-").toLowerCase()}/about`,
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "ContactPage",
              name: "Contact",
              "@id": `https://dnkre.com/promotion/${promotionData.promoUrl.replace(/\s+/g, "-").toLowerCase()}/contact`,
            },
          },
          {
            "@type": "ListItem",
            position: 4,
            item: {
              "@type": "PaymentPlan",
              name: "Payment-Plan",
              "@id": `https://dnkre.com/promotion/${promotionData.promoUrl.replace(/\s+/g, "-").toLowerCase()}/paymentPlan`,
            },
          },
        ],
        numberOfItems: 4,
      },
      {
        "@context": "http://schema.org",
        "@type": "ItemPage",
        mainEntity: {
          "@type": "WebPage",
          name: title,
          description: description,
          keywords: keywords.join(', '),
          url: canonicalUrl,
          image: thumbnailUrl,
          offers: [
            {
              "@type": "Offer",
              name: title,
              price: promotionData?.startingPrice,
              priceCurrency: "AED",
              itemOffered: {
                "@type": "House",
                name: title,
                logo: thumbnailUrl,
                url: canonicalUrl,
                image: thumbnailUrl,
              },
              offeredBy: {
                "@type": "Organization",
                name: "DNK Real Estate",
                address: "Suite No: 603, Sama Building, Al Barsha 1 - Al Barsha, Dubai, United Arab Emirates",
                telephone: "+971555769195",
                email: "info@dnkre.com",
                image: thumbnailUrl,
                sponsor: {
                  "@type": "Organization",
                  url: canonicalUrl,
                  name: promotionData?.developer.replace(/-/g, " "),
                },
              },
            },
          ],
        },
      },
    ],
  };
}

export default function page() {
  return (
    <div>
        <AboutPage />
    </div>
  )
}