import { combineReducers } from "@reduxjs/toolkit";
import { breweryListReducer } from "./BreweryListSlice";
import { brewerySearchReducer } from "./BrewerySearchSlice";
import { breweriesDetailsReducer } from "./BreweryDetailsSlice";
import { wishlistReducer } from "./WishlistSlice";

const rootReducer = combineReducers({
  breweries: breweryListReducer,
  breweriesSearch: brewerySearchReducer,
  breweriesDetails: breweriesDetailsReducer,
  wishlist: wishlistReducer,
});

export default rootReducer;
