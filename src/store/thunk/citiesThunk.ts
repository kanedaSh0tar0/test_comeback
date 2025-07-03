import { createAsyncThunk } from "@reduxjs/toolkit";
import { CityWeather, Hour } from "../citiesSlice";
import { RootState } from "..";
import {
  fetchTodayWeatherForecast,
  fetchWeatherByCityId,
  fetchWeatherByCityName,
} from "../../utils/weatherApi";
import { getInitialCities } from "../../utils/cities";

type CityForecastResult = {
  id: number;
  forecast: {
    hourly: Hour[];
  };
};

export const loadCities = createAsyncThunk<CityWeather[]>(
  "cities/loadCities",
  async () => {
    const saved = getInitialCities();
    return saved ?? [];
  }
);

export const addCity = createAsyncThunk<CityWeather["data"], string>(
  "cities/addCity",
  async (cityName, { rejectWithValue }) => {
    try {
      const { id, name, sys, weather, main, coord } =
        await fetchWeatherByCityName(cityName);

      return {
        id,
        name,
        coord,
        country: sys.country,
        weather: weather[0].description,
        icon: weather[0].icon,
        temp: main.temp,
        feelsLike: main.feels_like,
        humidity: main.humidity,
        tempMax: main.temp_max,
        tempMin: main.temp_min,
      };
    } catch (e: unknown) {
      return rejectWithValue((e as Error).message || "City not found");
    }
  }
);

export const refreshCity = createAsyncThunk<
  Pick<
    CityWeather["data"],
    | "weather"
    | "icon"
    | "temp"
    | "id"
    | "feelsLike"
    | "humidity"
    | "tempMax"
    | "tempMin"
  >,
  number,
  { rejectValue: { id: number; err: string } }
>("cities/refreshCity", async (cityId, { rejectWithValue }) => {
  try {
    const { id, weather, main } = await fetchWeatherByCityId(cityId);

    return {
      id,
      weather: weather[0].description,
      icon: weather[0].icon,
      temp: main.temp,
      feelsLike: main.feels_like,
      humidity: main.humidity,
      tempMax: main.temp_max,
      tempMin: main.temp_min,
    };
  } catch (e) {
    return rejectWithValue({
      id: cityId,
      err: (e as Error).message || "City not updated",
    });
  }
});

export const getTodayForecast = createAsyncThunk<
  CityForecastResult,
  number,
  { state: RootState; rejectValue: { id: number; err: string } }
>("cities/getTodayForecast", async (cityId, { rejectWithValue, getState }) => {
  try {
    const city = getState().cities.items.find(
      (city) => city.data.id === cityId
    );

    if (!city) throw new Error("City not found in state");

    const data = await fetchTodayWeatherForecast(city.data.coord);

    return {
      id: city.data.id,
      forecast: { hourly: data.slice(0, 24) },
    };
  } catch (e) {
    return rejectWithValue({
      id: cityId,
      err: (e as Error).message || "City not updated",
    });
  }
});
