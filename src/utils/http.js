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
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
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
    },
    async (error) => {
        const originalRequest = error.config;

        if(error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');

                if(!refreshToken) {
                    localStorage.clear();
                    window.location.href = '/login';
                    return Promise.reject(error);
                }

                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_API}/auth/refresh-token`,
                    { refresh_token: refreshToken },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                const { access_token, refresh_token } = response.data.data;

                localStorage.setItem('accessToken', access_token);
                localStorage.setItem('refreshToken', refresh_token);

                originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

                return httpClient(originalRequest);
            } catch (refreshError){
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
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