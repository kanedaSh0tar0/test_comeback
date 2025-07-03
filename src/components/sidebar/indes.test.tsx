import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import Sidebar from ".";

const mockClose = jest.fn();

jest.mock("../../hooks/useSidebar", () => ({
  useSidebar: () => ({
    isOpen: true,
    close: mockClose,
  }),
}));

const setMobile = (isMobile: boolean) => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: isMobile ? query.includes("max-width") : false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
};

describe("Sidebar test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render on desktop", () => {
    renderWithProviders(
      <Sidebar>
        <div>Test Content</div>
      </Sidebar>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should render on mobile", () => {
    setMobile(true);
    renderWithProviders(
      <Sidebar>
        <div>Test Content</div>
      </Sidebar>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
