import { CityWeather } from "../store/citiesSlice";
import { LOCAL_STORAGE_CITIES_KEY } from "./variables";

export function getInitialCities(): CityWeather[] {
  const saved = localStorage.getItem(LOCAL_STORAGE_CITIES_KEY);

  if (saved) {
    return JSON.parse(saved);
  }

  return [];
}

export function setCities(cities: CityWeather[]) {
  const stringified = JSON.stringify(cities);
  localStorage.setItem(LOCAL_STORAGE_CITIES_KEY, stringified);
}
