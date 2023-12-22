import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
};

export const footerDetails = createAsyncThunk(
  "footerDetail/footerDetails",
  async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL}/api-pages`);
    return res.data;
  }
);

export const footerDetailSlice = createSlice({
  name: "footerDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(footerDetails.pending, (state, action) => {
      state.status = "loading...";
    });
    builder.addCase(footerDetails.fulfilled, (state, action) => {
      state.status = "";
      state.items = action.payload;
    });
    builder.addCase(footerDetails.rejected, (state, action) => {
      state.status = "Something Went Wrong";
    });
  },
});

export default footerDetailSlice.reducer;
