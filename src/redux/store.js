import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filmReducer from "./Slices/Film";
import detailReducer from "./Slices/Detail";
import searchReducer from "./Slices/Search";

const reducer = combineReducers({
  detailReducer,
  searchReducer,
  filmReducer,
});

export default configureStore({ reducer });
