import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favoritesSlice";

const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
  },
});

export default store;
