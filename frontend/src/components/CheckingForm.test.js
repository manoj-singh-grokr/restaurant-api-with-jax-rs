import { screen } from "@testing-library/react";
import { renderWithRouter } from "../setupTests";
import CheckingForm from "./CheckingForm";

jest.mock("axios");

test("Checking Reservations Form should be displayed", () => {
  renderWithRouter(<CheckingForm handleSubmit={jest.fn} error="" />);
  // expect(screen.getByLabelText("User Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Time of Reservation")).toBeInTheDocument();

  expect(screen.getByRole("find_button")).toBeInTheDocument();
});
