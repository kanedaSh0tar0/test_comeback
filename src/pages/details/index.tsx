import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useEffect } from "react";
import HourlyChart from "../../components/chart";
import { useCities } from "../../hooks/useCities";

const CityDetailsPage = () => {
  const { cityId } = useParams();
  const { getForecast, cities } = useCities();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const city = cities.find((city) => String(city.data.id) === cityId);

  useEffect(() => {
    if (!cityId) return;

    getForecast(Number(cityId));
  }, [cityId]);

  if (!city) {
    return <Typography>City not found</Typography>;
  }

  const {
    data: {
      name,
      temp,
      country,
      weather,
      icon,
      feelsLike,
      humidity,
      tempMax,
      tempMin,
    },
    forecast,
    refreshing,
  } = city;

  if (refreshing) {
    return (
      <Box
        display="flex"
        width="100%"
        height="50vh"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <Container maxWidth="md" sx={{ pt: 4, px: isMobile ? 2 : 4 }}>
      <Stack spacing={3}>
        <Box textAlign="center">
          <Typography variant={isMobile ? "h5" : "h4"}>
            {name}, {country}
          </Typography>

          <Box
            mt={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <img src={iconUrl} alt={weather} width={60} height={60} />
            <Typography variant={isMobile ? "h6" : "h5"}>{temp}°C</Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
            {weather}
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="space-around"
          flexWrap="wrap"
          textAlign="center"
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 2,
            boxShadow: 1,
          }}
        >
          <Box>
            <Typography color="text.secondary" variant="body2">
              Feels like
            </Typography>
            <Typography fontWeight={600}>{feelsLike}°C</Typography>
          </Box>
          <Box>
            <Typography color="text.secondary" variant="body2">
              Min
            </Typography>
            <Typography fontWeight={600}>{tempMin}°C</Typography>
          </Box>
          <Box>
            <Typography color="text.secondary" variant="body2">
              Max
            </Typography>
            <Typography fontWeight={600}>{tempMax}°C</Typography>
          </Box>
          <Box>
            <Typography color="text.secondary" variant="body2">
              Humidity
            </Typography>
            <Typography fontWeight={600}>{humidity}%</Typography>
          </Box>
        </Box>

        <HourlyChart data={forecast} />
      </Stack>
    </Container>
  );
};

export default CityDetailsPage;
