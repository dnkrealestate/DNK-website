import axiosPrivate from "@/url/axios";

export const useEmailTemplateServices = () => {
    const createTemplate = async (formdata) => {
        const response = await axiosPrivate.post("/email-template/create", formdata, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    };

    const getTemplates = async () => {
        const response = await axiosPrivate.get("/email-template");
        return response.data;
    };

    const getTemplateById = async (id) => {
        const response = await axiosPrivate.get("/email-template/" + id);
        return response.data;
    };

    const deleteTemplate = async (id) => {
        const response = await axiosPrivate.delete("/email-template/" + id);
        return response.data;
    };

    return {
        createTemplate,
        getTemplates,
        getTemplateById,
        deleteTemplate,
    };
};
