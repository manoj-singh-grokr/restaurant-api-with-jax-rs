import { screen } from "@testing-library/react";
import { renderWithRouter } from "../setupTests";
import ReservationsPage from "./ReservationsPage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: { userInfo: { username: "mxn0j__smh" } },
  }),
}));

jest.mock("axios");

test("Reservations page should be displayed", () => {
  renderWithRouter(<ReservationsPage />);
  expect(screen.getByText("Reservations")).toBeInTheDocument();
  screen.debug();
});
