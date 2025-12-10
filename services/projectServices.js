import axiosPrivate, { URL } from "@/url/axios";

export const useProjectServices = () => {

    const postProjectList = async (formdata) => {
        const response = await axiosPrivate.post('/task/add-task', formdata, {
            headers: { "Content-Type": 'multipart/form-data' }
        })
        return response.data
    }
    const putProjectList = async (id, data) => {
        const response = await axiosPrivate.put('/task/updatetask/' + id, data, {
            headers: { "Content-Type": 'multipart/form-data' }
        })
        return response.data
    }
    const getProjectListR = async () => {
        const response = await axiosPrivate.get('/task/get-task')
        return response.data
    }
    
    const getProjectById = async (projectname) => {
        const response = await axiosPrivate.get('/task/project/' + projectname)
        return response.data
    }
    const deleteProjectList = async (id, data) => {
        const response = await axiosPrivate.delete('/task/delete-task/' + id)
        return response.data
    }
    const postAdImage = async (formdata) => {
        const response = await axiosPrivate.post('/task/add-ad', formdata, {
            headers: { "Content-Type": 'multipart/form-data' }
        })
        return response.data
    }
    const getAdR = async () => {
        const response = await axiosPrivate.get('/task/get-ad')
        return response.data
    }
    const putAd = async (id, data) => {
        try {
            const response = await axiosPrivate.put('/task/update-ad/' + id, data, {
                headers: { "Content-Type": 'multipart/form-data' }
            })
            return response.data
        } catch (err) {
            console.error("Error in putAd:", err);
            throw err;
        }

    }

    const postHomeBannerImage = async (formdata) => {
        const response = await axiosPrivate.post('/task/add-home-banner', formdata, {
            headers: { "Content-Type": 'multipart/form-data' }
        })
        return response.data
    }
    const getHomeBannerR = async () => {
        const response = await axiosPrivate.get('/task/get-home-banner')
        return response.data
    }
    const putHomeBanner = async (id, data) => {
        try {
            const response = await axiosPrivate.put('/task/update-home-banner/' + id, data, {
                headers: { "Content-Type": 'multipart/form-data' }
            })
            return response.data
        } catch (err) {
            console.error("Error in putHomeBanner:", err);
            throw err;
        }

    }

    const postEvent = async (formdata) => {
        const response = await axiosPrivate.post('/task/add-event', formdata, {
            headers: { "Content-Type": 'multipart/form-data' }
        })
        return response.data
    }
    const getEventR = async () => {
        const response = await axiosPrivate.get('/task/get-event')
        return response.data
    }
    const putEvent = async (id, data) => {
        try {
            const response = await axiosPrivate.put('/task/update-event/' + id, data, {
                headers: { "Content-Type": 'multipart/form-data' }
            })
            return response.data
        } catch (err) {
            console.error("Error in putHomeBanner:", err);
            throw err;
        }
    }

    const deleteEvent = async (id, data) => {
        const response = await axiosPrivate.delete('/task/delete-event')
        return response.data
    }

    const postLogo = async (formdata) => {
        const response = await axiosPrivate.post('/task/add-logo', formdata, {
            headers: { "Content-Type": 'multipart/form-data' }
        })
        return response.data
    }
    const getLogoR = async () => {
        const response = await axiosPrivate.get('/task/get-logo')
        return response.data
    }
    const putLogo = async (id, data) => {
        try {
            const response = await axiosPrivate.put('/task/update-logo/' + id, data, {
                headers: { "Content-Type": 'multipart/form-data' }
            })
            return response.data
        } catch (err) {
            throw err;
        }
    }

    const deleteLogo = async (id, data) => {
        const response = await axiosPrivate.delete('/task/delete-logo')
        return response.data
    }

    const getProjectPublicList = async () => {
        const response = await axiosPrivate.get('/task/get-task-public')
        return response.data
    }


    return {
        postProjectList,
        putProjectList,
        deleteProjectList,
        postAdImage,
        putAd,
        getProjectPublicList,
        postHomeBannerImage,
        putHomeBanner,
        postEvent,
        putEvent,
        deleteEvent,
        postLogo,
        putLogo,
        deleteLogo,
        getProjectListR,
        getAdR,
        getHomeBannerR,
        getEventR,
        getLogoR,
    }
}

export async function getProjectById({ projectname }) {
    if (!projectname) {
        console.error("Error: projectname is undefined.");
        return null;
    }

    try {
        const url = `${URL}task/project/${projectname}`;
        const response = await fetch(url, {
            next: { revalidate: 60 }
        });

        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            return null;
        }

        const project = await response.json();
        return project;
    } catch (error) {
        console.error("Error fetching project data:", error);
        return null;
    }
}


export async function getProjectList() {
    try {
        const res = await fetch(`${URL}task/get-task-public`, {
            next: { revalidate: 60 },
        });
        const data = await res.json();
        return data.success ? data.data : [];
        
    } catch (error) {
        console.error("Error fetching projects:", error);
        return { success: false, data: [] }; // Handle error gracefully
    }
}

export async function getHomeBanner() {
    try {
        const res = await fetch(`${URL}task/get-home-banner`, {
            next: { revalidate: 60 }, // Revalidate every 60 seconds
        });
        const data = await res.json();
        return data.success ? data.data : [];


    } catch (error) {
        console.error("Error fetching banner:", error);
        return { success: false, data: [] }; 
    }
}

export async function getEvent(){
    try {
        const res = await fetch(`${URL}task/get-event`, {
            next: { revalidate: 60 }, 
        });
        const data = await res.json();
        return data.success ? data.data : [];


    } catch (error) {
        console.error("Error fetching event:", error);
        return { success: false, data: [] };
    }
}

export async function getLogo() {
    try {
        const res = await fetch(`${URL}task/get-logo`, {
            next: { revalidate: 60 },
        });
        const data = await res.json();
        return data.success ? data.data : [];


    } catch (error) {
        console.error("Error fetching DNK Logo:", error);
        return { success: false, data: [] };
    }
}

export async function getAd() {
    try {
        const res = await fetch(`${URL}task/get-ad`, {
            next: { revalidate: 60 },
        });
        const data = await res.json();
        return data.success ? data.data : [];


    } catch (error) {
        console.error("Error fetching Ad:", error);
        return { success: false, data: [] };
    }
}

