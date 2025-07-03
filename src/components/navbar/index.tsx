import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useCities } from "../../hooks/useCities";
import { useChangeTheme } from "../../hooks/useChangeTheme";
import { useSidebar } from "../../hooks/useSidebar";

const sidebarWidth = 300;

function Navbar() {
  const theme = useTheme();
  const { open } = useSidebar();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();
  const { refresh } = useCities();
  const { themeMode, toggle } = useChangeTheme();

  const isOnDetailsPage = /^\/city\/\d+$/.test(location.pathname);

  const handleBack = () => navigate(-1);
  const handleRefresh = () => refresh(Number(location.pathname.split("/")[2]));

  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        zIndex: 1000,
        width: { sm: isMdDown ? "100%" : `calc(100% - ${sidebarWidth}px)` },
        ml: { sm: isMdDown ? 0 : `${sidebarWidth}px` },
        display: "flex",
        height: { xs: 56, sm: 64 },
        justifyContent: "center",
        padding: 2,
        boxShadow: 0,
      }}
    >
      <Toolbar sx={{ width: "100%", justifyContent: "space-between" }}>
        {isOnDetailsPage && (
          <IconButton edge="start" color="inherit" onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
        )}

        <Box display="flex" gap={2} width="100%" justifyContent="flex-end">
          <IconButton onClick={toggle} size="small">
            {themeMode === "dark" ? (
              <LightModeIcon fontSize="small" />
            ) : (
              <DarkModeIcon fontSize="small" />
            )}
          </IconButton>

          {isOnDetailsPage && (
            <IconButton onClick={handleRefresh} size="small">
              <RefreshIcon fontSize="small" />
            </IconButton>
          )}

          {isMdDown && (
            <IconButton onClick={open}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
