import { RootState, AppDispatch } from "../store";
import {
  removeCity,
  loadCities,
  clearError,
  CityWeather,
} from "../store/citiesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { fetchWeatherByCityId } from "../utils/weatherApi";
import { addCity, refreshCity } from "../store/thunk/citiesThunk";

export const useCities = () => {
  const dispatch = useAppDispatch<AppDispatch>();
  const {
    items: cities,
    loading,
    error,
  } = useAppSelector((state: RootState) => state.cities);

  useEffect(() => {
    dispatch(loadCities());
  }, [dispatch]);

  const add = (city: string) => dispatch(addCity(city));
  const remove = (id: number) => dispatch(removeCity(id));
  const clearErr = () => dispatch(clearError());
  const refresh = async (cityId: CityWeather["data"]["id"]) =>
    dispatch(refreshCity(cityId));

  const getForecast = (city: CityWeather) => {
    const coord = city.data.coord;

    try {
    } catch (e) {}
  };

  return {
    cities,
    loading,
    error,
    add,
    remove,
    clearErr,
    refresh,
  };
};
