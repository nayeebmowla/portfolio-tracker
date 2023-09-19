import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Divider, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

function NavBar() {
  const [page, setPage] = React.useState("dividends");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (event) => {
    const { currentPage } = event.currentTarget.dataset;
    setPage(currentPage);
    handleClose();
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
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={open}
            onClick={handleClose}
            MenuListProps={{
              "aria-labelledby": "menu-button",
            }}
          >
            <MenuItem
              component={Link}
              data-current-page="dividends"
              to={"/dashboard/dividends"}
              onClick={handleMenuItemClick}
            >
              Dividends
            </MenuItem>
            <MenuItem
              component={Link}
              data-current-page="summary"
              to={"/dashboard/summary"}
              onClick={handleMenuItemClick}
            >
              Summary
            </MenuItem>
          </Menu>
          <Divider orientation="vertical" flexItem />
          <Typography fontWeight="bold" variant="h7" textTransform="uppercase">
            {page}
          </Typography>
        </Stack>

        <Button component={Link} to={"/login"}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
