import { act, screen } from "@testing-library/react";
import { renderWithRouter } from "../setupTests";
import ReservationsPage from "./ReservationsPage";
import axios from "axios";

jest.mock("axios");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/reservations",
    state: {
      userInfo: { username: "mxn0j__smh", timeOfReservation: "2022-05-10" },
    },
  }),
}));

test("Reservations page should be displayed", async () => {
  const data = {
    data: [
      {
        id: 2,
        mobileNo: "6051526120",
        noOfPeople: 4,
        timeOfReservation: "2022-05-10T19:10:00",
        username: "mxn0j__smh",
      },
      {
        id: 4,
        mobileNo: "6051526120",
        noOfPeople: 4,
        timeOfReservation: "2022-05-11T19:22:00",
        username: "mxn0j__smh",
      },
    ],

    status: 200,
  };

  await act(async () => {
    axios.get.mockResolvedValueOnce(data);
    renderWithRouter(<ReservationsPage />);
  });
  expect(screen.getByText("Reservations")).toBeInTheDocument();
  expect(screen.getAllByText("mxn0j__smh")).toHaveLength(1);
});
