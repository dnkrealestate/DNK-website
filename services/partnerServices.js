import axiosPrivate, { URL } from "@/url/axios";

export const userPartnerServices = () => {
    const postPartner = async (formdata) => {
        const response = await axiosPrivate.post('/partner/add-partner', formdata, {
            headers: { "Content-Type": 'multipart/form-data' }
        })
        return response.data
    }
    const getPartnerR = async () => {
        const response = await axiosPrivate.get('/partner/get-partner')
        return response.data
    };

    const getPartnerName = async (partnerName) => {
        const response = await axiosPrivate.get(`/partner/get-partner-name/${encodeURIComponent(partnerName)}`)
        return response.data
    };

    const putPartner = async (id, data) => {
        const response = await axiosPrivate.put('/partner/updatepartner/' + id, data, {
            headers: { "Content-Type": 'multipart/form-data' }
        })
        return response.data
    }

    const deletePartner = async (id) => {
        const response = await axiosPrivate.delete('/partner/delete-partner/' + id)
        return response.data
    }

    return {
        postPartner,
        putPartner,
        deletePartner,
        getPartnerName,
        getPartnerR,
    }

}

export const getPartner = async () => {
    try {
        const res = await fetch(`${URL}partner/get-partner`, {
        });
        const data = await res.json();
        return data.success ? data.data : [];


    } catch (error) {
        console.error("Error fetching partner", error);
        return { success: false, data: [] };
    }
}

export async function getPartnerNameR(partnername) {
    if (!partnername) {
        console.error("Error: partnerName is undefined.");
        return null;
    }

    try {
        const url = `${URL}partner/get-partner-name/${encodeURIComponent(partnername)}`;
        const response = await fetch(url, {
            next: { revalidate: 60 }
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching partner data:", error);
        return null;
    }
}
