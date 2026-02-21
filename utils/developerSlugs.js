import { getPartner } from "@/services/partnerServices";
import { generateSlug } from "./generateSlug";   // ✅ correct relative import

export async function getDeveloperSlugs() {
  try {
    const developers = await getPartner();

    if (!developers || !Array.isArray(developers)) {
      return [];
    }

    return developers.slice(0, 100).map((dev) =>
      generateSlug(dev.partnername)
    );
  } catch (error) {
    console.error("Error fetching developer slugs:", error);
    return [];
  }
}
