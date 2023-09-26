import data from "./mock-data.json";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Summary from "./components/Summary";
import Dividends from "./components/Dividends";

function App() {
  const accounts = data.map((item) => item.account);
  const primaryAccount = accounts.find((account) => account.isPrimary === true);
  const [account, setAccount] = React.useState(primaryAccount.type);
  const positions = data.find((item) => item.account.type === account);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route
            path="dividends"
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
            path="summary"
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
