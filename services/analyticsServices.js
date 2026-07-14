import axiosPrivate, { URL } from "@/url/axios";

export const trackPageView = async (path, visitorId, referrer) => {
    try {
        await fetch(`${URL}analytics/track`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path, visitorId, referrer }),
            keepalive: true,
        });
    } catch (err) {
        // Analytics failures should never disrupt the visitor's experience.
    }
};

export const sendHeartbeat = async (visitorId) => {
    try {
        await fetch(`${URL}analytics/heartbeat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ visitorId }),
            keepalive: true,
        });
    } catch (err) {
        // Heartbeat failures should never disrupt the visitor's experience.
    }
};

export const useAnalyticsServices = () => {
    const getAnalyticsSummary = async (days = 30) => {
        const response = await axiosPrivate.get(`/analytics/summary?days=${days}`);
        return response.data;
    };

    const getAllPageViews = async (days = 30) => {
        const response = await axiosPrivate.get(`/analytics/pages?days=${days}`);
        return response.data;
    };

    const getOnlineCount = async () => {
        const response = await axiosPrivate.get(`/analytics/online`);
        return response.data;
    };

    return { getAnalyticsSummary, getAllPageViews, getOnlineCount };
};
