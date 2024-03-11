import { configureStore } from "@reduxjs/toolkit";
import { jokeSlice } from "./features/jokes/joke.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      joke: jokeSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
