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
            localStorage.removeItem('token'); // Clear token
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
            })
    }
})

// export const { } = authSlice.actions
export const selectCount = (state) => state.counter.value;

export default authSlice;
