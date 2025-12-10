"use client";

import React from 'react'
import ContactBanner from './ContactBanner';
import { usePromotion } from '../../PromotionContext';

export default function ContactPage() {
       const promotionData = usePromotion(); // ✅ access promotion data
      
  if (!promotionData) return <div>Loading...</div>;

  return (
    <div>
        <ContactBanner promotionData={promotionData} />
    </div>
  )
}