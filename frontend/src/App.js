import "./App.css";
import * as React from "react";
import NavBar from "./components/NavBar";
import Dividends from "./components/Dividends";

import data from "./mock-data.json";
import { Route, Routes } from "react-router-dom";
import Summary from "./components/Summary";

function App() {
  const accounts = data.map((item) => item.account);
  const primaryAccount = accounts.find((account) => account.isPrimary === true);
  const [account, setAccount] = React.useState(primaryAccount.type);
  const positions = data.find((item) => item.account.type === account);

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
                    accounts={accounts}
                    onAccountSelect={(event) => {
                      setAccount(event.target.value);
                    }}
                    data={positions}
                  />
                }
              />
              <Route
                path="/summary"
                element={
                  <Summary
                    account={account}
                    accounts={accounts}
                    onAccountSelect={(event) => {
                      setAccount(event.target.value);
                    }}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
