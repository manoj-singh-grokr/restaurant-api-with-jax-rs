import { act, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRouter } from "../setupTests";
import CheckingForm from "./CheckingForm";

jest.mock("axios");

test("Checking Reservations Form should be displayed", () => {
  renderWithRouter(<CheckingForm open={true} handleClose={jest.fn()} />);
  expect(screen.getByLabelText("Username")).toBeInTheDocument();
  expect(screen.getByLabelText("Time of Reservation")).toBeInTheDocument();
  expect(
    screen.getByText(
      "Note: To see all the reservations, keep the date field empty!"
    )
  ).toBeInTheDocument();
  expect(screen.getByRole("find_button")).toBeInTheDocument();
});

test("redirected to /reservations when clicking find button", async () => {
  renderWithRouter(<CheckingForm open={true} handleClose={jest.fn()} />);
  await act(async () => {
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
  });
  fireEvent.click(screen.getByRole("find_button"));
  screen.debug();
  // expect(screen.getByText("Res Page")).toBeInTheDocument();
});
