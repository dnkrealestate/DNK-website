"use client";
import React from 'react'
import { usePromotion } from '../../PromotionContext';
import BannerPayment from './BannerPayment';
import ADpaymentPlan from '../../components/ADpaymentPlan';

export default function PaymentPlanPage() {
      const promotionData = usePromotion(); // ✅ access promotion data
        
          if (!promotionData) return <div>Loading...</div>;
  return (
    <div>
        <BannerPayment promotionData={promotionData}/>
        <ADpaymentPlan promotionData={promotionData}/>
        <div className="container max-w-[1240px] py-6 px-4 m-auto">
            <p dangerouslySetInnerHTML={{ __html: promotionData?.paymentPlanDetailDescription }}></p>
       </div>
    </div>
  )
}