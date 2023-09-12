import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
];

const headCells = [
  {
    id: "ticker",
    numeric: false,
    label: "Stock",
  },
  {
    id: "name",
    numeric: false,
    label: "Name",
  },
  {
    id: "shares",
    numeric: true,
    label: "# of Shares",
  },
  {
    id: "book-value",
    numeric: true,
    label: "Book Value",
  },
  {
    id: "cad-value",
    numeric: true,
    label: "CAD Value",
  },
  {
    id: "avg-price",
    numeric: true,
    label: "Average Price",
  },
  {
    id: "yield",
    numeric: true,
    label: "Yield",
  },
  {
    id: "dividend",
    numeric: true,
    label: "Dividend",
  },
  {
    id: "withholding",
    numeric: true,
    label: "15% Withholding",
  },
  {
    id: "frequency",
    numeric: true,
    label: "Frequency",
  },
  {
    id: "payment",
    numeric: true,
    label: "Payment",
  },
  {
    id: "current-price",
    numeric: true,
    label: "Current Price",
  },
  {
    id: "drip",
    numeric: true,
    label: "Drip",
  },
  {
    id: "drip-req",
    numeric: true,
    label: "Drip Required",
  },
  {
    id: "drip-remaining",
    numeric: true,
    label: "Drip Remaining",
  },
  {
    id: "shares-req",
    numeric: true,
    label: "Shares Required",
  },
  {
    id: "remaining-shares-req",
    numeric: true,
    label: "Remaining Shares Required",
  },
  {
    id: "annual",
    numeric: true,
    label: "Annual Income",
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const renderRow = (row) => {
  const cellItems = [];
  for (var property in row) {
    cellItems.push(
      <StyledTableCell align="center">{row[property]}</StyledTableCell>
    );
  }
  return cellItems;
};

export default function EnhancedTable() {
  return (
    <>
      <h2>TFSA (CAD)</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => {
                return (
                  <StyledTableCell align="center">
                    {headCell.label}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>{renderRow(row)}</StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
