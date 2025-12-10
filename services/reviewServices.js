import axiosPrivate, { URL } from "@/url/axios";

export const userReviewServices = () => {
    const postReview = async (formdata) => {
        const response = await axiosPrivate.post('/review/add-review', formdata, {
            headers: { "Content-Type": 'multipart/form-data' }
        })
        return response.data
    }

    const getReviewR = async () => {
        const response = await axiosPrivate.get('/review/get-review')
        return response.data
    };

    const putReview = async (id, data) => {
        const response = await axiosPrivate.put('/review/updatereview/' + id, data, {
            headers: { "Content-Type": 'multipart/form-data' }
        })
        return response.data
    }

    const deleteReview = async (id) => {
        const response = await axiosPrivate.delete('/review/delete-review/' + id)
        return response.data
    }


    return {
        postReview,
        putReview,
        deleteReview,
        getReviewR
    }
}

export const getReview = async () => {
    try {
        const res = await fetch(`${URL}review/get-review`, {
        });
        const data = await res.json();
        return data.success ? data.data : [];


    } catch (error) {
        console.error("Error fetching review:", error);
        return { success: false, data: [] };
    }
}