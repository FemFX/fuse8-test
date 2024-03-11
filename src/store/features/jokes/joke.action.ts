import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchJokes = createAsyncThunk(
  "jokes/fetch",
  async (data: string, thunkAPI) => {
    try {
      const { data: jokes } = await axios.get(``);

      return jokes;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
