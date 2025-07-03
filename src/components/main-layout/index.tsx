import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "../sidebar";
import CityList from "../city-list";
import Navbar from "../navbar/indes";
import { useSidebar } from "../../hooks/useSidebar";

function MainLayout() {
  const { isOpen, open, close } = useSidebar();

  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar isOpen={isOpen} onCLose={close}>
        <CityList />
      </Sidebar>

      <Box component="main" position="relative" flex={1}>
        <Navbar onMenuClick={open} />
        <Box mt={{ xs: 7, sm: 8 }} p={2}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;
