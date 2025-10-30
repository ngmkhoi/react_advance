import { http } from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async () => {
        const response = await http.get('/auth/me')
        return response.data
    }
)

const register = async (data) => {
    const response = await http.post('/auth/register', data)
    return response.data
}

const login = async (data) => {
    const response = await http.post('/auth/login', data)
    return response.data
}

const logout = async () => {
    const response = await http.post('/auth/logout')
    return response.data
}

export { getCurrentUser, login, register, logout };