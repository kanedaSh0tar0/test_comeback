import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/main-layout";
import HomePage from "./pages/home";
import CityDetailsPage from "./pages/details";
import { CssBaseline } from "@mui/material";
import AppTheme from "./theme";

function App() {
  return (
    <AppTheme>
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="city/:cityId" element={<CityDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppTheme>
  );
}

export default App;
