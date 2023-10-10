import * as React from "react";
import Login from "./components/Login";
import axios from "axios";
import DashboardRoutes from "./components/DashboardRoutes";
import { Box, CircularProgress } from "@mui/material";
import useToken from "./hooks/useToken";

function App() {
  const { token, setToken } = useToken();
  const [data, setData] = React.useState([]);

  const fetchData = React.useCallback(async (token) => {
    const result = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/positions`,
      {
        access_token: token.access_token,
        api_server: token.api_server,
        token_type: token.token_type,
      }
    );
    setData(result.data);
  }, []);

  React.useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  if (data.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress size={75} />
      </Box>
    );
  }

  return <DashboardRoutes data={data} setToken={setToken} />;
}

export default App;
