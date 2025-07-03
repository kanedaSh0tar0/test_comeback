import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import Navbar from ".";
import userEvent from "@testing-library/user-event";

const mockNavigate = jest.fn();
const mockRefresh = jest.fn();
const mockToggleTheme = jest.fn();
const mockSidebarOpen = jest.fn();
const mockUseChangeTheme = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({ pathname: "/city/123" }),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../hooks/useCities", () => ({
  useCities: () => ({
    refresh: mockRefresh,
  }),
}));

jest.mock("../../hooks/useChangeTheme", () => ({
  useChangeTheme: () =>
    mockUseChangeTheme.mockReturnValue({
      themeMode: "light",
      toggle: mockToggleTheme,
    })(),
}));

jest.mock("../../hooks/useSidebar", () => ({
  useSidebar: () => ({ open: mockSidebarOpen }),
}));

describe("Navbar test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render back and refresh buttons on details page", () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByTestId("ArrowBackIcon")).toBeInTheDocument();
    expect(screen.getByTestId("RefreshIcon")).toBeInTheDocument();
  });

  it("should calls handleBack on back button click", () => {
    renderWithProviders(<Navbar />);
    userEvent.click(screen.getByTestId("ArrowBackIcon"));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("should call refresh on refresh button click", () => {
    renderWithProviders(<Navbar />);
    userEvent.click(screen.getByTestId("RefreshIcon"));

    expect(mockRefresh).toHaveBeenCalledWith(123);
  });

  it("should call toggle theme on theme button click", () => {
    renderWithProviders(<Navbar />);
    userEvent.click(screen.getByTestId("DarkModeIcon"));

    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it("should change theme button icon", () => {
    mockUseChangeTheme.mockImplementationOnce(() => ({
      themeMode: "dark",
    }));
    renderWithProviders(<Navbar />);

    expect(screen.getByTestId("LightModeIcon")).toBeInTheDocument();
  });

  it("should call open if passed and matches media", async () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query.includes("max-width"),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    renderWithProviders(<Navbar />);
    const menuButton = screen.getByTestId("MenuIcon");

    await userEvent.click(menuButton);
    expect(mockSidebarOpen).toHaveBeenCalledTimes(1);
  });
});
