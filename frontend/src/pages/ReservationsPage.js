import React, { useEffect, useState } from "react";
import ReservationTable from "../components/ReservationTable";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Container } from "@mui/material";

const ReservationsPage = () => {
  
  const [reservations, setReservations] = useState([]);
  const { state } = useLocation();

  const userInfo = state ? state.userInfo : "";

  useEffect(() => {
    const getReservations = async (userInfo) => {
      const result = await axios.get("/restaurant_api/api/reservations");
      const data = await result.data;
      let userReservations = data.filter(
        (item) => item.username === userInfo.username
      );

      if (userInfo.timeOfReservation) {
        userReservations = userReservations.filter(
          (item) =>
            item.timeOfReservation.split("T")[0] === userInfo.timeOfReservation
        );
      }
      if (result.status === 200) {
        setReservations(userReservations);
      }
    };

    if (userInfo) {
      getReservations(userInfo);
    }
  }, []);

  return (
    <Container maxWidth="md">
      <h2 className="heading">Reservations</h2>
      <ReservationTable rows={reservations} setReservations={setReservations} />
    </Container>
  );
};

export default ReservationsPage;
