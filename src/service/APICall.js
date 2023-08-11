import axios from "axios";
const BaseUrl = "http://localhost:8080/"
export const getApi = async (method, url, params = null , headers = null) => {
    try {
        const response = await axios({
            method: method,
            url: BaseUrl + url ,
            params: params,
            headers: headers,
        });
        return response.data;

    } catch (error) {
        console.error('API Error:', error.message);       
        throw error;
    }
};

export const postApi = async (method, url, data, headers) => {
    try {
        
        const response = await axios({
            method: method,
            url: BaseUrl + url,
            data: data,
            headers: headers,
        });
        return response.data;

    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
};
