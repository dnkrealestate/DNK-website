import React from 'react'
import SubBanner from '../components/subBanners/SubBanner'
import OurServices from './components/OurServices'
import { getReview } from '@/services/reviewServices';
import { getPartner } from '@/services/partnerServices';
import OurProcess from '../components/ourProcess/OurProcess';
import ReviewSection from '../components/reviewSection/ReviewSection';
import PartnerSection from '../components/partner/PartnerSection';
import TalkSection from '../components/talkSection/TalkSection';

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