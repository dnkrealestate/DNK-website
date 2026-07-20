import axiosPrivate from "@/url/axios";

export const useSystemService = () => {
    const getSystemStatus = async () => {
        const response = await axiosPrivate.get("/system/status");
        return response.data;
    };

    return { getSystemStatus };
};
