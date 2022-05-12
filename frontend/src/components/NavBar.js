import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CheckingForm from "./CheckingForm";
import ReservationFormModal from "./ReservationFormModal";

function ElevationScroll(props) {
  const { children } = props;
  return React.cloneElement(children, {
    elevation: 4,
  });
}

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [openReservationForm, setOpenReservationForm] = useState(false);
  const handleOpenReservationForm = () => setOpenReservationForm(true);
  const handleCloseReservationForm = () => setOpenReservationForm(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      to="#"
                      className="side-link"
                      onClick={handleOpenReservationForm}
                      data-testid="ham-book"
                    >
                      Book
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    to="#"
                    onClick={handleOpen}
                    className="side-link"
                    data-testid="ham-reservation"
                  >
                    Reservations
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Link
                to="#"
                className="side-link"
                onClick={handleOpenReservationForm}
                data-testid="desk-book"
              >
                Book
              </Link>
              <Link
                to="#"
                className="side-link"
                onClick={handleOpen}
                data-testid="desk-reservation"
              >
                Reservations
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <CheckingForm open={open} handleClose={handleClose} />
      <ReservationFormModal
        open={openReservationForm}
        handleClose={handleCloseReservationForm}
      />
    </Box>
  );
};

export default NavBar;
