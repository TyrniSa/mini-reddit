import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPost = createAsyncThunk('posts/getPost', async () => {
    const response = await axios.get("https://www.reddit.com/r/all.json");
    const data = response.data.data.children.map(post => post.data);
    return data
})

export const getSubReddit = createAsyncThunk('posts/getSubReddit', async (subreddit) => {
  const response = await axios.get(`https://www.reddit.com/r/${subreddit}.json`);
  const data = response.data.data.children.map(post => post.data);
  console.log(data)
  return data
})


export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    isLoading: false,
    hasError: false
  },
  reducers: {
    filterOnSearch: (state, action) => {
      state.posts = state.posts.filter(post =>
        post.title.toLowerCase().includes(action.payload.toLowerCase())
        )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubReddit
      .pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getSubReddit
      .fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.posts = action.payload;
      })
      .addCase(getSubReddit
      .rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(getPost.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.posts = action.payload;
      })
      .addCase(getPost.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.posts = 'There was an error in loading subreddits';
      })
  }
})

export const selectPost = (state) => state.post.posts;
export const selectIsLoading = (state) => state.post.isLoading;
export const selectHasError = (state) => state.post.hasError

export const {filterOnSearch} = postSlice.actions

export default postSlice.reducer