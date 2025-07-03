import { Container, Typography, Box, Paper } from "@mui/material";
import { useCities } from "../../hooks/useCities";
import AddCity from "../../components/add-city";
import { useNavigate } from "react-router-dom";
import { addCity } from "../../store/thunk/citiesThunk";

function HomePage() {
  const { add, loading } = useCities();
  const navigate = useNavigate();

  const handleAdd = async (name: string) => {
    const result = await add(name);
    console.log(result, "result");

    if (addCity.fulfilled.match(result)) {
      navigate(`/city/${result.payload.id}`);
    }
  };

  return (
    <Container maxWidth="md" sx={{ pt: 6 }}>
      <Paper
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 3,
          bgcolor: "background.paper",
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          ☀️ Welcome!
        </Typography>

        <Box mt={4}>
          <AddCity onAdd={handleAdd} loading={loading} />
        </Box>
      </Paper>
    </Container>
  );
}

export default HomePage;
