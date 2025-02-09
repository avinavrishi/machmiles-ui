import axios from "axios";

const BASE_URL = `http://34.134.214.156:8000`

const axiosServices = {
    get: async (endpoint, params = {}, headers = {}) => {
        try {
            const response = await axios.get(`${BASE_URL}${endpoint}`, { params, headers });
            return response.data;
        }
        catch (error) {
            console.error('GET ERROR', error);
            throw error;
        }
    },

    post: async (endpoint, data, headers = {}) => {
        try {
            const response = await axios.post(`${BASE_URL}${endpoint}`, data, { headers });
            return response.data;
        }
        catch (error) {
            console.error('POST ERROR', error);
            throw error;
        }
    },

    put: async (endpoint, data, headers = {}) => {
        try {
            const response = await axios.put(`${BASE_URL}${endpoint}`, data, { headers });
            return response.data;
        } catch (error) {
            console.error('PUT Error:', error);
            throw error;
        }
    },

    delete: async (endpoint, headers = {}) => {
        try {
            const response = await axios.delete(`${BASE_URL}${endpoint}`, { headers });
            return response.data;
        } catch (error) {
            console.error('DELETE Error:', error);
            throw error;
        }
    }
}

export default axiosServices;