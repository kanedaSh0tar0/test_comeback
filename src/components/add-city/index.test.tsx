import userEvent from "@testing-library/user-event";
import AddCity from ".";
import { renderWithProviders } from "../../utils/test-utils";
import { screen } from "@testing-library/react";

const mockOnAdd = jest.fn();

describe("AddCity test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render input and button", () => {
    renderWithProviders(<AddCity onAdd={mockOnAdd} loading={false} />);
    expect(screen.getByLabelText(/add city/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("should disable input and button when loading", () => {
    renderWithProviders(<AddCity onAdd={mockOnAdd} loading={true} />);
    expect(screen.getByLabelText(/add city/i)).toBeDisabled();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should disable button when no text", () => {
    renderWithProviders(<AddCity onAdd={mockOnAdd} loading={false} />);

    const input = screen.getByLabelText(/add city/i);
    const button = screen.getByRole("button", { name: /add/i });

    userEvent.type(input, " ");

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should submit trimmed city name and clears input", () => {
    renderWithProviders(<AddCity onAdd={mockOnAdd} loading={false} />);

    const input = screen.getByLabelText(/add city/i);
    const button = screen.getByRole("button", { name: /add/i });

    userEvent.type(input, "   Kyiv   ");
    userEvent.click(button);

    expect(mockOnAdd).toHaveBeenCalledWith("Kyiv");
    expect(input).toHaveValue("");
  });

  it("should submit by pressing Enter", () => {
    renderWithProviders(<AddCity onAdd={mockOnAdd} loading={false} />);

    const input = screen.getByLabelText(/add city/i);
    userEvent.type(input, "Lviv{enter}");

    expect(mockOnAdd).toHaveBeenCalledWith("Lviv");
  });
});
