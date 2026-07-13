import axiosPrivate, { URL } from "@/url/axios";

export const trackPageView = async (path, visitorId) => {
    try {
        await fetch(`${URL}analytics/track`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path, visitorId }),
            keepalive: true,
        });
    } catch (err) {
        // Analytics failures should never disrupt the visitor's experience.
    }
};

export const useAnalyticsServices = () => {
    const getAnalyticsSummary = async (days = 30) => {
        const response = await axiosPrivate.get(`/analytics/summary?days=${days}`);
        return response.data;
    };

    return { getAnalyticsSummary };
};
