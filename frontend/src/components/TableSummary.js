import "./PortfolioTable.css";
import React from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { toMoney, toPercent } from "../utils/format";

function TableSummary({ data }) {
  /** @type import('@tanstack/react-table').ColumnDef<any>*/
  const columns = React.useMemo(
    () => [
      {
        id: "dividends",
        header: "Total Dividends",
        accessorKey: "dividends",
        cell: (info) => toMoney(info.getValue()),
      },
      {
        id: "yield",
        header: "Total Dividend Yield",
        accessorKey: "yield",
        cell: (info) => toPercent(info.getValue()),
      },
      {
        id: "book-value",
        header: "Total Book Value",
        accessorKey: "bookValue",
        cell: (info) => toMoney(info.getValue()),
      },
    ],
    []
  );

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="table-summary">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} colSpan={header.colSpan}>
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
  );
}

export default TableSummary;
