import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice.jsx"

const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export default store
