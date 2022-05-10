import { Box, Button, Container, FormControl, TextField } from "@mui/material";
import React from "react";

const CheckingForm = ({ handleSubmit, error }) => {
  return (
    <Container>
      <h1 className="heading">Check your reservations</h1>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1, textAlign: "center" }}
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
            type="date"
            label="Time of Reservation"
            variant="standard"
            name="timeOfReservation"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ margin: "2rem 0" }}
          />
          {error && <p className="error">{error}</p>}
          <Button variant="contained" type="submit" role="find_button">
            Find
          </Button>
        </FormControl>
        <p style={{ color: "green", marginTop: "1rem" }}>
          Note: To see all the reservations, keep the date field empty!
        </p>
      </Box>
    </Container>
  );
};

export default CheckingForm;
