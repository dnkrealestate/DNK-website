import axiosPrivate, { URL } from "@/url/axios";

export const userTeamServices = () => {

    const postTeamList = async (formdata) => {
        const response = await axiosPrivate.post('/team/add-team', formdata, {
            headers: { "Content-Type": 'multipart/form-data' }
        })
        return response.data
    }

    const putTeamList = async (id, data) => {
        const response = await axiosPrivate.put('/team/updateteam/' + id, data, {
            headers: { "Content-Type": 'multipart/form-data' }
        })
        return response.data
    }
    const getTeamPublicList = async () => {
        const response = await axiosPrivate.get('/team/get-team-public')
        return response.data
    };
    const getTeamListR = async (id, data) => {
        const response = await axiosPrivate.get('/team/get-team')
        return response.data
    };
    const getTeamById = async (id, data) => {
        const response = await axiosPrivate.get('/team/staff/' + id);
        return response.data;
    };
    const deleteTeamList = async (id, data) => {
        const response = await axiosPrivate.delete('/team/delete-team/' + id)
        return response.data
    }

    return {
        postTeamList,
        putTeamList,
        getTeamPublicList,
        deleteTeamList,
        getTeamListR,
    }
}

export const getTeamList = async () => {
    try {
        const res = await fetch(`${URL}team/get-team`, {
            next: { revalidate: 60 }
        });
        const data = await res.json();
        return data.success ? data.data : [];


    } catch (error) {
        console.error("Error fetching team list:", error);
        return { success: false, data: [] };
    }
}

export async function getTeamById({ id }) {

    try {
        const url = `${URL}team/staff/${id}`;
        const response = await fetch(url, {
            next: { revalidate: 60 }
        });

        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            return null;
        }

        const news = await response.json();
        return news;
    } catch (error) {
        console.error("Error fetching team data:", error);
        return null;
    }
}
