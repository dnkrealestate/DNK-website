import React from "react";
import ADHeader from "./components/ADHeader";
import FooterNad from "./components/FooterNad";
import TalkFooterNad from "./components/TalkFooterNad";
import { URL } from "@/url/axios";
import { getPromotionById } from "@/services/promotionServices";
import { PromotionProvider } from "./PromotionContext";

function generateSlug(name) {
  return name?.trim()?.replace(/\s+/g, "-").toLowerCase();
}

async function fetchPromotions() {
  const res = await fetch(`${URL}promo/get-promotion`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data.success ? data.data : [];
}

export async function generateStaticParams() {
  const promotions = await fetchPromotions();
  if (!promotions) return [];

  return promotions.map((promo) => ({
    slug: generateSlug(promo.promoUrl || promo.projectName),
  }));
}



export default async function layout({ children, params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let promotionData = null;
  let promotions = [];

  try {
    const promotionsData = await fetchPromotions();
    const matched = promotionsData.find((promo) => {
      const promoSlug =
        promo?.promoUrl
          ? generateSlug(promo.promoUrl)
          : generateSlug(promo.projectName);
      return promoSlug === slug;
    });

    if (!matched) {
      console.error("❌ No match found for slug:", slug);
      return <div>Error: Project not found</div>;
    }

    const project = await getPromotionById({ promoUrl: matched.promoUrl });

    if (!project?.success) {
      console.error("❌ Failed to load project:", project);
      return <div>Error: Failed to load project</div>;
    }

    promotionData = project.data;
    promotions = promotionsData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <PromotionProvider promotionData={promotionData}>
        <ADHeader promotionData={promotionData} />
        {children}
        <FooterNad promotionData={promotionData} />
        <TalkFooterNad promotionData={promotionData} />
      </PromotionProvider>
    </div>
  );
}
