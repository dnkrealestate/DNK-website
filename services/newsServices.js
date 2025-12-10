import axiosPrivate, { URL } from "@/url/axios";

export const userNewsServices = () => {
    const postNews = async (formdata) => {
        const response = await axiosPrivate.post('/news/add-news', formdata, {
            headers: { "Content-Type": 'multipart/form-data' }
        })
        return response.data
    }

    const getNewsR = async () => {
        const response = await axiosPrivate.get('/news/get-news')
        return response.data
    };

    const getNewsApi = async () => {
        const response = await axiosPrivate.get('/news/get-news')
        return response.data
    };

    const getNewsById = async (newsurl) => {
        const response = await axiosPrivate.get('/news/newspage/' + newsurl)
        return response.data
    }

    const putNews = async (id, data) => {
        const response = await axiosPrivate.put('/news/updatenews/' + id, data, {
            headers: { "Content-Type": 'multipart/form-data' }
        })
        return response.data
    }

    const deleteNews = async (id) => {
        const response = await axiosPrivate.delete('/news/delete-news/' + id)
        return response.data
    }

    return {
        postNews,
        getNewsById,
        putNews,
        deleteNews,
        getNewsApi,
        getNewsR,
    }
}


export const getNews = async () => {
    try {
        const res = await fetch(`${URL}news/get-news`, {
        });
        const data = await res.json();
        return data.success ? data.data : [];


    } catch (error) {
        console.error("Error fetching news:", error);
        return { success: false, data: [] };
    }
}


export async function getNewsById({ newsurl }) {
    if (!newsurl) {
        console.error("Error: newsurl is undefined.");
        return null;
    }

    try {
        const url = `${URL}news/newspage/${newsurl}`;
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
        console.error("Error fetching news data:", error);
        return null;
    }
}
