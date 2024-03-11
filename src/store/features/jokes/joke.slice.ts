import { createSlice } from "@reduxjs/toolkit";
import { JokeInitialState } from "./joke.types";
import { fetchJokes } from "./joke.actions";

const initialState: JokeInitialState = {
  jokes: {
    total: 0,
    result: [],
  },
  isLoading: false,
  error: null,
};

export const jokeSlice = createSlice({
  name: "joke",
  initialState,
  reducers: {
    clearJokes: (state) => {
      state.jokes = {
        result: [],
        total: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJokes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchJokes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jokes = action.payload;
        state.error = "";
      })
      .addCase(fetchJokes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { clearJokes } = jokeSlice.actions;
