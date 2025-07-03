import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "./citiesSlice";

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
