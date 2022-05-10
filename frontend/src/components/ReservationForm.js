import React, { useState } from "react";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";

const ReservationForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, mobileNo, noOfPeople, timeOfReservation } = e.target;
    const values = {
      username: username.value,
      mobileNo: mobileNo.value,
      noOfPeople: noOfPeople.value,
      timeOfReservation: timeOfReservation.value,
    };
    try {
      const result = await axios({
        method: "POST",
        url: "/restaurant_api/api/reservations/add",
        data: values,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result.status === 200) {
        navigate("/reservations");
      }
    } catch (err) {
      setError(err.response.data);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

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
          <Typography component="h5" variant="h5">
            Reserve a table
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={(e) => handleSubmit(e)}
            sx={{ mt: 1 }}
          >
            <FormControl>
              <TextField
                type="text"
                label="username"
                variant="standard"
                name="username"
                sx={{ margin: "5px 0" }}
                required
              />
              <TextField
                type="text"
                label="Mobile No"
                variant="standard"
                name="mobileNo"
                sx={{ margin: "5px 0" }}
                required
              />
              <FormControl variant="standard">
                <InputLabel id="noOfPeople">No Of People</InputLabel>
                <Select
                  labelId="noOfPeople"
                  label="No of People"
                  name="noOfPeople"
                >
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
              </FormControl>
              <TextField
                type="datetime-local"
                label="Time of Reservation"
                variant="standard"
                name="timeOfReservation"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ margin: "2rem 0" }}
                required
              />
              {error && <p className="error">{error}</p>}
              <Button type="submit" role="reserveButton">
                Submit
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ReservationForm;
