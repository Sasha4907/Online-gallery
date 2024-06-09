import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPictures = createAsyncThunk("gallery/fetchPictures", async () => {
    const { data } = await axios.get("/gallery");
    return data;
  }
);

export const fetchProcessingPictures = createAsyncThunk("/moderation/fetchProcessingPictures", async () => {
    const { data } = await axios.get("/moderation");
    return data;
  }
);

export const fetchPicturesByDate = createAsyncThunk( "gallery/fetchPicturesByDate", async () => {
    const { data } = await axios.get("/gallery/sorted/date");
    return data;
  }
);

export const fetchPicturesByPopularity = createAsyncThunk( "gallery/fetchPicturesByPopularity", async () => {
    const { data } = await axios.get("/gallery/sorted/popular");
    return data;
  }
);

export const fetchTopFivePictures = createAsyncThunk( "gallery/fetchTopFivePictures", async () => {
    const { data } = await axios.get("/gallery/top5");
    return data;
  }
);

export const fetchMostPopularPictureLastMonth = createAsyncThunk( "gallery/fetchMostPopularPictureLastMonth", async () => {
    const { data } = await axios.get("/gallery/popular/lastmonth");
    return data;
  }
);

export const searchPicturesByName = createAsyncThunk( "gallery/searchPicturesByName", async (searchTerm) => {
    const { data } = await axios.get(`/gallery/search/name?term=${searchTerm}`);
    return data;
  }
);

export const searchPicturesByArtist = createAsyncThunk( "gallery/searchPicturesByArtist", async (searchTerm) => {
    const { data } = await axios.get(
      `/gallery/search/artist?term=${searchTerm}`
    );
    return data;
  }
);

export const searchPicturesByTag = createAsyncThunk( "gallery/searchPicturesByTag", async (searchTerm) => {
    const { data } = await axios.get(
      `/gallery/search/genre?term=${searchTerm}`
    );
    return data;
  }
);

export const fetchRecommendations = createAsyncThunk("gallery/fetchRecommendations", async (userId) => {
    const { data } = await axios.get(
      `/gallery/search/recommendations/${userId}`
    );
    return data;
  }
);

const initialState = {
  pictures: [],
  popularPictures: [],
  loading: false,
};

const picturesSlice = createSlice({
  name: "pictures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPictures.pending, (state) => {
        state.pictures = [];
        state.status = "loading";
      })
      .addCase(fetchPictures.fulfilled, (state, action) => {
        state.status = "loaded";
        state.pictures = action.payload;
      })
      .addCase(fetchPictures.rejected, (state) => {
        state.pictures = [];
        state.status = "failed";
      })
      .addCase(fetchPicturesByDate.pending, (state) => {
        state.pictures = [];
        state.status = "loading";
      })
      .addCase(fetchPicturesByDate.fulfilled, (state, action) => {
        state.status = "loaded";
        state.pictures = action.payload;
      })
      .addCase(fetchPicturesByDate.rejected, (state) => {
        state.pictures = [];
        state.status = "failed";
      })
      .addCase(fetchPicturesByPopularity.pending, (state) => {
        state.pictures = [];
        state.status = "loading";
      })
      .addCase(fetchPicturesByPopularity.fulfilled, (state, action) => {
        state.status = "loaded";
        state.pictures = action.payload;
      })
      .addCase(fetchPicturesByPopularity.rejected, (state) => {
        state.pictures = [];
        state.status = "failed";
      })
      .addCase(fetchTopFivePictures.pending, (state) => {
        state.topFive = [];
        state.status = "loading";
      })
      .addCase(fetchTopFivePictures.fulfilled, (state, action) => {
        state.status = "loaded";
        state.topFive = action.payload;
      })
      .addCase(fetchTopFivePictures.rejected, (state) => {
        state.topFive = [];
        state.status = "failed";
      })
      .addCase(fetchMostPopularPictureLastMonth.pending, (state) => {
        state.mostPopularLastMonth = null;
        state.status = "loading";
      })
      .addCase(fetchMostPopularPictureLastMonth.fulfilled, (state, action) => {
        state.status = "loaded";
        state.mostPopularLastMonth = action.payload[0];
      })
      .addCase(fetchMostPopularPictureLastMonth.rejected, (state) => {
        state.mostPopularLastMonth = null;
        state.status = "failed";
      })
      .addCase(searchPicturesByName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchPicturesByName.fulfilled, (state, action) => {
        state.status = "loaded";
        state.pictures = action.payload;
      })
      .addCase(searchPicturesByName.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(searchPicturesByArtist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchPicturesByArtist.fulfilled, (state, action) => {
        state.status = "loaded";
        state.pictures = action.payload;
      })
      .addCase(searchPicturesByArtist.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(searchPicturesByTag.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchPicturesByTag.fulfilled, (state, action) => {
        state.status = "loaded";
        state.pictures = action.payload;
      })
      .addCase(searchPicturesByTag.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchRecommendations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.status = "loaded";
        state.pictures = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchProcessingPictures.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProcessingPictures.fulfilled, (state, action) => {
        state.status = "loaded";
        state.pictures = action.payload;
      })
      .addCase(fetchProcessingPictures.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const picturesPeducer = picturesSlice.reducer;
