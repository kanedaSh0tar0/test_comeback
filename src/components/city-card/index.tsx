import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { CityWeather } from "../../store/citiesSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useCities } from "../../hooks/useCities";
import { useLocation, useNavigate } from "react-router-dom";
import { useSidebar } from "../../hooks/useSidebar";

function CityCard({ city }: { city: CityWeather }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { remove, refresh } = useCities();
  const { close } = useSidebar();

  const {
    data: { id, country, weather, temp, name, icon },
    refreshing,
  } = city;

  const handleClick = () => {
    if (refreshing) return;
    close();
    navigate(`/city/${id}`);
  };

  const handleRefresh = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    refresh(id);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    remove(id);

    const currentPath = location.pathname;
    const isOnDetailsPage = currentPath === `/city/${id}`;

    if (isOnDetailsPage) {
      navigate("/");
    }
  };

  return (
    <Paper
      onClick={handleClick}
      sx={{
        borderRadius: 2,
        bgcolor: "background.primary",
        cursor: refreshing ? "default" : "pointer",
        transition: "0.2s",
        "&:hover": {
          boxShadow: 3,
          bgcolor: "action.hover",
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
        p={2}
      >
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={weather}
          width={32}
          height={32}
        />
        <Box
          display="flex"
          flexDirection="column"
          sx={{ flex: 1, minWidth: 0 }}
        >
          <Typography
            noWrap
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {`${country}, ${name}`}
          </Typography>

          {refreshing ? (
            <CircularProgress size={16} sx={{ mt: 0.5 }} />
          ) : (
            <Typography variant="body2" color="text.secondary">
              {weather}, {Math.round(temp)}°C
            </Typography>
          )}
        </Box>

        <Box display="flex" flexDirection="column" gap={1}>
          <IconButton onClick={handleRemove} disabled={refreshing} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={handleRefresh}
            disabled={refreshing}
            size="small"
          >
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}

export default CityCard;
