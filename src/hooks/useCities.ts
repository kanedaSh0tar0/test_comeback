import { RootState, AppDispatch } from "../store";
import { removeCity, clearError, CityWeather } from "../store/citiesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addCity,
  getTodayForecast,
  loadCities,
  refreshCity,
} from "../store/thunk/citiesThunk";

export function useCities() {
  const dispatch = useAppDispatch<AppDispatch>();
  const {
    items: cities,
    loading,
    error,
  } = useAppSelector((state: RootState) => state.cities);

  const add = (city: CityWeather["data"]["name"]) => dispatch(addCity(city));
  const remove = (id: CityWeather["data"]["id"]) => dispatch(removeCity(id));
  const clearErr = () => dispatch(clearError());
  const refresh = async (cityId: CityWeather["data"]["id"]) =>
    dispatch(refreshCity(cityId));
  const getForecast = (id: CityWeather["data"]["id"]) =>
    dispatch(getTodayForecast(id));
  const initialLoad = async () => {
    dispatch(loadCities()).then((result) => {
      if (loadCities.fulfilled.match(result)) {
        const cities = result.payload;
        cities.forEach((city) => {
          dispatch(refreshCity(city.data.id));
        });
      }
    });
  };

  return {
    cities,
    loading,
    error,
    add,
    remove,
    clearErr,
    refresh,
    getForecast,
    initialLoad,
  };
}
