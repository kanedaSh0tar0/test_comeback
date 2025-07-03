import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleTheme } from "../store/uiSlice";

export function useChangeTheme() {
  const themeMode = useAppSelector((state) => state.ui.themeMode);
  const dispatch = useAppDispatch();

  const toggle = () => dispatch(toggleTheme());

  return {
    themeMode,
    toggle
  };
}
