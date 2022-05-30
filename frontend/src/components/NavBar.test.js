import NavBar from "./NavBar";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithRouter } from "../setupTests";

test("Navbar shows Book and Reservations", () => {
  renderWithRouter(<NavBar />);
  expect(screen.getByText(/Frying nemo/i)).toBeInTheDocument();
  expect(screen.getByTestId("ham-book")).toBeInTheDocument();
  expect(screen.getByTestId("ham-reservation")).toBeInTheDocument();
  expect(screen.getByTestId("desk-book")).toBeInTheDocument();
  expect(screen.getByTestId("desk-reservation")).toBeInTheDocument();
});

test("checking form pops up when clicking reservations", () => {
  renderWithRouter(<NavBar />);
  fireEvent.click(screen.getByTestId("desk-reservation"));
  expect(screen.getByLabelText("Username")).toBeInTheDocument();
});

test("reservation form pops up when clicking book", () => {
  renderWithRouter(<NavBar />);
  fireEvent.click(screen.getByTestId("desk-book"));
  expect(screen.getByText("Make a reservation")).toBeInTheDocument();
});
