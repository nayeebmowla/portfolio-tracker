import React from "react";
import { Route, Routes } from "react-router-dom";
import Dividends from "./Dividends";
import Summary from "./Summary";
import NotFound from "./NotFound";
import Dashboard from "./Dashboard";

function DashboardRoutes({ data, setToken }) {
  const accounts = data.map((item) => item.account);
  const primaryAccount = accounts.find((account) => account.isPrimary === true);
  const [account, setAccount] = React.useState(primaryAccount.type);
  const positions = data.find((item) => item.account.type === account);

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
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

export default DashboardRoutes;
