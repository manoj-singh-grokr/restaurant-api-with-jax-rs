import React from "react";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

import {
  InputAdornment,
  Box,
  Button,
  Container,
  FormControl,
  Modal,
  TextField,
  styled,
} from "@mui/material";

const BlurryModal = styled(Modal)((props) => ({
  backdropFilter: props.open ? "blur(5px)" : "none",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "1rem",
  p: 4,
};

const CheckingForm = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      timeOfReservation: e.target.timeOfReservation.value,
    };
    console.log(data);
    handleClose();
    navigate("/reservations", { state: { userInfo: data } });
  };
  return (
    <BlurryModal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="check-reservations"
      aria-describedby="gets-user-details"
    >
      <Container sx={style}>
        <h2 className="heading">Check your reservations</h2>
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
              variant="outlined"
              name="username"
              sx={{ margin: "5px 0" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type="date"
              label="Time of Reservation"
              variant="outlined"
              name="timeOfReservation"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ margin: "2rem 0" }}
            />
            <Button variant="contained" type="submit" role="find_button">
              Find
            </Button>
          </FormControl>
          <p style={{ color: "green", marginTop: "1rem" }}>
            Note: To see all the reservations, keep the date field empty!
          </p>
        </Box>
      </Container>
    </BlurryModal>
  );
};

export default CheckingForm;
