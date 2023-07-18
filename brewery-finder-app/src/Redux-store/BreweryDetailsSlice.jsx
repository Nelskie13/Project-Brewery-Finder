import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBreweriesDetailsData = createAsyncThunk(
  "breweriesDetails/fetchBreweriesDetailsData",
  async (obdbId) => {
    const response = await fetch(
      `https://api.openbrewerydb.org/v1/breweries/${obdbId}`
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  loading: false,
  data: null, // Change from an empty object to null to indicate no data initially
  error: null,
};

const breweriesDetailsSlice = createSlice({
  name: "breweriesDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreweriesDetailsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBreweriesDetailsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null; // Make sure to reset the error state on success
      })
      .addCase(fetchBreweriesDetailsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set the error message
      });
  },
});

export const { reducer: breweriesDetailsReducer } = breweriesDetailsSlice;
