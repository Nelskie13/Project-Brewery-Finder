import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBreweriesSearchData = createAsyncThunk(
  "breweries/fetchBreweriesSearchData",
  async (search) => {
    const response = await fetch(
      `https://api.openbrewerydb.org/v1/breweries/autocomplete?query=${search}`
    );
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

const brewerySearchSlice = createSlice({
  name: "breweriesSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreweriesSearchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBreweriesSearchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null; // Make sure to reset the error state on success
      })
      .addCase(fetchBreweriesSearchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set the error message
      });
  },
});

export const { reducer: brewerySearchReducer } = brewerySearchSlice;
