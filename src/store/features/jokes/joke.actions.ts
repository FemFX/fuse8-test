import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJokes = createAsyncThunk(
  "jokes/fetch",
  async (data: string, thunkAPI) => {
    try {
      const { data: jokes } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL!}/jokes/search?query=${data}`
      );

      return jokes;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
