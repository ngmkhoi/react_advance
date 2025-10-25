import axios from "axios";

// Create axios instance
const httpClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    headers:{
        'Content-Type': 'application/json'
    }
})

// Request interceptor
httpClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// Response interceptor
httpClient.interceptors.response.use(
    (response) => {
        return response.data
    },(error) => {
        const errorMessage = error.response?.data.message || 'An error occurred';
        throw new Error(errorMessage);
    }
)

// Send request helper
const _send = async (method, path, data, config) => {
    return httpClient.request({ ...config, method, url: path, data });
};

// HTTP methods
const http = {
    get: (path, config) => _send("get", path, null, config),
    post: (path, data, config) => _send("post", path, data, config),
    put: (path, data, config) => _send("put", path, data, config),
    patch: (path, data, config) => _send("patch", path, data, config),
    del: (path, config) => _send("delete", path, null, config),
};
    
export { http };