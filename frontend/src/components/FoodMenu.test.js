import FoodMenu, { menu } from "./FoodMenu";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../setupTests";

test("Food menu is shown", () => {
  renderWithRouter(<FoodMenu />);
  menu.forEach((item) => {
    expect(screen.getByText(item.content)).toBeInTheDocument();
  });
});
