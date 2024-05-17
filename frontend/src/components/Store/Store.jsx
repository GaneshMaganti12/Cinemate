import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import AuthReducer from "./Reducers/AuthReducer";
import MoviesReducer from "./Reducers/MoviesReducer";

export const Store = configureStore(
  {
    reducer: {
      auth: AuthReducer,
      movies: MoviesReducer,
    },
  },
  composeWithDevTools(applyMiddleware(thunk))
);
