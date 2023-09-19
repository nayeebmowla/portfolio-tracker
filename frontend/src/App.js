import "./App.css";
import * as React from "react";
import NavBar from "./components/NavBar";
import Dividends from "./components/Dividends";

import data from "./mock-data.json";
import { Route, Routes } from "react-router-dom";
import Summary from "./components/Summary";

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

function App() {
  const primaryAccount = mockAccounts.find(
    (account) => account.isPrimary === true
  );
  const [account, setAccount] = React.useState(primaryAccount.type);

  return (
    <>
      <nav>
        <NavBar />
      </nav>
      <div className="app">
        <div className="app-body">
          <div className="app-inner">
            <Routes>
              <Route
                path="/dividends"
                element={
                  <Dividends
                    account={account}
                    accounts={mockAccounts}
                    onAccountSelect={(event) => {
                      setAccount(event.target.value);
                    }}
                    data={data}
                  />
                }
              />
              <Route path="/summary" element={<Summary />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
