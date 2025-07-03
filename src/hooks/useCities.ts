import { RootState, AppDispatch } from "../store";
import {
  removeCity,
  loadCities,
  clearError,
  CityWeather,
} from "../store/citiesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import {
  addCity,
  getTodayForecast,
  refreshCity,
} from "../store/thunk/citiesThunk";

export function useCities() {
  const dispatch = useAppDispatch<AppDispatch>();
  const {
    items: cities,
    loading,
    error,
  } = useAppSelector((state: RootState) => state.cities);

  useEffect(() => {
    dispatch(loadCities());
  }, [dispatch]);

  const add = (city: CityWeather["data"]["name"]) => dispatch(addCity(city));
  const remove = (id: CityWeather["data"]["id"]) => dispatch(removeCity(id));
  const clearErr = () => dispatch(clearError());
  const refresh = async (cityId: CityWeather["data"]["id"]) =>
    dispatch(refreshCity(cityId));
  const getForecast = (id: CityWeather["data"]["id"]) =>
    dispatch(getTodayForecast(id));

  return {
    cities,
    loading,
    error,
    add,
    remove,
    clearErr,
    refresh,
    getForecast,
  };
}
