import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import ReservationForm from "../components/ReservationForm";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import { deepOrange } from "@mui/material/colors";



const ReservePage = () => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2019/02/21/19/00/restaurant-4011989_960_720.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: deepOrange[500] }}>
            <DinnerDiningIcon />
          </Avatar>
          <Typography component="h5" variant="h5" sx={{marginBottom: "2rem"}}>
            Reserve a table
          </Typography>
          <ReservationForm />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ReservePage;
