import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { ButtonBase, Grid, Typography } from "@mui/material";
import FoodMenu from "../components/FoodMenu";
import Footer from "../components/Footer";
import ReservationFormModal from "../components/ReservationFormModal";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  height: 50,
  width: 150,
  fontSize: "1.5rem",
  border: "2px solid aliceblue",
  [theme.breakpoints.down("md")]: {
    top: "90%",
  },
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
    top: "50%",
  },
}));

const HomePage = () => {
  const [openReservationForm, setOpenReservationForm] = useState(false);
  const handleOpenReservationForm = () => setOpenReservationForm(true);
  const handleCloseReservationForm = () => setOpenReservationForm(false);

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        height={500}
        marginTop={"2rem"}
        marginLeft={"1rem"}
        className="main-image"
      >
        <WelcomeText className="centered">
          WELCOME TO
          <br />
          FRYING NEMO
        </WelcomeText>
        <ImageButton
          className="book-button"
          role="booking_button"
          onClick={handleOpenReservationForm}
        >
          Book Now
        </ImageButton>
        <ReservationFormModal
          open={openReservationForm}
          handleClose={handleCloseReservationForm}
        />
      </Grid>
      <Grid item xs={12} height={500} marginTop={"2rem"}>
        <h1 className="heading">CHECK OUT THE MENU</h1>
        <FoodMenu />
        <Footer />
      </Grid>
    </Grid>
  );
};

export default HomePage;
