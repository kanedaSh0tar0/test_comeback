import CityList from ".";
import { mockCity } from "../../__mocks__/mockCity";
import { renderWithProviders } from "../../utils/test-utils";
import { screen } from "@testing-library/react";

const mockUseCities = jest.fn();
const mockUseCitiesData = {
  cities: [
    mockCity,
    { ...mockCity, data: { ...mockCity.data, id: 2, name: "Lviv" } },
  ],
  loading: false,
  error: "",
  add: jest.fn(),
  clearErr: jest.fn(),
};

jest.mock("../../hooks/useCities", () => ({
  useCities: () => mockUseCities.mockReturnValue(mockUseCitiesData)(),
}));

describe("CityList test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render AddCity and city cards", () => {
    renderWithProviders(<CityList />);

    expect(screen.getByLabelText(/add city/i)).toBeInTheDocument();
    expect(screen.getByText(/Kyiv/i)).toBeInTheDocument();
    expect(screen.getByText(/Lviv/i)).toBeInTheDocument();
  });

  it("should render error alert when error exists", () => {
    mockUseCities.mockImplementationOnce(() => ({
      ...mockUseCitiesData,
      error: "Failed to load cities",
    }));
    renderWithProviders(<CityList />);

    expect(screen.getByText(/failed to load cities/i)).toBeInTheDocument();
  });
});
