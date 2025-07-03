import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeSidebar, openSidebar, toggleSidebar } from "../store/uiSlice";

export function useSidebar() {
  const isOpen = useAppSelector((state) => state.ui.sidebarOpen);
  const dispatch = useAppDispatch();

  const open = () => dispatch(openSidebar());
  const close = () => dispatch(closeSidebar());
  const toggle = () => dispatch(toggleSidebar());

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
