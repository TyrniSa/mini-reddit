import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getCategory = createAsyncThunk('category/getCategory', async () => {
  const response = await axios.get("https://www.reddit.com/subreddits.json");
  const data = response.data.data.children.map(category => category.data);
  return data
})

export const categorySlice = createSlice ({
  name: 'category',
  initialState: {
    categories: [],
    isLoading: false,
    hasError: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getCategory.fulfilled, (state,action) => {
        state.isLoading = false;
        state.hasError = false;
        state.categories = action.payload;
      })
      .addCase(getCategory.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.categories = 'Failed to load subreddits'
      })
  }
})

export const selectCategory = (state) => state.category.categories;
export const selectCategoryLoading = (state) => state.category.isLoading;

export default categorySlice.reducer