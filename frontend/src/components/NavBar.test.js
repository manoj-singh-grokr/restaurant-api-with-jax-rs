import NavBar from "./NavBar";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../setupTests";

test("Navbar shows Book and Reservations", () => {
  renderWithRouter(<NavBar />);
  expect(screen.getByText(/Frying nemo/i)).toBeInTheDocument();
  expect(screen.getByTestId("ham-book")).toBeInTheDocument();
  expect(screen.getByTestId("ham-reservation")).toBeInTheDocument();
  expect(screen.getByTestId("desk-book")).toBeInTheDocument();
  expect(screen.getByTestId("desk-reservation")).toBeInTheDocument();
});
