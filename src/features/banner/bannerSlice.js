import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  items: [],
  status: null,
};

export const bannerFatching = createAsyncThunk(
  "banner/bannerFatching",
  async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL}/api-banners`);

    return res.data;
  }
);

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bannerFatching.pending, (state) => {
      state.status = "loading..";
    });

    builder.addCase(bannerFatching.fulfilled, (state, action) => {
      state.status = "";
      state.items = action.payload;
    });

    builder.addCase(bannerFatching.rejected, (state) => {
      state.status = "Something Went Wrong";
    });
  },
});

export default bannerSlice.reducer;
