import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const fetchRegister = createAsyncThunk("auth/fetchRegister", async (params) => {
  const { data } = await axios.post("/auth/register", params);
  return data;
});

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (id) => {
  const { data } = await axios.get(`/auth/user/${id}`);
  return data;
});

const initialState = {
  data: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.data = null;
        state.status = "failed";
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.data = null;
        state.status = "failed";
      })
      .addCase(fetchRegister.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.data = null;
        state.status = "failed";
      })
      .addCase(fetchUserById.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.data = null;
        state.status = 'failed';
      })
  },
});

export const { logout } = authSlice.actions;
export const selectIsAuth = state => Boolean(state.auth.data)
export const selectUserId = state => state.auth.data?._id
export const selectUserRole = state => state.auth.data?.status;
export const authPeducer = authSlice.reducer;
