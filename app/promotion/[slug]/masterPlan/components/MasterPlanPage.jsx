"use client";
import React from 'react'
import { usePromotion } from '../../PromotionContext';
import { BannerMasterPlan } from './BannerMasterPlan';
import ADMasterPlan from '../../components/ADMasterPlan';

export default function MasterPlanPage() {
      const promotionData = usePromotion(); // ✅ access promotion data
        
          if (!promotionData) return <div>Loading...</div>;
  return (
    <div>
        <BannerMasterPlan promotionData={promotionData}/>
        <ADMasterPlan promotionData={promotionData}/>
        <div className="container max-w-[1240px] py-6 px-4 m-auto">
            <p dangerouslySetInnerHTML={{ __html: promotionData?.paymentPlanDetailDescription }}></p>
       </div>
    </div>
  )
}