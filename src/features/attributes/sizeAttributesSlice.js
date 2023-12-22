import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  items: [],
  status: null,
};

export const sizeAttributeFatching = createAsyncThunk(
  "sizeAttribute/sizeAttributeFetching",
  async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL}/api-attribute/6`);
    return res.data;
  }
);

export const sizeAttributeSlice = createSlice({
  name: "sizeAttribute",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sizeAttributeFatching.pending, (state) => {
      state.status = "loading..";
    });
    builder.addCase(sizeAttributeFatching.fulfilled, (state, action) => {
      state.status = "";
      state.items = action.payload;
    });
    builder.addCase(sizeAttributeFatching.rejected, (state) => {
      state.status = "Something Went Wrong";
    });
  },
});

export default sizeAttributeSlice.reducer;
