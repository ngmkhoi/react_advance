import { http } from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to get the list of products
const getProductsList = createAsyncThunk(
    'product/getProductList',
    async () => {
        const response = await http.get('/products')
        return response.data
    }
)

// Thunk to get product details by slug
const getProductDetail = createAsyncThunk(
    'product/getProductDetail',
    async (slug) => {
        const response = await http.get(`/products/${slug}`)
        return response.data
    }
)

export { getProductsList, getProductDetail };