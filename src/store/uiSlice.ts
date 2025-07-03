import { createSlice } from "@reduxjs/toolkit";
import { getInitialTheme, setTheme } from "../utils/theme";

export type Theme = "light" | "dark";

export interface UIState {
  sidebarOpen: boolean;
  themeMode: Theme;
}

const initialState: UIState = {
  sidebarOpen: false,
  themeMode: getInitialTheme(),
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openSidebar: (state) => {
      state.sidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    toggleTheme: (state) => {
      const newTheme = state.themeMode === "light" ? "dark" : "light";
      state.themeMode = newTheme;
      setTheme(newTheme);
    },
  },
});

export const { toggleSidebar, openSidebar, closeSidebar, toggleTheme } =
  uiSlice.actions;

export default uiSlice.reducer;
