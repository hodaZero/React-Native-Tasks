import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    movies: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.movies.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.movies = state.movies.filter((m) => m.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
