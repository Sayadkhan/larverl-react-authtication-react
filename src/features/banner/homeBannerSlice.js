import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
};

export const homeBannerFetching = createAsyncThunk(
  "homeBanner/homeBannerFetching",
  async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL}/api-homebanners`);
    return res.data;
  }
);

export const homeBannerSlice = createSlice({
  name: "homeBanner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(homeBannerFetching.pending, (state) => {
      state.status = "loading..";
    });
    builder.addCase(homeBannerFetching.fulfilled, (state, action) => {
      state.status = "";
      state.items = action.payload;
    });
    builder.addCase(homeBannerFetching.rejected, (state) => {
      state.status = "Something Went Wrong";
    });
  },
});

export default homeBannerSlice.reducer;
