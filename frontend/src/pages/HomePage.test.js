import { screen } from "@testing-library/react";
import { renderWithRouter } from "../setupTests";
import HomePage from "./HomePage";

const homePageTexts = [
  /WELCOME TO/i,
  "FRYING NEMO",
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
