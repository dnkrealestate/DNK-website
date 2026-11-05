// Shared facts for the Palm Springs by Nakheel "premium" presentation.
// Figures mirror what's established on /palm-springs-nakheel: AED 3.8M–9M,
// 3 & 4BR Townhouses and 4&5BR Villas, as advertised and unconfirmed by
// Nakheel. Nothing here invents a figure that page doesn't already carry.

// UAE Dirham is pegged to the US Dollar at this fixed rate.
export const AED_TO_USD_RATE = 3.6725;

export function aedToUsd(aed) {
  return Math.round(aed / AED_TO_USD_RATE);
}

export function formatUsdShort(usd) {
  return `$${(usd / 1_000_000).toFixed(2)}M`;
}

export const PRICE_AED_MIN = 3_800_000;
export const PRICE_AED_MAX = 9_000_000;
export const PRICE_USD_MIN = aedToUsd(PRICE_AED_MIN);
export const PRICE_USD_MAX = aedToUsd(PRICE_AED_MAX);

export const WHATSAPP_NUMBER = "+971555769195";
export const WHATSAPP_TEXT =
  "Hello, I am interested in Palm Springs by Nakheel in Dubai. Please share the latest project details, pricing and floor plans.";

export const BITRIX_LEAD_URL =
  "https://crm.dnkre.com/rest/1/tu18jyuvffebb7mc/crm.lead.add.json";
