import React from 'react'
import PaymentPlanPage from './components/PaymentPlanPage'
import { URL, WWURL } from '@/url/axios';
import { PromotionJsonLd } from '../promotionSchema'

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

  const title = `${promotionData.seoTitlePaymentPlan? promotionData.seoTitlePaymentPlan : promotionData.seoTitle}`;
  const description = `${promotionData?.projectdescriptionPaymentPlan ? promotionData.projectdescriptionPaymentPlan : promotionData.projectdescription}`;
  const keywords = [
    promotionData.projectName,
    promotionData.projectkeywordPaymentPlan ? promotionData.projectkeywordPaymentPlan : promotionData.projectkeyword,
    promotionData.developer.replace(/-/g, ' '),
  ];

  const canonicalUrl = `https://www.dnkre.com/promotion/${promotionData.promoUrl.replace(/\s+/g, "-").toLowerCase()}/paymentPlan`;
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
  };
}

export default async function page({ params }) {
  const { slug } = await params;
  const promotionData = await fetchPromotionBySlug(slug);

  if (!promotionData) {
    return (
      <div>
        <PaymentPlanPage />
      </div>
    );
  }

  const title = `${promotionData.seoTitlePaymentPlan ? promotionData.seoTitlePaymentPlan : promotionData.seoTitle}`;
  const description = `${promotionData?.projectdescriptionPaymentPlan ? promotionData.projectdescriptionPaymentPlan : promotionData.projectdescription}`;
  const keywordsStr = [
    promotionData.projectName,
    promotionData.projectkeywordPaymentPlan ? promotionData.projectkeywordPaymentPlan : promotionData.projectkeyword,
    promotionData.developer.replace(/-/g, ' '),
  ].join(', ');
  const canonicalUrl = `https://www.dnkre.com/promotion/${promotionData.promoUrl.replace(/\s+/g, "-").toLowerCase()}/paymentPlan`;
  const thumbnailUrl = promotionData?.aboutImg1 ? `${WWURL}${promotionData.aboutImg1}` : null;

  return (
    <div>
      <PromotionJsonLd
        promotionData={promotionData}
        title={title}
        description={description}
        keywordsStr={keywordsStr}
        canonicalUrl={canonicalUrl}
        thumbnailUrl={thumbnailUrl}
      />
      <PaymentPlanPage />
    </div>
  )
}