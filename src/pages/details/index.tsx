import { useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { BarChart } from "@mui/x-charts";

const CityDetailsPage = () => {
  const { cityId } = useParams();

  const city = useAppSelector((state) =>
    state.cities.items.find((city) => String(city.data.id) === cityId)
  );

  if (!city) {
    return <Typography>City not found</Typography>;
  }

  const {
    data: { name, temp },
    refreshing,
  } = city;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Box>
        <Typography variant="h6">Current: {temp}°C</Typography>
      </Box>

      <Box
        sx={{
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Hourly Temperature
        </Typography>
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
            },
          ]}
          series={[{ data: [19, 22, 28, 30, 25, 20], label: "Temp (°C)" }]}
          width={600}
          height={300}
        />
      </Box>
    </Container>
  );
};

export default CityDetailsPage;
