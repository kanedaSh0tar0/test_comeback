import { AppBar } from "@mui/material";

const sidebarWidth = 280;

function Navbar() {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        zIndex: 1000,
        width: { sm: `calc(100% - ${sidebarWidth}px)` },
        ml: { sm: `${sidebarWidth}px` },
        display: "block",
        height: { xs: 56, sm: 64 },
        padding: 2,
        boxShadow: 0,
      }}
    >
      HEADER
    </AppBar>
  );
}

export default Navbar;
