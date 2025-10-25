import { http } from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async () => {
        const response = await http.get('/auth/me')
        return response.data
    }
)

export { getCurrentUser };