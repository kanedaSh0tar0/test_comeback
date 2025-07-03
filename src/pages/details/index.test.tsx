import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import CityDetailsPage from ".";
import { mockCity } from "../../__mocks__/mockCity";

const mockGetForecast = jest.fn();
const mockUseParams = jest.fn();
const mockUseCities = jest.fn();
const mockUseCitiesData = {
  cities: [mockCity],
  getForecast: mockGetForecast,
};

jest.mock("../../hooks/useCities", () => ({
  useCities: () => mockUseCities.mockReturnValue(mockUseCitiesData)(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () =>
    mockUseParams.mockReturnValue({ cityId: String(mockCity.data.id) })(),
}));

describe("Details Page test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render city data", () => {
    renderWithProviders(<CityDetailsPage />);

    expect(screen.getByText(/Kyiv/i)).toBeInTheDocument();
    expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
    expect(screen.getByText(/25°C/)).toBeInTheDocument();
    expect(screen.getByText(/24°C/i)).toBeInTheDocument();
    expect(mockGetForecast).toHaveBeenCalledWith(mockCity.data.id);
  });

  it("should show loading indicator when refreshing", () => {
    const refreshingCity = { ...mockCity, refreshing: true };
    mockUseCities.mockImplementationOnce(() => ({
      ...mockUseCitiesData,
      cities: [refreshingCity],
    }));

    renderWithProviders(<CityDetailsPage />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should render not found message", () => {
    mockUseCities.mockImplementationOnce(() => ({
      ...mockUseCitiesData,
      cities: [],
    }));

    renderWithProviders(<CityDetailsPage />);

    expect(screen.getByText(/city not found/i)).toBeInTheDocument();
  });

  it("should call getForecast on render", () => {
    renderWithProviders(<CityDetailsPage />);

    expect(mockGetForecast).toHaveBeenCalledTimes(1);
  });

  it("should not call getForecast when no cityId", () => {
    mockUseParams.mockImplementationOnce(() => ({
      cityId: null,
    }));
    renderWithProviders(<CityDetailsPage />);

    expect(mockGetForecast).not.toHaveBeenCalled();
  });
});
