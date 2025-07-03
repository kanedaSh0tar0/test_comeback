import { createAsyncThunk } from "@reduxjs/toolkit";
import { CityWeather } from "../citiesSlice";
import { RootState } from "..";
import {
  fetchWeatherByCityId,
  fetchWeatherByCityName,
} from "../../utils/weatherApi";

export const addCity = createAsyncThunk<
  CityWeather["data"],
  string,
  { state: RootState }
>("cities/addCity", async (cityName, { rejectWithValue }) => {
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
    };
  } catch (e: unknown) {
    return rejectWithValue((e as Error).message || "City not found");
  }
});

export const refreshCity = createAsyncThunk<
  Pick<CityWeather["data"], "weather" | "icon" | "temp" | "id">,
  number,
  { state: RootState; rejectValue: { id: number; err: string } }
>("cities/refreshCity", async (cityId, { rejectWithValue }) => {
  try {
    const { id, weather, main } = await fetchWeatherByCityId(cityId);

    return {
      id,
      weather: weather[0].description,
      icon: weather[0].icon,
      temp: main.temp,
    };
  } catch (e) {
    return rejectWithValue({
      id: cityId,
      err: (e as Error).message || "City not updated",
    });
  }
});
