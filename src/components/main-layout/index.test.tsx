import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import MainLayout from ".";

jest.mock("../navbar/index", () => () => <div data-testid="navbar" />);
jest.mock("../sidebar", () => ({ children }: any) => (
  <div data-testid="sidebar">{children}</div>
));
jest.mock("../city-list", () => () => <div data-testid="city-list" />);

describe("MainLayout test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render components", () => {
    renderWithProviders(<MainLayout />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("city-list")).toBeInTheDocument();
  });
});
