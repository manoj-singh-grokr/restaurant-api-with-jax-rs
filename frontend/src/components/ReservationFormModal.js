import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Modal,
  styled,
} from "@mui/material";

import PhoneIcon from "@mui/icons-material/Phone";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

import * as Yup from "yup";

import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlurryModal = styled(Modal)((props) => ({
  backdropFilter: props.open ? "blur(5px)" : "none",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: 700,
  height: 550,
  transform: "translate(-50%, -50%)",
  backgroundColor: "#1A2027",
  borderRadius: "1rem",
  p: 4,
  textAlign: "center",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required!"),
  mobileNo: Yup.string().required("Mobile No. is necessary!").length(10),
  noOfPeople: Yup.number().required("No. of people is required!"),
  timeOfReservation: Yup.date().required("Time of reservation is required!"),
});

const initialValues = {
  username: "",
  mobileNo: "",
  noOfPeople: "",
  timeOfReservation: "",
};

const ReservationFormModal = ({ open, handleClose }) => {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (values) => {
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
        navigate("/reservations", {
          state: { userInfo: { username: values.username } },
        });
        handleClose();
      }
    } catch (err) {
      setError(err.response.data);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  return (
    <BlurryModal
      open={open}
      onClose={handleClose}
      aria-labelledby="reservation-form-modal"
      aria-describedby="reservation-form-modal"
    >
      <Grid container spacing={2} style={style}>
        <Grid
          item
          xs={5}
          md={5}
          sx={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('https://cdn.pixabay.com/photo/2016/11/30/14/08/cafe-1872888_960_720.jpg')`,
            backgroundPosition: "leftcenter",
            backgroundSize: "cover",
            borderBottomLeftRadius: "1rem",
            borderTopLeftRadius: "1rem",
          }}
        ></Grid>
        <Grid item xs={7} md={7}>
          <h2 className="heading">Make a reservation</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnBlur={false}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="form">
                <Field
                  as={TextField}
                  type="text"
                  name="username"
                  label="User Name"
                  variant="outlined"
                  size="small"
                  sx={{
                    label: { color: "#fff" },
                    width: 300,
                    margin: "1rem 3rem",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error"
                />
                <Field
                  as={TextField}
                  type="text"
                  name="mobileNo"
                  label="Mobile No"
                  variant="outlined"
                  size="small"
                  sx={{
                    label: { color: "#fff" },
                    width: 300,
                    margin: "1rem 3rem",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage
                  name="mobileNo"
                  component="div"
                  className="error"
                />
                <FormControl>
                  <Field
                    as={TextField}
                    name="noOfPeople"
                    label="No of People"
                    variant="outlined"
                    select
                    data-testid="noOfPeople"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmojiPeopleIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      label: { color: "#fff" },
                      width: 300,
                      margin: "1rem 3rem",
                    }}
                  >
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                  </Field>
                </FormControl>
                <ErrorMessage
                  name="noOfPeople"
                  component="div"
                  className="error"
                />
                <Field
                  as={TextField}
                  type="datetime-local"
                  name="timeOfReservation"
                  label="Time of Reservation"
                  variant="outlined"
                  size="small"
                  sx={{
                    label: { color: "#fff" },
                    width: 300,
                    margin: "1rem 3rem",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <ErrorMessage
                  name="timeOfReservation"
                  component="div"
                  className="error"
                />

                {error && <p className="error">{error}</p>}
                <Button
                  role="reserveButton"
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  sx={{ marginLeft: "35%", marginTop: "1rem", width: 100 }}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </BlurryModal>
  );
};

export default ReservationFormModal;
