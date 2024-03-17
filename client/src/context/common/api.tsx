import axios from "axios"

export const URL: string = "http://localhost:7777/api"

const axiosInstance = axios.create({
    baseURL: URL
})

axiosInstance.interceptors.response.use((response) => {
    return response.data;
})

export const commonRequest = async (method: string, url: string, data: object, headers: object) => {
    const requestConfig = {
        method,
        url,
        data,
        headers
    }

    try {
        const response = axiosInstance(requestConfig)
        return response;
    } catch (error) {
        console.log(`hey safee...  something went wrong ${error}`);
        return error;
    }
}