import "./App.css";
import PortfolioSelect from "./components/PortfolioSelect";
import PortfolioTable from "./components/PortfolioTable";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lightGreen } from "@mui/material/colors";
import { Stack } from "@mui/material";

import data from "./mock-data.json";

const mockAccounts = [
  {
    type: "TFSA",
    isPrimary: true,
  },
  {
    type: "Margin",
    isPrimary: false,
  },
];

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
              <PortfolioSelect accounts={mockAccounts} />
              <h2>{`${data.account} (CAD)`}</h2>
              <PortfolioTable
                positions={data.positions.filter(
                  (position) => position.currency === "CAD"
                )}
                conversionRate={data.usdToCadConversionRate}
              />
              <h2>{`${data.account} (USD)`}</h2>
              <PortfolioTable
                positions={data.positions.filter(
                  (position) => position.currency === "USD"
                )}
                conversionRate={data.usdToCadConversionRate}
              />
            </Stack>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
