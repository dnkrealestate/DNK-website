"use client";

import React from 'react'
import BannerFloorPlan from './BannrFloorPlan'
import ADFloorPlan from '../../components/ADFloorPlan'
import { usePromotion } from '../../PromotionContext';

export default function FloorPlanPage() {
      const promotionData = usePromotion(); // ✅ access promotion data
    
      if (!promotionData) return <div>Loading...</div>;
      
  return (
    <div>
       <BannerFloorPlan promotionData={promotionData} />
       <ADFloorPlan promotionData={promotionData} />
       <div className="container max-w-[1240px] py-6 px-4 m-auto">
            <p dangerouslySetInnerHTML={{ __html: promotionData?.floorPlanCommonDescription }}></p>
       </div>
    </div>
  )
}