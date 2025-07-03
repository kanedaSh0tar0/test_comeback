import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addCity,
  getTodayForecast,
  loadCities,
  refreshCity,
} from "./thunk/citiesThunk";
import { setCities } from "../utils/cities";

export type Hour = {
  dt: number;
  temp: number;
  weather: {
    description: string;
    icon: string;
  };
};

export type CityWeather = {
  data: {
    id: number;
    name: string;
    country: string;
    weather: string;
    icon: string;
    temp: number;
    feelsLike: number;
    humidity: number;
    tempMax: number;
    tempMin: number;
    coord: { lat: number; lon: number };
  };
  forecast: { hourly?: Hour[]; loading: boolean };
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
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ADD CITY
      .addCase(addCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCity.fulfilled, (state, action) => {
        if (!state.items.find((city) => city.data.id === action.payload.id)) {
          state.items.push({
            data: action.payload,
            forecast: { hourly: [], loading: false },
            refreshing: false,
          });
        }
        state.loading = false;
      })
      .addCase(addCity.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Error adding city";
      })
      //   REFRESH CITY
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
        const refreshIndex = state.items.findIndex(
          (city) => city.data.id === action.payload.id
        );

        if (refreshIndex !== -1) {
          state.items[refreshIndex].data = {
            ...state.items[refreshIndex].data,
            ...action.payload,
          };
          state.items[refreshIndex].refreshing = false;
        } else {
          state.error = "Something went wrong";
        }
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
      })
      // GET FORECAST
      .addCase(getTodayForecast.pending, (state, action) => {
        const city = state.items.find((c) => c.data.id === action.meta.arg);

        if (city) {
          city.forecast.hourly = undefined;
          city.forecast.loading = true;
          state.error = null;
        }
      })
      .addCase(getTodayForecast.fulfilled, (state, action) => {
        const { id, forecast } = action.payload;

        const city = state.items.find((c) => c.data.id === id);

        if (city) {
          city.forecast.hourly = forecast.hourly;
          city.forecast.loading = false;
        }
      })
      .addCase(getTodayForecast.rejected, (state, action) => {
        if (!action.payload) {
          state.error = action.error.message ?? "Unknown error";
          return;
        }

        const { id, err } = action.payload;

        const cityIndex = state.items.findIndex((city) => city.data.id === id);

        if (cityIndex) {
          state.error = err;
        } else {
          state.error = "Something went wrong";
        }

        state.items[cityIndex].forecast.loading = false;
      })
      // INITIAL REFRESH
      .addCase(loadCities.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      //   UPDATE LOCALSTORAGE
      .addMatcher(
        (action) =>
          [
            addCity.fulfilled.type,
            refreshCity.fulfilled.type,
            removeCity.type,
          ].includes(action.type),
        (state) => {
          setCities(state.items);
        }
      );
  },
});

export const { removeCity, clearError } = citiesSlice.actions;

export default citiesSlice.reducer;
