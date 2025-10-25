import { getProductDetail, getProductsList } from "@/services/product/productService"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    list: [],
    loading: false,
    detail: null
}

// Create the product slice
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setList(state, action) {
            state.list = action.payload
        },
        setDetail(state, action) {
            state.detail = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductsList.pending, (state) => {
                state.loading = true
            })
            .addCase(getProductDetail.pending, (state) => {
                state.loading = true
            })
            .addCase(getProductsList.fulfilled, (state, action) => {
                state.list = action.payload.items
                state.loading = false
            })
            .addCase(getProductDetail.fulfilled, (state, action) => {
                state.detail = action.payload
                state.loading = false
            })
            .addCase(getProductsList.rejected, (state) => {
                state.loading = false
            })
            .addCase(getProductDetail.rejected, (state) => {
                state.loading = false
            })
        }
})

export const { setList, setDetail } = productSlice.actions

export default productSlice;

