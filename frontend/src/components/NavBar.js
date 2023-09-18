import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <Typography
            color="primary"
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Portfolio Tracker
          </Typography>
          <Button>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
