import "./App.css";
import PortfolioSelect from "./components/PortfolioSelect";
import PortfolioTable from "./components/PortfolioTable";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lightGreen } from "@mui/material/colors";
import { Stack } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: lightGreen[900],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <div className="app-body">
          <div className="app-inner">
            <Stack spacing={2}>
              <h1>Portfolio Tracker</h1>
              <PortfolioSelect />
              <PortfolioTable />
            </Stack>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
