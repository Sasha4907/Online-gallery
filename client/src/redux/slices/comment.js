import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const addComment = createAsyncThunk('comment/addComment', async ({ pictureId, userId, content }) => {
    const { data } = await axios.post(`/gallery/${pictureId}/comment`, { pictureId, userId, content });
    return data;
});
  

const initialState = {
    data: null,
  loading: false,
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(addComment.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

export default commentsSlice.reducer;