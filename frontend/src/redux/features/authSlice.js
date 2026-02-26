import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
}

export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async() => {
        const res = await axios.get(`/api/user/profile`, {
            withCredentials: true
        })
        return res.data.user
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login : (state, action) => {
            state.user = action.payload.user
            state.isAuthenticated = true
            state.loading = false
            state.error = null
        },
        logout : (state) => {
            state.user = null
            state.isAuthenticated = false
            state.loading = false
            state.error = null
        },

        //reflect profile update changes in the UI
        update: (state, action) => {
            state.user = action.payload.user
            state.isAuthenticated = true
            state.loading = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUser.pending, (state) => {
            state.loading = true,
            state.error = null 
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false,
            state.user = action.payload,
            state.isAuthenticated = true
            state.error = null
        })
        .addCase(fetchUser.rejected, (state, action) => {
            state.loading = false,
            state.error = action.error
        })
    }
})

export const {login, logout, update} = authSlice.actions
export default authSlice.reducer