import "./Login.css";
import {
  AppBar,
  Button,
  Divider,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function Login() {
  const theme = useTheme();
  return (
    <>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <Typography
            color="primary"
            variant="h5"
            component="div"
            fontWeight={700}
          >
            Portfolio Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="background">
        <div className="login-container">
          <Paper
            elevation={3}
            sx={{
              textAlign: "center",
              p: 2,
              width: 500,
              height: 300,
            }}
          >
            <Typography
              color={theme.text.headers}
              variant="h4"
              fontWeight="bold"
              sx={{
                marginTop: "15px",
                marginBottom: "40px",
              }}
            >
              Login to Questrade or use sample data.
            </Typography>
            <Button
              size="large"
              variant="contained"
              component={Link}
              to={"/dashboard/dividends"}
              sx={{
                marginBottom: "15px",
              }}
            >
              Login
            </Button>
            <Divider variant="middle">OR</Divider>
            <Button
              size="large"
              variant="contained"
              component={Link}
              to={"/dashboard/dividends"}
              sx={{
                marginTop: "15px",
              }}
            >
              Use sample data
            </Button>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default Login;
