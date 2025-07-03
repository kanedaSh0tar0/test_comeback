import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { setupStore } from "./utils/test-utils";

test("should render App", () => {
  const store = setupStore();

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
});
