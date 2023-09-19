import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Divider, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar color="secondary" position="static">
      <Toolbar>
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
          sx={{ flexGrow: 1 }}
        >
          <Typography
            color="primary"
            variant="h5"
            component="div"
            fontWeight={700}
          >
            Portfolio Tracker
          </Typography>
          <IconButton
            id="menu-button"
            aria-controls={open ? "menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "menu-button",
            }}
          >
            <MenuItem onClick={handleClose}>Dividends</MenuItem>
            <MenuItem onClick={handleClose}>Summary</MenuItem>
          </Menu>
          <Divider orientation="vertical" flexItem />
          <Typography fontWeight="bold" variant="h7" textTransform="uppercase">
            Dividends
          </Typography>
        </Stack>

        <Button>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
