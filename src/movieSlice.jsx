import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

const MovieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.movies.push(action.payload);
    },
    deleteMovie: (state, action) => {
      state.movies = state.movies.filter((state) => state.movie.ids.imdb !== action.payload)
    },
  },
});

export const { addMovie, deleteMovie } = MovieSlice.actions;
export default MovieSlice.reducer;
