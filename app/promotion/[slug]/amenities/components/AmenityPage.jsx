"use client";

import React from 'react'
import BannerAmenities from './BannerAmenities'
import DetailAmenities from './DetailAmenities'
import { usePromotion } from "../../PromotionContext";

export default function AmenityPage() {
     const promotionData = usePromotion(); // ✅ access promotion data
    
      if (!promotionData) return <div>Loading...</div>;
    
  return (
    <div>
        <BannerAmenities promotionData={promotionData}/>
        <DetailAmenities promotionData={promotionData}/>
    </div>
  )
}