import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormControl, InputAdornment, MenuItem } from "@mui/material";

import PhoneIcon from "@mui/icons-material/Phone";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

import * as Yup from "yup";

import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  username: Yup.string().required(),
  mobileNo: Yup.string().required().length(10),
  noOfPeople: Yup.number().required(),
  timeOfReservation: Yup.date().required(),
});

const initialValues = {
  username: "",
  mobileNo: "",
  noOfPeople: "",
  timeOfReservation: "",
};

const ReservationForm = () => {
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
        navigate("/reservations", { state: { userInfo: values } });
      }
    } catch (err) {
      setError(err.response.data);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
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
              margin: "1rem 0",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <ErrorMessage name="username" component="div" className="error" />
          <Field
            as={TextField}
            type="text"
            name="mobileNo"
            label="Mobile No"
            variant="outlined"
            size="small"
            sx={{ label: { color: "#fff" }, width: 300, margin: "1rem 0" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          />
          <ErrorMessage name="mobileNo" component="div" className="error" />
          <FormControl>
            <Field
              as={TextField}
              name="noOfPeople"
              label="No of People"
              variant="outlined"
              select
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmojiPeopleIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ label: { color: "#fff" }, width: 300, margin: "1rem 0" }}
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Field>
          </FormControl>
          <ErrorMessage name="noOfPeople" component="div" className="error" />
          <Field
            as={TextField}
            type="datetime-local"
            name="timeOfReservation"
            label="Time of Reservation"
            variant="outlined"
            size="small"
            sx={{ label: { color: "#fff" }, width: 300, margin: "1rem 0" }}
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
            sx={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ReservationForm;
