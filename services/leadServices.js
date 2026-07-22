import axiosPrivate, { URL } from "@/url/axios";

export const trackLeadClick = async ({ type, phone, page, source }) => {
    try {
        await fetch(`${URL}api/lead/click`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type, phone, page, source }),
            keepalive: true,
        });
    } catch (err) {
        // Click tracking should never disrupt the visitor's action (e.g. opening WhatsApp).
    }
};

export const useLeadServices = () => {
    const getLeads = async ({ type, days } = {}) => {
        const params = new URLSearchParams();
        if (type) params.set("type", type);
        if (days) params.set("days", days);
        const response = await axiosPrivate.get(`/api/leads?${params.toString()}`);
        return response.data;
    };

    const getLeadsSummary = async (days = 30) => {
        const response = await axiosPrivate.get(`/api/leads/summary?days=${days}`);
        return response.data;
    };

    const deleteLead = async (id) => {
        const response = await axiosPrivate.delete(`/api/lead/${id}`);
        return response.data;
    };

    return { getLeads, getLeadsSummary, deleteLead };
};
