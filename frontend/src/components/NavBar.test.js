import NavBar from "./NavBar";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../setupTests";

test("Navbar shows Book and Reservations", () => {
  renderWithRouter(<NavBar />);
  expect(screen.getByText(/Frying nemo/i)).toBeInTheDocument();
  expect(screen.getByText(/Book/i)).toBeInTheDocument();
  expect(screen.getByText(/Reservations/i)).toBeInTheDocument();
});
