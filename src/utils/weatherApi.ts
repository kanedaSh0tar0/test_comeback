const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const DAY_FORECAST = "https://api.openweathermap.org/data/3.0/onecall";

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

export async function fetchWeatherByCityName(cityName: string, lang = "en") {
  const res = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(
      cityName
    )}&appid=${API_KEY}&units=metric&lang=${lang}`
  );

  if (!res.ok) throw new Error("City not found");

  return await res.json();
}

export async function fetchWeatherByCityId(cityId: number, lang = "en") {
  const res = await fetch(
    `${BASE_URL}?id=${cityId}&appid=${API_KEY}&units=metric&lang=${lang}`
  );

  if (!res.ok) throw new Error("City not found");

  return await res.json();
}

export async function fetchTodayWeatherForecast(coord: {
  lat: number;
  lon: number;
}) {
  const { lat, lon } = coord;

  const res = await fetch(`${DAY_FORECAST}
        ?lat=${lat}
        &lon=${lon}
        &exclude=current,minutely,daily,alerts
        &units=metric
        &appid={API_KEY}
    `);

  if (!res.ok) throw new Error("City not found");

  return await res.json();
}
