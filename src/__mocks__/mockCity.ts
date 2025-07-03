import { CityWeather } from "../store/citiesSlice";

export const mockCity: CityWeather = {
  data: {
    id: 123,
    name: "Kyiv",
    country: "UA",
    weather: "clear sky",
    icon: "01d",
    temp: 25,
    feelsLike: 24,
    humidity: 60,
    tempMax: 28,
    tempMin: 21,
    coord: {
      lat: 50.45,
      lon: 30.52,
    },
  },
  refreshing: false,
  forecast: {
    hourly: [],
    loading: false,
  },
};
