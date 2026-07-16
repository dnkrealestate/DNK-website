import axiosPrivate from "@/url/axios";

export const useContactFolderServices = () => {
    const createFolder = async (name) => {
        const response = await axiosPrivate.post("/contact-folder/create", { name });
        return response.data;
    };

    const getFolders = async () => {
        const response = await axiosPrivate.get("/contact-folder");
        return response.data;
    };

    const getFolderById = async (id) => {
        const response = await axiosPrivate.get("/contact-folder/" + id);
        return response.data;
    };

    const addContactsToFolder = async (id, contacts) => {
        const response = await axiosPrivate.post(`/contact-folder/${id}/contacts`, { contacts });
        return response.data;
    };

    const updateContactInFolder = async (id, email, contact) => {
        const response = await axiosPrivate.put(
            `/contact-folder/${id}/contacts/${encodeURIComponent(email)}`,
            contact
        );
        return response.data;
    };

    const removeContactFromFolder = async (id, email) => {
        const response = await axiosPrivate.delete(
            `/contact-folder/${id}/contacts/${encodeURIComponent(email)}`
        );
        return response.data;
    };

    const deleteFolder = async (id) => {
        const response = await axiosPrivate.delete("/contact-folder/" + id);
        return response.data;
    };

    return {
        createFolder,
        getFolders,
        getFolderById,
        addContactsToFolder,
        updateContactInFolder,
        removeContactFromFolder,
        deleteFolder,
    };
};
