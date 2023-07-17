import { combineReducers } from "@reduxjs/toolkit";
import { breweryListReducer } from "./BreweryListSlice";
import { brewerySearchReducer } from "./BrewerySearchSlice";

const rootReducer = combineReducers({
  breweries: breweryListReducer,
  breweriesSearch: brewerySearchReducer,
});

export default rootReducer;
