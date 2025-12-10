"use client";

import React from 'react'
import BannerAbout from './BannerAbout'
import ADaboutSection from '../../components/ADaboutSection'
import { usePromotion } from '../../PromotionContext';


export default function AboutPage() {
     const promotionData = usePromotion(); // ✅ access promotion data
        if (!promotionData) return <div>Loading...</div>;
  return (
    <div>
        <BannerAbout  promotionData={promotionData}/>
        <ADaboutSection  promotionData={promotionData}/>
    </div>
  )
}