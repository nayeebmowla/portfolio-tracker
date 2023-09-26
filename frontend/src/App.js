import data from "./mock-data.json";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Summary from "./components/Summary";
import Dividends from "./components/Dividends";

function App() {
  const [token, setToken] = React.useState();
  const accounts = data.map((item) => item.account);
  const primaryAccount = accounts.find((account) => account.isPrimary === true);
  const [account, setAccount] = React.useState(primaryAccount.type);
  const positions = data.find((item) => item.account.type === account);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route index element={<Login setToken={setToken} />} />
      <Route path="login" element={<Login setToken={setToken} />} />
      <Route path="dashboard" element={<Dashboard setToken={setToken} />}>
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
  );
}

export default App;
