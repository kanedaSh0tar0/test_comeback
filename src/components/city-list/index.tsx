import { Box, Alert } from "@mui/material";
import { useCities } from "../../hooks/useCities";
import AddCity from "../add-city";
import CityCard from "../city-card";

export default function CityList() {
  const { cities, loading, error, add, clearErr } = useCities();

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          width: "100%",
          px: 1,
          py: 2,
          top: 0,
          bgcolor: "background.paper",
          zIndex: 1,
        }}
      >
        <AddCity onAdd={add} loading={loading} />
        {error && (
          <Alert severity="error" onClose={clearErr} sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>

      <Box role="list" display="flex" flexDirection="column" gap={2} p={2}>
        {cities.map((city) => (
          <CityCard key={city.data.id} city={city} />
        ))}
      </Box>
    </>
  );
}
