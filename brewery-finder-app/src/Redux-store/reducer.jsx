import { combineReducers } from "@reduxjs/toolkit";
import { breweryListReducer } from "./BreweryListSlice";
import { brewerySearchReducer } from "./BrewerySearchSlice";
import { breweriesDetailsReducer } from "./BreweryDetailsSlice";

const rootReducer = combineReducers({
  breweries: breweryListReducer,
  breweriesSearch: brewerySearchReducer,
  breweriesDetails: breweriesDetailsReducer,
});

export default rootReducer;
