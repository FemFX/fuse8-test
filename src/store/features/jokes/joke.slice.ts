import { createSlice } from "@reduxjs/toolkit";
import { JokeInitialState } from "./joke.types";

const initialState: JokeInitialState = {
  jokes: [],
  isLoading: false,
  error: null,
};

export const jokeSlice = createSlice({
  name: "joke",
  initialState,
  reducers: {},
});
