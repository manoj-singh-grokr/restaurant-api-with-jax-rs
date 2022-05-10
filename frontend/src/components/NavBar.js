import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function ElevationScroll(props) {
  const { children } = props;
  return React.cloneElement(children, {
    elevation: 4,
  });
}

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ElevationScroll>
        <AppBar
          position="static"
          style={{ background: "transparent", boxShadow: "none" }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontFamily: "Lato",
                fontWeight: "400",
              }}
            >
              <Link to="/" className="logo-link">
                FRYING NEMO
              </Link>
            </Typography>
            <Link to="/book" className="side-link">
              Book
            </Link>
            <Link to="/reservations" className="side-link">
              Reservations
            </Link>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
};

export default NavBar;
