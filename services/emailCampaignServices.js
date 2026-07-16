import axiosPrivate from "@/url/axios";

export const useEmailCampaignServices = () => {
    const createCampaign = async (formdata) => {
        const response = await axiosPrivate.post("/email-campaign/create", formdata, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    };

    const updateCampaign = async (id, formdata) => {
        const response = await axiosPrivate.put("/email-campaign/" + id, formdata, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    };

    const pauseCampaign = async (id) => {
        const response = await axiosPrivate.put(`/email-campaign/${id}/pause`);
        return response.data;
    };

    const resumeCampaign = async (id) => {
        const response = await axiosPrivate.put(`/email-campaign/${id}/resume`);
        return response.data;
    };

    const getCampaigns = async () => {
        const response = await axiosPrivate.get("/email-campaign");
        return response.data;
    };

    const getCampaignById = async (id) => {
        const response = await axiosPrivate.get("/email-campaign/" + id);
        return response.data;
    };

    const deleteCampaign = async (id) => {
        const response = await axiosPrivate.delete("/email-campaign/" + id);
        return response.data;
    };

    return {
        createCampaign,
        updateCampaign,
        pauseCampaign,
        resumeCampaign,
        getCampaigns,
        getCampaignById,
        deleteCampaign,
    };
};
