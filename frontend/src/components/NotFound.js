import "./Base.css";
import { AppBar, Paper, Toolbar, Typography, useTheme } from "@mui/material";
import React from "react";

function NotFound() {
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
        <div className="container">
          <Paper
            elevation={-1}
            sx={{
              textAlign: "center",
              p: 2,
              width: 500,
              height: 300,
            }}
          >
            <Typography
              color="primary"
              variant="h1"
              component="div"
              fontWeight={700}
              sx={{
                marginTop: "15px",
                marginBottom: "40px",
              }}
            >
              404
            </Typography>
            <Typography
              color={theme.text.headers}
              variant="h5"
              fontWeight="bold"
            >
              Not Found.
            </Typography>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default NotFound;
