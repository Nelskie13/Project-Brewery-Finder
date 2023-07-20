import { createSlice } from "@reduxjs/toolkit";

// Load wishlist data from local storage on application startup
const initialState = {
  breweries: JSON.parse(localStorage.getItem("selectedBreweriesData")) || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const brewery = action.payload;
      if (!state.breweries.some((item) => item.id === brewery.id)) {
        state.breweries.push(brewery);
        // Save the updated wishlist data to local storage
        localStorage.setItem(
          "selectedBreweriesData",
          JSON.stringify(state.breweries)
        );
      }
    },
    removeFromWishlist: (state, action) => {
      const breweryId = action.payload;
      state.breweries = state.breweries.filter((item) => item.id !== breweryId);
      // Save the updated wishlist data to local storage
      localStorage.setItem(
        "selectedBreweriesData",
        JSON.stringify(state.breweries)
      );
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export const { reducer: wishlistReducer } = wishlistSlice;
