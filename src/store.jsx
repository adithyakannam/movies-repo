import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./MovieSlice"

const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export default store
