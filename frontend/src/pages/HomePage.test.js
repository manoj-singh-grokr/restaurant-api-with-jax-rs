import { act, fireEvent, screen } from "@testing-library/react";
import { renderWithRouter } from "../setupTests";
import HomePage from "./HomePage";

const homePageTexts = [
  /WELCOME TO/i,
  /CHECK OUT THE MENU/i,
  "©FRYING NEMO",
  /grilled venison/i,
];
test("HomePage should be displayed", () => {
  renderWithRouter(<HomePage />);
  homePageTexts.forEach((item) =>
    expect(screen.getByText(item)).toBeInTheDocument()
  );
  expect(screen.getByRole("booking_button")).toBeInTheDocument();
});

test("Book Now button opens up reservation dialog", async () => {
  renderWithRouter(<HomePage />);
  await act(async () => {
    fireEvent.click(screen.getByRole("booking_button"));
  });
  expect(screen.getByText(/Make a reservation/i)).toBeInTheDocument();
});
