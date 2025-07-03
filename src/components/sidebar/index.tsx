import React from "react";
import { Drawer, Box, useMediaQuery, useTheme } from "@mui/material";
import { useSidebar } from "../../hooks/useSidebar";

const drawerWidth = 300;

function Sidebar({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const { isOpen, close } = useSidebar();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    return (
      <Drawer
        component="aside"
        anchor="right"
        open={isOpen}
        onClose={close}
        ModalProps={{ keepMounted: true }}
      >
        <Box sx={{ width: drawerWidth }}>{children}</Box>
      </Drawer>
    );
  }

  return (
    <Drawer
      component="aside"
      variant="permanent"
      open
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          overflowY: "auto",
        },
      }}
    >
      <Box sx={{ width: "100%" }}>{children}</Box>
    </Drawer>
  );
}
export default Sidebar;
