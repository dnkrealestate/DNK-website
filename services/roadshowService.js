import axiosPrivate from "../url/axios";

export const userRoadshowServices = () => {

    const postRoadshowResgister = async (formdata) => {
        const response = await axiosPrivate.post('/event/roadshow-send', formdata, {
            headers: { "Content-Type": 'application/json' }
        });
        return response.data;
    };

    const getRoadshowLinkById = async (place) => {
        const response = await axiosPrivate.get('/event/link/' + place)
        return response.data
    }

    const deleteRegister = async (id) => {
        const response = await axiosPrivate.delete('/event/delete-register/' + id)
        return response.data
    }

    const getRoadshowRegister = async () => {
        const response = await axiosPrivate.get('/event/get-roadshow-register')
        return response.data
    };

    const postRoadshow = async (formdata) => {
        const response = await axiosPrivate.post('/event/create-roadshow', formdata, {
            headers: { "Content-Type": 'multipart/form-data' }
        })
        return response.data
    }

    const getRoadshow = async () => {
        const response = await axiosPrivate.get('/event/get-roadshow')
        return response.data
    };

    const putRoadshow = async (id, data) => {
        const response = await axiosPrivate.put('/event/update-roadshow/' + id, data, {
            headers: { "Content-Type": 'multipart/form-data' }
        })
        return response.data
    }

    const deleteRoadshow = async (id) => {
        const response = await axiosPrivate.delete('/event/delete-roadshow/' + id)
        return response.data
    }


    const postClientResgister = async (formdata) => {
        const response = await axiosPrivate.post('/event/clint-register', formdata, {
            headers: { "Content-Type": 'application/json' }
        });
        return response.data;
    };

    const postClientResgisterPort2 = async (formdata) => {
        const response = await axiosPrivate.post('/event/clint-register-port2', formdata, {
            headers: { "Content-Type": 'application/json' }
        });
        return response.data;
    };

    const getClientRegister = async () => {
        const response = await axiosPrivate.get('/event/get-clint-register')
        return response.data
    };

    const deleteClentRegister = async (id) => {
        const response = await axiosPrivate.delete('/event/delete-client-register/' + id)
        return response.data
    }

    const checkDuplicateClient = async (formdata) => {
        const response = await axiosPrivate.post('/event/check-duplicate', formdata, {
            headers: { "Content-Type": 'application/json' }
        });
        return response.data;
    };

    const postSourceRM = async (formdata) => {
        const response = await axiosPrivate.post('/event/add-source-rm', formdata, {
            headers: { "Content-Type": 'application/json' }
        });
        return response.data;
    };

    const updateSourceRM = async (id, data) => {
        const response = await axiosPrivate.put('/event/update-source-rm/' + id, data, {
            headers: { "Content-Type": 'multipart/form-data' }
        })
        return response.data
    }

    const deleteSourceRM = async (id) => {
        const response = await axiosPrivate.delete('/event/delete-source-rm/' + id)
        return response.data
    }

    const getSourceRM = async () => {
        const response = await axiosPrivate.get('/event/get-source-rm')
        return response.data
    };

    return {
        postRoadshowResgister,
        getRoadshowRegister,
        postRoadshow,
        getRoadshow,
        putRoadshow,
        deleteRoadshow,
        deleteRegister,
        postClientResgister,
        postClientResgisterPort2,
        getClientRegister,
        deleteClentRegister,
        checkDuplicateClient,
        getRoadshowLinkById,
        postSourceRM,
        updateSourceRM,
        deleteSourceRM,
        getSourceRM,
    }

}