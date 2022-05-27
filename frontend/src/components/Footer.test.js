import { screen } from "@testing-library/react";
import { renderWithRouter } from "../setupTests";
import Footer from "./Footer";

test("footer is shown", () => {
  renderWithRouter(<Footer />);
  expect(screen.getByText(/©FRYING NEMO/i));
});
