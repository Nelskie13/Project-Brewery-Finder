import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBreweriesData = createAsyncThunk(
  "breweries/fetchBreweriesData",
  async () => {
    const response = await fetch("https://api.openbrewerydb.org/v1/breweries");
    const data = await response.json();
    return data;
  }
);

const initialState = {
  loading: false,
  data: [],
  error: null,
  sortBy: "name",
};

const breweryListSlice = createSlice({
  name: "breweries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreweriesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBreweriesData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null; // Make sure to reset the error state on success
      })
      .addCase(fetchBreweriesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set the error message
      });
  },
});

export const { reducer: breweryListReducer } = breweryListSlice;
