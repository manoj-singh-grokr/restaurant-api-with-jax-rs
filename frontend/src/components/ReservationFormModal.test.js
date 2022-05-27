import { act, fireEvent, screen } from "@testing-library/react";
import { renderWithRouter } from "../setupTests";
import userEvent from "@testing-library/user-event";

import axios from "axios";
import ReservationFormModal from "./ReservationFormModal";
import { u } from "tar";

jest.mock("axios");

const formFields = [
  /user name/i,
  /Mobile No/i,
  /No Of People/i,
  /Time of Reservation/i,
];

describe("Reservation", () => {
  const username = "Test2";
  const mobileNo = "1234567890";
  const noOfPeople = 2;
  let timeOfReservation = new Date(Date.now());
  timeOfReservation = new Date(
    timeOfReservation.getTime() - timeOfReservation.getTimezoneOffset() * 60000
  )
    .toISOString()
    .substring(0, 19);
  test("form should be displayed", () => {
    renderWithRouter(
      <ReservationFormModal open={true} handleClose={jest.fn} />
    );
    formFields.forEach((item) =>
      expect(screen.getByLabelText(item)).toBeInTheDocument()
    );
    expect(screen.getByRole("reserveButton")).toBeInTheDocument();
  });
  describe("reservation function", () => {
    describe("with success", () => {
      const data = { status: 200 };

      it("should return response data", async () => {
        axios.post.mockImplementationOnce(() => Promise.resolve(data));
        const response = await axios.post(
          "http://localhost:8080/restaurant_api/api/reservations/add",
          { username, mobileNo, noOfPeople, timeOfReservation }
        );
        expect(response).toStrictEqual(data);
      });
    });

    /*TODO */
    
    // describe("with failure", () => {
    //   it("should return error", async () => {
    //     const errorMessage = "Booking is allowed only for the current day!";
    //     axios.post.mockImplementationOnce(() =>
    //       Promise.reject(new Error(errorMessage))
    //     );
    //     renderWithRouter(
    //       <ReservationFormModal open={true} handleClose={jest.fn} />
    //     );

    //     const response = axios.post(
    //       "http://localhost:8080/restaurant_api/api/reservations/add",
    //       {
    //         username,
    //         mobileNo,
    //         noOfPeople,
    //         timeOfReservation: "2022-05-09T10:32",
    //       }
    //     );
    //     await expect(response).rejects.toThrow(errorMessage);

    //     await act(async () => {
    //       fireEvent.change(screen.getByLabelText(/user name/i), {
    //         target: { value: username },
    //       });
    //       fireEvent.change(screen.getByLabelText(/Mobile No/i), {
    //         target: { value: mobileNo },
    //       });
    //       fireEvent.change(screen.getByLabelText(/Time Of Reservation/i), {
    //         target: { value: "2022-05-09T10:32" },
    //       });

    //       fireEvent.change(
    //         screen.getByTestId("noOfPeople").querySelector("input"),
    //         { target: { value: "2" } }
    //       );

    //       // userEvent.selectOptions(noOfPeople, [screen.getByText("2")]);

    //       userEvent.click(screen.getByRole("reserveButton"));
    //       screen.debug(undefined, 3000000);
    //     });

    //     expect(screen.getByText(errorMessage)).toBeInTheDocument();
    //   });
    // });
  });
});
