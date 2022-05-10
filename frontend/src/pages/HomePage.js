import { styled } from "@mui/material/styles";
import { ButtonBase, Grid } from "@mui/material";
import React from "react";
import FoodMenu from "../components/FoodMenu";
import Footer from "../components/Footer";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  height: 50,
  width: 150,
  fontSize: "1.5rem",
  border: "2px solid aliceblue",
  [theme.breakpoints.down("md")]: {
    top: "80%",
  },
  [theme.breakpoints.up("md")]: {
    top: "90%",
  },
}));

const HomePage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} height={500} marginTop={"2rem"} className="main-image">
        <h1 className="centered">
          <div>WELCOME TO</div> <div>FRYING NEMO</div>
        </h1>
        <ImageButton className="book-button" role="booking_button">
          Book Now
        </ImageButton>
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
