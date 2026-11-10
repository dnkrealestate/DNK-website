// Shared facts for the Palm Springs by Nakheel "premium" presentation.
// Unit pricing, sizes and the payment plan below are the confirmed brochure
// figures supplied directly by the user (starting prices in AED).

// UAE Dirham is pegged to the US Dollar at this fixed rate.
export const AED_TO_USD_RATE = 3.6725;

export function aedToUsd(aed) {
  return Math.round(aed / AED_TO_USD_RATE);
}

export function formatUsdShort(usd) {
  return `$${(usd / 1_000_000).toFixed(2)}M`;
}

export const PRICE_AED_MIN = 3_800_000;
export const PRICE_AED_MAX = 8_900_000;
export const PRICE_USD_MIN = aedToUsd(PRICE_AED_MIN);
export const PRICE_USD_MAX = aedToUsd(PRICE_AED_MAX);

// Payment schedule — 60% before handover / 40% on handover.
// Percentages apply uniformly across every unit type below.
export const PAYMENT_STAGES = [
  { label: "Down Payment", due: "On Booking", percent: 10 },
  { label: "1st Instalment", due: "April 2027", percent: 10 },
  { label: "2nd Instalment", due: "September 2027", percent: 10 },
  { label: "3rd Instalment", due: "February 2028", percent: 10 },
  { label: "4th Instalment", due: "July 2028", percent: 10 },
  { label: "5th Instalment", due: "December 2028", percent: 5 },
  { label: "6th Instalment", due: "May 2029", percent: 5 },
  { label: "Handover", due: "October 2030", percent: 40 },
];

export const DLD_FEE_PERCENT = 4;
export const ESTIMATED_COMPLETION = "October 2030";

export const UNIT_TYPES = [
  {
    label: "3 Bedroom Townhouse",
    sub: "Mid Unit",
    bedrooms: 3,
    layout: "Townhouse",
    floors: "G+1",
    priceAed: 3_800_000,
    areaSqft: 2_328.6,
    areaSqm: 216.3,
    plotSqft: 2_178.03,
    plotSqm: 202.3,
    description: "Family-friendly layouts with a private garden and a Nakheel address, as advertised across the Palm Springs community.",
    image: "/assets/palm-springs-nakheel/images/townhouse-4plex-street-day.png",
    floorPlanImage: "/assets/palm-springs-nakheel/images/floor-plan-townhouse-3br.jpg",
    floorPlanExact: true,
  },
  {
    label: "4 Bedroom Townhouse",
    sub: "Type 1, Corner Unit",
    bedrooms: 4,
    layout: "Townhouse",
    floors: "G+1",
    priceAed: 4_600_000,
    areaSqft: 2_672.0,
    areaSqm: 248.2,
    plotSqft: 3_268.7,
    plotSqm: 303.7,
    description: "A corner plot with extra garden space, offering more room to grow into within the townhouse collection.",
    image: "/assets/palm-springs-nakheel/images/townhouse-4plex-street-dusk.png",
    floorPlanImage: "/assets/palm-springs-nakheel/images/floor-plan-townhouse-4br.jpg",
    floorPlanExact: true,
  },
  {
    label: "4 Bedroom Townhouse",
    sub: "Type 2, Corner Unit",
    bedrooms: 4,
    layout: "Townhouse",
    floors: "G+2",
    priceAed: 5_200_000,
    areaSqft: 3_115.4,
    areaSqm: 289.4,
    plotSqft: 3_434.8,
    plotSqm: 319.1,
    description: "The largest townhouse configuration, with an additional floor over Type 1 on the same corner-plot footprint.",
    image: "/assets/palm-springs-nakheel/images/townhouse-6plex-corner.png",
    floorPlanImage: "/assets/palm-springs-nakheel/images/floor-plan-townhouse-4br.jpg",
    floorPlanExact: false,
  },
  {
    label: "4 Bedroom Villa",
    sub: "Standalone Villa",
    bedrooms: 4,
    layout: "Villa",
    floors: "G+2",
    priceAed: 7_000_000,
    areaSqft: 4_041.4,
    areaSqm: 375.4,
    plotSqft: 5_157.7,
    plotSqm: 479.1,
    description: "Standalone villas with added privacy and outdoor space, as advertised across the Palm Springs community.",
    image: "/assets/palm-springs-nakheel/images/villa-4br-street-porsche.png",
    floorPlanImage: "/assets/palm-springs-nakheel/images/floor-plan-sample.png",
    floorPlanExact: false,
  },
  {
    label: "5 Bedroom Villa",
    sub: "Standalone Villa",
    bedrooms: 5,
    layout: "Villa",
    floors: "G+2",
    priceAed: 8_900_000,
    areaSqft: 4_921.4,
    areaSqm: 457.2,
    plotSqft: 6_064.5,
    plotSqm: 563.4,
    description: "The largest advertised configuration at Palm Springs, for those who want the most space on their own plot.",
    image: "/assets/palm-springs-nakheel/images/villa-5br-street-evening.png",
    floorPlanImage: "/assets/palm-springs-nakheel/images/floor-plan-villa-5br.jpg",
    floorPlanExact: true,
  },
];

export const WHATSAPP_NUMBER = "+971555769195";
export const WHATSAPP_TEXT =
  "Hello, I am interested in Palm Springs by Nakheel in Dubai. Please share the latest project details, pricing and floor plans.";

export const BITRIX_LEAD_URL =
  "https://crm.dnkre.com/rest/1/tu18jyuvffebb7mc/crm.lead.add.json";
