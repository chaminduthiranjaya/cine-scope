import { Movie } from "@/lib/interfaces/movie.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WatchListState = {
  items: Record<number, Movie>;
};

const initialState: WatchListState = {
  items: {},
};

const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    setInitialWatchList(
      state: WatchListState,
      action: PayloadAction<WatchListState["items"]>
    ) {
      state.items = action.payload;
    },

    addToWatchList(state: WatchListState, action: PayloadAction<Movie>) {
      const movie = action.payload;
      state.items[movie.id] = movie;
    },

    removeFromWatchList(state: WatchListState, action: PayloadAction<number>) {
      const movieId = action.payload;
      delete state.items[movieId];
    },
    clearWatchList(state: WatchListState) {
      state.items = {};
    },
  },
});

export const {
  setInitialWatchList,
  addToWatchList,
  removeFromWatchList,
  clearWatchList,
} = watchListSlice.actions;

export const watchListReducer = watchListSlice.reducer;
