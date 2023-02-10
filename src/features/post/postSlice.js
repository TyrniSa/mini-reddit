import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getPost = createAsyncThunk('posts/getPost', async () => {
  const response = await fetch("https://www.reddit.com/r/all.json");
  const json = await response.json();
  const data = json.data.children.map(post => post.data)
  return data
})

export const getSubReddit = createAsyncThunk('posts/getSubReddit', async (subreddit) => {
  const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
  const json = await response.json();
  const data = json.data.children.map(post => post.data)
  console.log(data);
  return data
})


export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    isLoading: false,
    hasError: false
  },
  reducers: {},
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
export const selectPostLoading = (state) => state.post.isLoading;
export const selectHasError = (state) => state.post.hasError

export default postSlice.reducer