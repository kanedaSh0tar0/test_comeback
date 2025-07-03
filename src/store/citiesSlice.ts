import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addCity, refreshCity } from "./thunk/citiesThunk";

const LOCAL_STORAGE_KEY = "cities";

export type CityWeather = {
  data: {
    id: number;
    name: string;
    country: string;
    weather: string;
    icon: string;
    temp: number;
    coord: { lat: number; lon: number };
  };
  refreshing: boolean;
};

export type CitiesState = {
  items: CityWeather[];
  loading: boolean;
  error: string | null;
};

const initialState: CitiesState = {
  items: [],
  loading: false,
  error: null,
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    removeCity(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (city) => city.data.id !== action.payload
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.items));
    },
    loadCities(state) {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (saved) {
        state.items = JSON.parse(saved);
      }
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCity.fulfilled, (state, action) => {
        if (!state.items.find((city) => city.data.id === action.payload.id)) {
          state.items.push({ data: action.payload, refreshing: false });
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.items));
        }
        state.loading = false;
      })
      .addCase(addCity.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Error adding city";
      })
      .addCase(refreshCity.pending, (state, action) => {
        const id = action.meta.arg;

        const refreshIndex = state.items.findIndex(
          (city) => city.data.id === id
        );

        if (refreshIndex !== -1) {
          state.items[refreshIndex].refreshing = true;
          state.error = null;
        } else {
          state.error = "Something went wrong";
        }
      })
      .addCase(refreshCity.fulfilled, (state, action) => {
        const { id, weather, temp, icon } = action.payload;

        const refreshIndex = state.items.findIndex(
          (city) => city.data.id === id
        );

        if (refreshIndex !== -1) {
          state.items[refreshIndex].data = {
            ...state.items[refreshIndex].data,
            ...action.payload,
          };
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.items));
        } else {
          state.error = "Something went wrong";
        }

        state.items[refreshIndex].refreshing = false;
      })
      .addCase(refreshCity.rejected, (state, action) => {
        if (!action.payload) {
          state.error = action.error.message ?? "Unknown error";
          return;
        }

        const { id, err } = action.payload;

        const refreshIndex = state.items.findIndex(
          (city) => city.data.id === id
        );

        if (refreshIndex !== -1) {
          state.error = err;
        } else {
          state.error = "Something went wrong";
        }

        state.items[refreshIndex].refreshing = false;
      });
  },
});

export const { removeCity, loadCities, clearError } = citiesSlice.actions;

export default citiesSlice.reducer;
