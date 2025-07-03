import { Theme } from "../store/uiSlice";
import { LOCAL_STORAGE_THEME_KEY } from "./variables";

export function getInitialTheme(): Theme {
  const saved = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
  return saved as Theme;
}

export function setTheme(theme: Theme) {
  localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
}
