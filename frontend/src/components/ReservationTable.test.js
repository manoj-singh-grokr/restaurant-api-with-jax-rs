import ReservationTable from "./ReservationTable";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../setupTests";

const rows = [
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
  {
    id: 5,
    mobileNo: "9423547896",
    noOfPeople: 2,
    timeOfReservation: "2022-05-11T17:23:00",
    username: "mxn0j__smh",
  },
];

test("Show reservation table", () => {
  renderWithRouter(<ReservationTable rows={rows} setReservations={jest.fn} />);
  rows.forEach((item) => {
    expect(screen.getByText(item.id)).toBeInTheDocument();
  });
  screen.debug(undefined, 300000);
});
