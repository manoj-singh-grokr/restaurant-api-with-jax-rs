import { styled } from "@mui/material/styles";
import { ButtonBase, Grid } from "@mui/material";
import React from "react";
import FoodMenu from "../components/FoodMenu";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  height: 50,
  width: 150,
  fontSize: "1.5rem",
}));

const HomePage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} height={500} marginTop={"2rem"} className="main-image">
        <h1 className="centered">
          <div>WELCOME TO</div> <div>FRYING NEMO</div>
        </h1>
        <Link to="/book" className="book-button">
          <ImageButton role="booking_button">Book Now</ImageButton>
        </Link>
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
