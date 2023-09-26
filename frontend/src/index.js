import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4A9195",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
  text: {
    headers: "#394352",
  },
  highlights: {
    green: "#34A853",
    yellow: "#FBBC04",
    red: "#EA4335",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
