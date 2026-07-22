import React from 'react'
import SubBanner from '../components/subBanners/SubBanner'
import OurServices from './components/OurServices'
import { getReview } from '@/services/reviewServices';
import { getPartner } from '@/services/partnerServices';
import OurProcess from '../components/ourProcess/OurProcess';
import ReviewSection from '../components/reviewSection/ReviewSection';
import PartnerSection from '../components/partner/PartnerSection';
import TalkSection from '../components/talkSection/TalkSection';

const title = "Real Estate Services in Dubai | DNK Real Estate";
const description = "Explore DNK Real Estate's full range of services — off-plan and secondary sales, property investment consultancy, portfolio management, and end-to-end support for buyers, sellers, and investors in Dubai.";
const canonicalUrl = "https://www.dnkre.com/services";

export const metadata = {
    title,
    description,
    keywords: [
        "DNK Real Estate services",
        "Dubai real estate services",
        "property investment consultancy Dubai",
        "off-plan property services Dubai",
        "Dubai property management",
    ].join(', '),
    openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: "DNK Real Estate",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
    },
    alternates: {
        canonical: canonicalUrl,
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/favicon-96x96.png", sizes: "96x96" },
            { url: "/favicon.svg", type: "image/svg+xml" }
        ],
        apple: "/apple-touch-icon.png",
    },
    robots: "index, follow",
};

export default async function page() {
    let reviewData = [];
    let partnerData = [];
    try {
        const [review, partner] = await Promise.all([
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
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    const sortReview = reviewData
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    return (
        <>
            <SubBanner />
            <OurServices />
            <OurProcess />
            <ReviewSection reviewData={sortReview} />
            <PartnerSection partnerData={partnerData} />
            <TalkSection />
        </>
  )
}