import axiosPrivate from "@/url/axios";

export const userUserServices = () => {
    const loginUser = async (data) => {
        const response = await axiosPrivate.post('/user/login', data)
        return response.data
    }
    const logoutUser = async (data) => {
        const response = await axiosPrivate.post('/user/logout', data)
        return response.data
    }
    const getUser = async () => {
        const response = await axiosPrivate.get('/user/get-user',)
        return response.data
    }

    const putUser = async (id, data) => {
        const response = await axiosPrivate.put('/user/update-user/' + id, data)
        return response.data
    }

    const forgotPass = async (data) => {
        const response = await axiosPrivate.post('/user/forgotpass', data)
        return response.data
    }

    const contactData = async (data) => {
        const response = await axiosPrivate.post('/user/send', data)
        return response.data
    }

    const callBackData = async (data) => {
        const response = await axiosPrivate.post('/user/call', data)
        return response.data
    }

    const careerMail = async (data) => {
        const response = await axiosPrivate.post('/user/careersmail', data)
        return response.data
    }

    return {
        loginUser,
        getUser,
        logoutUser,
        putUser,
        contactData,
        forgotPass,
        careerMail,
        callBackData
    }

}