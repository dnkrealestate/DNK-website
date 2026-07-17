import axiosPrivate from "@/url/axios";

export const useInvitationTemplateServices = () => {
    const saveInvitationTemplate = async (eventplace, formdata) => {
        const response = await axiosPrivate.put("/invitation-template/" + eventplace, formdata, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    };

    const getInvitationTemplate = async (eventplace) => {
        const response = await axiosPrivate.get("/invitation-template/" + eventplace);
        return response.data;
    };

    return {
        saveInvitationTemplate,
        getInvitationTemplate,
    };
};
