import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

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
                <MenuIcon />
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
                    <Link to="/book" className="side-link">
                      Book
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to="/reservations" className="side-link">
                      Reservations
                    </Link>
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Link to="/book" className="side-link">
                Book
              </Link>
              <Link to="/reservations" className="side-link">
                Reservations
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
};

export default NavBar;
