import "./Base.css";
import {
  AppBar,
  Button,
  Divider,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import queryString from "query-string";
import axios from "axios";

function Login({ setToken }) {
  const navigate = useNavigate();
  const authorizationUrl = `https://login.questrade.com/oauth2/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_CALLBACK_URI}`;
  const theme = useTheme();

  useEffect(() => {
    const { code } = queryString.parse(window.location.search);
    if (code) {
      const fetchToken = async () => {
        const result = await axios.post(
          `${process.env.REACT_APP_SERVER}/api/auth`,
          {
            code,
            redirect_uri: process.env.REACT_APP_CALLBACK_URI,
          }
        );
        setToken(result.data);
        navigate("/dashboard/dividends", { replace: true });
      };

      fetchToken();
    }
  }, []);

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
        <div className="container">
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
              to={authorizationUrl}
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
