import { LineChart } from "@mui/x-charts";
import { useMemo } from "react";
import { CityWeather } from "../../store/citiesSlice";
import {
  Box,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";

function HourlyChart({ data }: { data: CityWeather["forecast"] }) {
  const { hourly, loading } = data;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const chartData = useMemo(() => {
    if (!hourly?.length) return null;

    const sliced = isMobile ? hourly.slice(0, 12) : hourly.slice(0, 24);

    return {
      xLabels: sliced.map((h) =>
        new Date(h.dt * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      ),
      yValues: sliced.map((h) => h.temp),
    };
  }, [hourly, isMobile]);

  const isChartReady = !!chartData;

  return (
    <Box
      sx={{
        p: isMobile ? 2 : 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
        minHeight: 340,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Hourly Temperature
      </Typography>

      {loading && !isChartReady ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={250}
        >
          <CircularProgress />
        </Box>
      ) : isChartReady ? (
        <LineChart
          xAxis={[{ scaleType: "point", data: chartData.xLabels }]}
          series={[
            {
              data: chartData.yValues,
              label: "Temp (°C)",
              showMark: true,
            },
          ]}
          height={300}
          grid={{ vertical: true, horizontal: true }}
        />
      ) : (
        <Typography variant="body2" color="text.secondary">
          No forecast data available.
        </Typography>
      )}
    </Box>
  );
}

export default HourlyChart;
