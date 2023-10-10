import * as React from "react";
import PortfolioSelect from "./PortfolioSelect";
import PortfolioTable from "./PortfolioTable";
import { Stack, Typography } from "@mui/material";
import RefreshButton from "./RefreshButton";
import { useTheme } from "@mui/material/styles";
import TableSummary from "./TableSummary";

function Dividends({ account, onAccountSelect, accounts, data, fetchData }) {
  const theme = useTheme();

  const cadPositions = data.positions.filter(
    (position) => position.currency === "CAD"
  );
  const usdPositions = data.positions.filter(
    (position) => position.currency === "USD"
  );

  return (
    <div className="dividends-container">
      <Stack spacing={2}>
        <Stack alignItems="center" direction="row" spacing={2}>
          <RefreshButton onClick={fetchData} />
          <PortfolioSelect
            accounts={accounts}
            account={account}
            onChange={onAccountSelect}
          />
        </Stack>
        <br />
        <Typography color={theme.text.headers} variant="h5" fontWeight="bold">
          {`Total (CAD)`}
        </Typography>
        <TableSummary data={[]} />
        <br />
        {cadPositions.length !== 0 && (
          <>
            <Typography
              color={theme.text.headers}
              variant="h5"
              fontWeight="bold"
            >
              {`${account} (CAD)`}
            </Typography>
            <PortfolioTable
              account={account}
              positions={cadPositions}
              conversionRate={data.usdToCadConversionRate}
            />
          </>
        )}
        <br />
        {usdPositions.length !== 0 && (
          <>
            <Typography
              color={theme.text.headers}
              variant="h5"
              fontWeight="bold"
            >
              {`${account} (USD)`}
            </Typography>
            <PortfolioTable
              account={account}
              positions={usdPositions}
              conversionRate={data.usdToCadConversionRate}
            />
          </>
        )}
      </Stack>
    </div>
  );
}

export default Dividends;
