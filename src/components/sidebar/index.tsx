import React from "react";
import { Drawer, Box, useMediaQuery, useTheme } from "@mui/material";

const drawerWidth = 300;

interface SidebarProps {
  isOpen: boolean;
  onCLose: () => void;
  children: React.ReactNode;
}

function Sidebar({ isOpen, onCLose, children }: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    return (
      <Drawer
        component="aside"
        anchor="right"
        open={isOpen}
        onClose={onCLose}
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
