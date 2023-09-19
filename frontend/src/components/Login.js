import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <Typography color="primary" variant="h5" fontWeight="bold">
        Login
      </Typography>
      <Button component={Link} to={"/dashboard/dividends"}>
        Login
      </Button>
    </>
  );
}

export default Login;
