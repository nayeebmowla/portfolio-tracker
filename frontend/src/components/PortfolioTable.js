import "./PortfolioTable.css";
import * as React from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useTheme } from "@mui/material/styles";
import TableSummary from "./TableSummary";
import { toMoney, toPercent } from "../utils/format";
import { Stack } from "@mui/material";

function calculateSummary(positions) {
  let totalBookValue = 0;
  let totalDividends = 0;
  positions.forEach((position) => {
    totalBookValue += position.bookValue;
    totalDividends += position.annualIncome;
  });

  return [
    {
      dividends: totalDividends,
      yield: (totalDividends * 100) / totalBookValue,
      bookValue: totalBookValue,
    },
  ];
}

function calculateMetrics(account, positions, conversionRate) {
  positions.forEach((position) => {
    const isUsd = position.currency === "USD";
    position.cadValue = isUsd
      ? position.bookValue * conversionRate
      : position.bookValue;
    position.average = position.cadValue / position.shares;
    position.yield =
      (position.dividend * position.frequency * 100) / position.currentPrice;
    position.withheldDividend =
      isUsd && account !== "RRSP"
        ? position.dividend * 0.85
        : position.dividend;
    position.payment = position.withheldDividend * position.shares;
    position.drip =
      Math.floor((position.payment / position.currentPrice) * 100) / 100;
    position.dripReq =
      position.dividend > 0
        ? (position.currentPrice / position.dividend) * position.currentPrice
        : 0;
    position.sharesReq =
      position.dividend > 0
        ? Math.ceil(position.dripReq / position.currentPrice)
        : 0;
    position.sharesRemaining =
      position.dividend > 0 ? position.sharesReq - position.shares : 0;
    position.dripRemaining =
      position.dividend > 0
        ? position.sharesRemaining * position.currentPrice
        : 0;
    position.annualIncome =
      position.dividend * position.frequency * position.shares;
  });

  return positions.sort((a, b) => a.stock.localeCompare(b.stock));
}

function getRowStyles(cell, theme) {
  if (cell.column.id === "drip") {
    if (cell.getValue() >= 1) {
      return {
        background: theme.highlights.green,
      };
    }
    if (cell.getValue() >= 0.5) {
      return {
        background: theme.highlights.yellow,
      };
    }
  }
  if (
    cell.column.id === "dividend" ||
    cell.column.id === "yield" ||
    cell.column.id === "withheld" ||
    cell.column.id === "frequency" ||
    cell.column.id === "payment"
  ) {
    if (cell.getValue() <= 0) {
      return {
        color: theme.highlights.red,
      };
    }
  }
}

export default function PortfolioTable({ account, positions, conversionRate }) {
  const theme = useTheme();
  const [sorting, setSorting] = React.useState([]);

  const data = React.useMemo(
    () => calculateMetrics(account, positions, conversionRate),
    [account, positions, conversionRate]
  );
  const summary = calculateSummary(data);

  /** @type import('@tanstack/react-table').ColumnDef<any>*/
  const columns = React.useMemo(
    () => [
      {
        id: "ticker",
        header: "Stock",
        accessorKey: "stock",
      },
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
      },
      {
        id: "shares",
        header: "# of Shares",
        accessorKey: "shares",
      },
      {
        id: "book-value",
        header: "Book Value",
        accessorKey: "bookValue",
        cell: (info) => toMoney(info.getValue()),
      },
      {
        id: "cad-value",
        header: "CAD Value",
        accessorKey: "cadValue",
        cell: (info) => toMoney(info.getValue()),
      },
      {
        id: "avg-price",
        header: "Average Price",
        accessorKey: "average",
        cell: (info) => toMoney(info.getValue()),
      },
      {
        id: "yield",
        header: "Yield",
        accessorKey: "yield",
        cell: (info) => toPercent(info.getValue()),
      },
      {
        id: "dividend",
        header: "Dividend",
        accessorKey: "dividend",
        cell: (info) => toMoney(info.getValue()),
      },
      {
        id: "withheld",
        header: "15% Withheld Dividend",
        accessorKey: "withheldDividend",
        cell: (info) => toMoney(info.getValue()),
      },
      {
        id: "frequency",
        header: "Frequency",
        accessorKey: "frequency",
      },
      {
        id: "payment",
        header: "Payment",
        accessorKey: "payment",
        cell: (info) => toMoney(info.getValue()),
      },
      {
        id: "current-price",
        header: "Current Price",
        accessorKey: "currentPrice",
        cell: (info) => toMoney(info.getValue()),
      },
      {
        id: "drip",
        header: "DRIP",
        accessorKey: "drip",
        cell: (info) => info.getValue().toFixed(2),
      },
      {
        id: "drip-req",
        header: "DRIP Required",
        accessorKey: "dripReq",
        cell: (info) => toMoney(info.getValue()),
      },
      {
        id: "drip-remaining",
        header: "DRIP Remaining",
        accessorKey: "dripRemaining",
        cell: (info) => toMoney(info.getValue()),
      },
      {
        id: "shares-req",
        header: "Shares Required",
        accessorKey: "sharesReq",
      },
      {
        id: "shares-remaining",
        header: "Shares Remaining",
        accessorKey: "sharesRemaining",
      },
      {
        id: "annual-income",
        header: "Annual Income",
        accessorKey: "annualIncome",
        cell: (info) => toMoney(info.getValue()),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <Stack spacing={2} alignItems="center">
        <TableSummary data={summary} />
        <table className="portfolio-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: (
                          <ArrowUpwardIcon
                            color="disabled"
                            sx={{ fontSize: 16 }}
                          />
                        ),
                        desc: (
                          <ArrowDownwardIcon
                            color="disabled"
                            sx={{ fontSize: 16 }}
                          />
                        ),
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={
                      typeof getRowStyles === "function"
                        ? getRowStyles(cell, theme)
                        : {}
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Stack>
    </>
  );
}
