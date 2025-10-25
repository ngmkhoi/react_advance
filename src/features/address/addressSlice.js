import baseQuery from '@/utils/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react'

export const addressApi = createApi({
    reducerPath: 'address',
    baseQuery,
    endpoints: (build) => ({
        getProvinces: build.query({
            query: () => 'address/provinces',
            transformResponse: (response) => response.data,
        })
    }),
    // refetchOnFocus: true,
})

export const { useGetProvincesQuery } = addressApi;