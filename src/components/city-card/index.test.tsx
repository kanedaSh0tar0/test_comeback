import { screen } from "@testing-library/react";
import CityCard from ".";
import { mockCity } from "../../__mocks__/mockCity";
import { renderWithProviders } from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";

const mockClose = jest.fn();
const mockNavigate = jest.fn();
const mockLocation = jest.fn();
const mockRefresh = jest.fn();
const mockRemove = jest.fn();

jest.mock("../../hooks/useCities", () => ({
  useCities: () => ({
    remove: mockRemove,
    refresh: mockRefresh,
    loading: false,
  }),
}));

jest.mock("../../hooks/useSidebar", () => ({
  useSidebar: () => ({
    close: mockClose,
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () =>
    mockLocation.mockReturnValue({ pathname: `/city/${mockCity.data.id}` })(),
}));

describe("CityCard test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should renders city name and weather", () => {
    renderWithProviders(<CityCard city={mockCity} />);

    expect(screen.getByText(/Kyiv/i)).toBeInTheDocument();
    expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
    expect(screen.getByText(/25°C/)).toBeInTheDocument();
  });

  it("should not navigate or close when refreshing", () => {
    const refreshingCity = { ...mockCity, refreshing: true };
    renderWithProviders(<CityCard city={refreshingCity} />);

    userEvent.click(screen.getByText(/Kyiv/i));

    expect(mockClose).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("should navigates and closes when not refreshing", () => {
    renderWithProviders(<CityCard city={mockCity} />);

    userEvent.click(screen.getByText(/Kyiv/i));

    expect(mockClose).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(`/city/${mockCity.data.id}`);
  });

  it("should call refresh", () => {
    renderWithProviders(<CityCard city={mockCity} />);

    const refreshButton = screen.getByTestId("RefreshIcon");
    userEvent.click(refreshButton);

    expect(mockRefresh).toHaveBeenCalledWith(mockCity.data.id);
  });

  it("should call remove and move to home page", () => {
    renderWithProviders(<CityCard city={mockCity} />);

    const removeButton = screen.getByTestId("DeleteIcon");
    userEvent.click(removeButton);

    expect(mockRemove).toHaveBeenCalledWith(mockCity.data.id);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should call remove and do not move to home page", () => {
    mockLocation.mockImplementationOnce(() => ({
      pathname: `/city/${mockCity.data.id + 1}`,
    }));
    renderWithProviders(<CityCard city={mockCity} />);

    const removeButton = screen.getByTestId("DeleteIcon");
    userEvent.click(removeButton);

    expect(mockRemove).toHaveBeenCalledWith(mockCity.data.id);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
