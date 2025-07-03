import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { useChangeTheme } from "../hooks/useChangeTheme";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function AppTheme({ children }: { children: React.ReactNode }) {
  const { themeMode } = useChangeTheme();

  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
}

export default AppTheme;
