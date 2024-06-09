import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const addFavorite = createAsyncThunk("/favorite/addFavorite", async (pictureId) => {
  const { data } = await axios.post("/favorite", { painting_id: pictureId });
  return data;
});

export const removeFavorite = createAsyncThunk("/favorite/removeFavorite", async (pictureId) => {
  const { data } = await axios.delete("/favorite", { data: { painting_id: pictureId } });
  return data;
});

export const checkIfFavorite = createAsyncThunk("/favorite/checkIfFavorite", async (pictureId) => {
  const { data } = await axios.get(`/favorite/${pictureId}`);
  return data.liked;
});

export const fetchFavoritesCount = createAsyncThunk("/favorite/getFavoritesCountByPicture", async (pictureId) => {
    const { data } = await axios.get(`/${pictureId}/favorites`);
    return { pictureId, count: data.favoritesCount };
  });

const initialState = {
    favorites: {},
    status: 'idle',
};
  
const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addFavorite.pending, (state, action) => {
          state.status = 'loading';
        })
        .addCase(addFavorite.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.favorites[action.meta.arg] = true;
        })
        .addCase(addFavorite.rejected, (state, action) => {
          state.status = 'failed';
        })
        .addCase(removeFavorite.pending, (state, action) => {
          state.status = 'loading';
        })
        .addCase(removeFavorite.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.favorites[action.meta.arg] = false;
        })
        .addCase(removeFavorite.rejected, (state, action) => {
          state.status = 'failed';
        })
        .addCase(checkIfFavorite.pending, (state, action) => {
          state.status = 'loading';
        })
        .addCase(checkIfFavorite.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.favorites[action.meta.arg] = action.payload;
        })
        .addCase(checkIfFavorite.rejected, (state, action) => {
          state.status = 'failed';
        })
        .addCase(fetchFavoritesCount.pending, (state, action) => {
          state.status = 'loading';
        })
        .addCase(fetchFavoritesCount.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.favorites[action.payload.pictureId] = action.payload.count; 
        })
        .addCase(fetchFavoritesCount.rejected, (state, action) => {
          state.status = 'failed';
        });
    },
  });

export default favoriteSlice.reducer;