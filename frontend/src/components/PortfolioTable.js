import "./PortfolioTable.css";
import * as React from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";

function createData(
  stock,
  name,
  shares,
  bookValue,
  dividend,
  frequency,
  currentPrice,
  currency
) {
  return {
    stock,
    name,
    shares,
    bookValue,
    dividend,
    frequency,
    currentPrice,
    currency,
  };
}

const data = [
  createData(
    "CU",
    "Canadian Utilities Limited Class A",
    50,
    2000.6,
    0.449,
    4,
    31.2,
    "CAD"
  ),
  createData(
    "CU",
    "Canadian Utilities Limited Class A",
    50,
    2000.6,
    0.449,
    4,
    31.2,
    "CAD"
  ),
];

const usdToCadConversionRate = 1.36;

export default function PortfolioTable() {
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
    },
    {
      id: "cad-value",
      header: "CAD Value",
      accessorFn: (row) =>
        row.curreny === "USD"
          ? usdToCadConversionRate * row.bookValue
          : row.bookValue,
    },
    // {
    //   id: "avg-price",
    //   header: "Average Price",
    //   cell: (info) => console.log(info), // TODO
    // },
    // {
    //   id: "yield",
    //   header: "Yield",
    //   accessorKey: 'TODO',
    // },
    {
      id: "dividend",
      header: "Dividend",
      accessorKey: "dividend",
    },
    // {
    //   id: "withheld",
    //   header: "15% Withheld Dividend",
    //   accessorKey: 'TODO',
    // },
    {
      id: "frequency",
      header: "Frequency",
      accessorKey: "frequency",
    },
    // {
    //   id: "payment",
    //   header: "Payment",
    //   accessorKey: 'TODO',
    // },
    {
      id: "current-price",
      header: "Current Price",
      accessorKey: "currentPrice",
    },
    // {
    //   id: "drip",
    //   header: "Drip",
    //   accessorKey: 'TODO',
    // },
    // {
    //   id: "drip-req",
    //   header: "Drip Required",
    //   accessorKey: 'TODO',
    // },
    // {
    //   id: "drip-remaining",
    //   header: "DRIP Remaining",
    //   accessorKey: 'TODO',
    // },
    // {
    //   id: "shares-req",
    //   header: "Shares Required",
    //   accessorKey: 'TODO',
    // },
    // {
    //   id: "shares-remaining",
    //   header: "Shares Remaining",
    //   accessorKey: 'TODO',
    // },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <h2>TFSA (CAD)</h2>
      <table className="portfolio-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.stock}>
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
