import React, { useState } from "react";
import { Drawer, Box, useMediaQuery, useTheme } from "@mui/material";

const drawerWidth = 280;

function Sidebar({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  if (isMobile) {
    return (
      <Drawer
        component="aside"
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        <Box sx={{ width: drawerWidth, p: 2 }}>{children}</Box>
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
