import axios from "axios";

const BASE_URL = `http://34.132.229.185:8000`

const axiosServices = {
    get: async (endpoint, params = {}, headers = {}, requiresAuth = false) => {
        try {
            if (requiresAuth) {
                const accessToken = localStorage.getItem("accessToken");
                if (accessToken) {
                    headers.Authorization = `Bearer ${accessToken}`;
                }
            }

            const response = await axios.get(`${BASE_URL}${endpoint}`, {
                params,  // ✅ Only query parameters
                headers, // ✅ Correctly pass headers
            });
            return response.data;
        } catch (error) {
            console.error("GET ERROR:", error.response?.data || error.message);
            throw error;
        }
    },

    post: async (endpoint, data = {}, headers = {}, requiresAuth = false) => {
        try {
            if (requiresAuth) {
                const accessToken = localStorage.getItem("accessToken");
                if (accessToken) {
                    headers.Authorization = `Bearer ${accessToken}`;
                }
            }

            const response = await axios.post(`${BASE_URL}${endpoint}`, data, { headers });
            return response.data;
        } catch (error) {
            console.error("POST ERROR:", error.response?.data || error.message);
            throw error;
        }
    },

    put: async (endpoint, data = {}, headers = {}, requiresAuth = false) => {
        try {
            if (requiresAuth) {
                const accessToken = localStorage.getItem("accessToken");
                if (accessToken) {
                    headers.Authorization = `Bearer ${accessToken}`;
                }
            }

            const response = await axios.put(`${BASE_URL}${endpoint}`, data, { headers });
            return response.data;
        } catch (error) {
            console.error("PUT ERROR:", error.response?.data || error.message);
            throw error;
        }
    },

    delete: async (endpoint, headers = {}, requiresAuth = false) => {
        try {
            if (requiresAuth) {
                const accessToken = localStorage.getItem("accessToken");
                if (accessToken) {
                    headers.Authorization = `Bearer ${accessToken}`;
                }
            }

            const response = await axios.delete(`${BASE_URL}${endpoint}`, { headers });
            return response.data;
        } catch (error) {
            console.error("DELETE ERROR:", error.response?.data || error.message);
            throw error;
        }
    }
};

export default axiosServices;
