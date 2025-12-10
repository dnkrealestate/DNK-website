"use client";
import { createContext, useContext } from "react";

const PromotionContext = createContext(null);
export const usePromotion = () => useContext(PromotionContext);

export function PromotionProvider({ promotionData, children }) {
  return (
    <PromotionContext.Provider value={promotionData}>
      {children}
    </PromotionContext.Provider>
  );
}
