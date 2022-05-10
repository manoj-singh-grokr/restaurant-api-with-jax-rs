import React, { useEffect, useState } from "react";
import ReservationTable from "../components/ReservationTable";
import axios from "axios";
import { Container } from "@mui/material";
import CheckingForm from "../components/CheckingForm";
import { useNavigate } from "react-router-dom";

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [userInfo, setUserInfo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getReservations = async (userInfo) => {
      const result = await axios.get("/restaurant_api/api/reservations");
      const data = await result.data;
      console.log(userInfo);

      let userReservations = data.filter(
        (item) => item.username === userInfo.username
      );

      if (userReservations.length === 0) {
        setUserInfo("");
        setError("User not found!");
        setTimeout(() => {
          setError("");
        }, 4000);
      }

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

    console.log("I was called");
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      timeOfReservation: e.target.timeOfReservation.value,
    };
    setUserInfo(data);
  };

  return userInfo ? (
    <Container maxWidth="md">
      <h2 className="heading">Reservations</h2>
      <ReservationTable rows={reservations} setReservations={setReservations} />
    </Container>
  ) : (
    <CheckingForm handleSubmit={handleSubmit} error={error} />
  );
};

export default ReservationsPage;
