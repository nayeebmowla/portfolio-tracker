import React from "react";
import PortfolioSelect from "./PortfolioSelect";
import { Stack } from "@mui/material";

function Summary({ account, onAccountSelect, accounts }) {
  return (
    <Stack spacing={2}>
      <PortfolioSelect
        accounts={accounts}
        account={account}
        onChange={onAccountSelect}
      />
      <div>Summary...</div>
    </Stack>
  );
}

export default Summary;
