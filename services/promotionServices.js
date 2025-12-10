import axiosPrivate, { URL } from "@/url/axios";

export const promotionServices = () => {
    const postPromotions = async (formdata) => {
      const response = await axiosPrivate.post("/promo/add-promotion", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    };

    const getPromotion = async () => {
        const response = await axiosPrivate.get('/promo/get-promotion')
        return response.data
    }

    const putPromotion = async (id, data) => {
        const response = await axiosPrivate.put('/promo/update-promotion/'+ id, data, {
            headers: { "Content-Type": 'multipart/form-data' }
        })
        return response.data
    }

  return { 
    postPromotions,
    getPromotion,
    putPromotion
   };
};

export async function getPromotionById({ promoUrl }) {
    if (!promoUrl) {
        console.error("Error: project name is undefined.");
        return null;
    }

    try {
        const url = `${URL}promo/get-promotion/${promoUrl}`;
        const response = await fetch(url, {
            next: { revalidate: 60 }
        });

        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            return null;
        }

        const project = await response.json();
        return project;
    } catch (error) {
        console.error("Error fetching project data:", error);
        return null;
    }
}