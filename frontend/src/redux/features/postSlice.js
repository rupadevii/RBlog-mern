import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    posts: [],
    page: 1,
    loading: false,
    error: null
}

export const fetchPosts = createAsyncThunk (
    'posts/fetchPosts',
    async (page=1) => {
        const res = await axios.get(`/api/posts?page=${page}`)
        return res.data.posts
    }
)

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        increasePage : (state) => {
            state.page += 1;
        },
        decreasePage : (state) => {
            state.page -= 1;
        }
    },
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

export const {increasePage, decreasePage} = postSlice.actions