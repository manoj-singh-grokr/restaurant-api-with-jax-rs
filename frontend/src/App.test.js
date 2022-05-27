import { render, screen } from "@testing-library/react";
import App from "./App";

test("App is rendered", () => {
  render(<App />);
  expect(screen.getByText(/^frying nemo$/i)).toBeInTheDocument();
});
