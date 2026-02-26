import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    posts: [],
    loading: false,
    error: null
}

export const fetchPosts = createAsyncThunk (
    'posts/fetchPosts',
    async () => {
        const res = await axios.get(`/api/posts`)
        return res.data.posts
    }
)

export const postSlice = createSlice({
    name: 'post',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(fetchPosts.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
    }
})

export default postSlice.reducer