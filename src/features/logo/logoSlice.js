import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  items: {},
  status: null,
};

export const logoFatching = createAsyncThunk("logo/logoFarching", async () => {
  const res = await axios.get(`${process.env.REACT_APP_URL}/api-headerlogo`);

  return res.data;
});

export const logoSlice = createSlice({
  name: "logo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logoFatching.pending, (state) => {
      state.status = "loding";
    });

    builder.addCase(logoFatching.fulfilled, (state, action) => {
      state.status = "";
      state.items = action.payload;
    });

    builder.addCase(logoFatching.rejected, (state) => {
      state.status = "something went wrong";
    });
  },
});

export default logoSlice.reducer;
