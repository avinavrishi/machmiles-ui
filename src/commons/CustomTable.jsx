import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TableSortLabel,
  Typography,
} from "@mui/material";

const CustomTable = ({ columns, data, title = "Data Table" ,height = 300, rowsPerPageArr=[5, 10, 25] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  // Handle Sorting
  const handleSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  // Sort Data
  const sortedData = [...data].sort((a, b) => {
    if (orderBy) {
      return order === "asc"
        ? a[orderBy] > b[orderBy]
          ? 1
          : -1
        : a[orderBy] < b[orderBy]
        ? 1
        : -1;
    }
    return 0;
  });

  // Handle Page Change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle Rows per Page Change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: 3 }}>
      <TableContainer
      sx={{
        minHeight:400,
        maxHeight: height > 400 ? height: 400,
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none", // Hides scrollbar in WebKit browsers
        },
        "-ms-overflow-style": "none", // Hides scrollbar in IE/Edge
        "scrollbar-width": "none", // Hides scrollbar in Firefox
      }}
      >
        <Table stickyHeader>
          {/* Table Head */}
          <TableHead>
            <TableRow sx={{backgroundColor:"#0a2556", color:'white'}}>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align || "left"} sx={{ backgroundColor: "#0a2556", color: "white" }}>
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={() => handleSort(column.id)}
                  >
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: 600, fontSize:'0.85rem' }}>
                      {column.label}
                    </Typography>
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align || "left"}>
                    <Typography sx={{ fontFamily: "Poppins", fontSize:'0.85rem' }}>
                      {column.renderCell ? column.renderCell(row) : row[column.id]}
                    </Typography>
                  </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={rowsPerPageArr}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ fontFamily: "Poppins" }}
      />
    </Paper>
  );
};

export default CustomTable;
