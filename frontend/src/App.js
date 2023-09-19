import "./App.css";
import * as React from "react";
import PortfolioSelect from "./components/PortfolioSelect";
import PortfolioTable from "./components/PortfolioTable";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lightGreen } from "@mui/material/colors";
import { Stack } from "@mui/material";

import data from "./mock-data.json";
import RefreshButton from "./components/RefreshButton";
import NavBar from "./components/NavBar";

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
    secondary: {
      main: "#ffffff",
    },
  },
});

function App() {
  const primaryAccount = mockAccounts.find(
    (account) => account.isPrimary === true
  );
  const [account, setAccount] = React.useState(primaryAccount.type);

  const cadPositions = data.positions.filter(
    (position) => position.currency === "CAD"
  );
  const usdPositions = data.positions.filter(
    (position) => position.currency === "USD"
  );

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <div className="app">
        <div className="app-body">
          <div className="app-inner">
            <Stack spacing={2}>
              <Stack alignItems="center" direction="row" spacing={2}>
                <RefreshButton />
                <PortfolioSelect
                  accounts={mockAccounts}
                  account={account}
                  onChange={(event) => {
                    setAccount(event.target.value);
                  }}
                />
              </Stack>
              <br />
              {cadPositions.length !== 0 && (
                <>
                  <h2>{`${account} (CAD)`}</h2>
                  <PortfolioTable
                    positions={cadPositions}
                    conversionRate={data.usdToCadConversionRate}
                  />
                </>
              )}
              <br />
              {usdPositions.length !== 0 && (
                <>
                  <h2>{`${account} (USD)`}</h2>
                  <PortfolioTable
                    positions={usdPositions}
                    conversionRate={data.usdToCadConversionRate}
                  />
                </>
              )}
            </Stack>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
