import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import HomePage from ".";
import { addCity } from "../../store/thunk/citiesThunk";
import userEvent from "@testing-library/user-event";

const mockNavigate = jest.fn();
const mockAdd = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../hooks/useCities", () => ({
  useCities: () => ({
    add: mockAdd,
    loading: false,
  }),
}));

describe("Home Page test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render page", () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/add city/i)).toBeInTheDocument();
  });

  it("should call add and navigate function", () => {
    mockAdd.mockResolvedValueOnce(
      addCity.fulfilled(
        {
          id: 123,
          name: "TestCity",
          country: "",
          weather: "",
          icon: "",
          temp: 0,
          feelsLike: 0,
          humidity: 0,
          tempMax: 0,
          tempMin: 0,
          coord: {
            lat: 0,
            lon: 0,
          },
        },
        "",
        ""
      )
    );

    renderWithProviders(<HomePage />);
    const input = screen.getByLabelText(/add city/i);
    const button = screen.getByRole("button", { name: /add/i });

    userEvent.type(input, "Kyiv");
    userEvent.click(button);

    waitFor(() => {
      expect(mockAdd).toHaveBeenCalledWith("Kyiv");
      expect(mockNavigate).toHaveBeenCalledWith("/city/123");
    });
  });

  it("should no callt navigate", () => {
    mockAdd.mockResolvedValueOnce({ type: "rejected" });

    renderWithProviders(<HomePage />);
    const input = screen.getByLabelText(/add city/i);
    const button = screen.getByRole("button", { name: /add/i });

    userEvent.type(input, "Lviv");
    userEvent.click(button);

    waitFor(() => {
      expect(mockAdd).toHaveBeenCalledWith("Lviv");
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
