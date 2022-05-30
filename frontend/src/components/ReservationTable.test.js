import ReservationTable from "./ReservationTable";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithRouter } from "../setupTests";

const rows = [
  {
    id: 2,
    mobileNo: "6051526121",
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
    expect(screen.queryAllByText(item.id)).not.toEqual(null);
    expect(screen.queryAllByText(item.mobileNo)).not.toEqual(null);
    expect(screen.queryAllByText(item.noOfPeople)).not.toEqual(null);
    expect(screen.queryAllByText(item.timeOfReservation)).not.toEqual(null);
    expect(screen.queryAllByText(item.username)).not.toEqual(null);
  });
});

test("delete button deletes reservations", () => {
  renderWithRouter(<ReservationTable rows={rows} setReservations={jest.fn} />);
});
