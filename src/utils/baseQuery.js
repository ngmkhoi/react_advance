import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery(
    {
        baseUrl: import.meta.env.VITE_BASE_API,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${localStorage.getItem('access_token') || ''}`);
            return headers;
        }
    }
)

export default baseQuery;