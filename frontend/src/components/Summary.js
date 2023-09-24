import React from "react";
import PortfolioSelect from "./PortfolioSelect";
import { Stack, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useTheme } from "@mui/material/styles";

const data = [
  { label: "Group A", value: 400 },
  { label: "Group B", value: 300 },
  { label: "Group C", value: 300 },
  { label: "Group D", value: 200 },
];

const sizing = {
  width: 400,
  height: 200,
};
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};

function Summary({ account, onAccountSelect, accounts }) {
  const theme = useTheme();

  return (
    <Stack spacing={2}>
      <PortfolioSelect
        accounts={accounts}
        account={account}
        onChange={onAccountSelect}
      />
      <br />
      <Typography color={theme.text.headers} variant="h5" fontWeight="bold">
        {`${account}`}
      </Typography>
      <PieChart
        series={[
          {
            outerRadius: 80,
            data,
            arcLabel: getArcLabel,
            arcLabelMinAngle: 45,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontSize: 14,
          },
        }}
        {...sizing}
      />
    </Stack>
  );
}

export default Summary;
