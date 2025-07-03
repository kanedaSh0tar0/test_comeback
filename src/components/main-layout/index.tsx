import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "../sidebar";
import CityList from "../city-list";
import Navbar from "../navbar";
import { useCities } from "../../hooks/useCities";

function MainLayout() {
  const { initialLoad } = useCities();

  useEffect(() => {
    initialLoad();
  }, []);

  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar>
        <CityList />
      </Sidebar>

      <Box component="main" position="relative" flex={1}>
        <Navbar />
        <Box mt={{ xs: 7, sm: 8 }} p={2}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;
