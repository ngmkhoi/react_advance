import { getCurrentUser } from "@/services/auth/authService";
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: null,
    loading: false,    
    error: null,      
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('accessToken');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                state.error = null;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.currentUser = null;
                // Log lỗi để debug (bao gồm cả lỗi 401)
                // console.log('getCurrentUser rejected:', action.error);
                // console.log('Error message:', action.error.message);
            })
    }
})

export const { logout } = authSlice.actions
export const selectCount = (state) => state.counter.value;

export default authSlice;
