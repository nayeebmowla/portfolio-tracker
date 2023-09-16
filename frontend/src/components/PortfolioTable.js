import "./PortfolioTable.css";
import * as React from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";

function toMoney(value) {
  return typeof value === "number"
    ? value >= 0
      ? `$${value.toFixed(2)}`
      : `-$${Math.abs(value).toFixed(2)}`
    : value;
}

function toPercent(value) {
  return `${value.toFixed(2)}%`;
}

function calculateMetrics(positions, conversionRate) {
  positions.forEach((position) => {
    const isUsd = position.currency === "USD";
    position.cadValue = isUsd
      ? position.bookValue * conversionRate
      : position.bookValue;
    position.average = position.cadValue / position.shares;
    position.yield =
      (position.dividend * position.frequency * 100) / position.currentPrice;
    position.withHeldDividend = isUsd
      ? position.dividend * 0.85
      : position.dividend;
    position.payment = position.withHeldDividend * position.shares;
    position.drip =
      Math.floor((position.payment / position.currentPrice) * 100) / 100;
    position.dripReq =
      position.dividend > 0
        ? (position.currentPrice / position.dividend) * position.currentPrice
        : "N/A";
    position.sharesReq =
      position.dividend > 0
        ? Math.ceil(position.dripReq / position.currentPrice)
        : "N/A";
    position.sharesRemaining =
      position.dividend > 0 ? position.sharesReq - position.shares : "N/A";
    position.dripRemaining =
      position.dividend > 0
        ? position.sharesRemaining * position.currentPrice
        : "N/A";
    position.annualIncome =
      position.dividend * position.frequency * position.shares;
  });

  return positions;
}

export default function PortfolioTable({ positions, conversionRate }) {
  positions = calculateMetrics(positions, conversionRate);

  /** @type import('@tanstack/react-table').ColumnDef<any>*/
  const columns = [
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
      accessorKey: "withHeldDividend",
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
      header: "Drip",
      accessorKey: "drip",
      cell: (info) => info.getValue().toFixed(2),
    },
    {
      id: "drip-req",
      header: "Drip Required",
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
  ];

  const table = useReactTable({
    data: positions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <table className="portfolio-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
