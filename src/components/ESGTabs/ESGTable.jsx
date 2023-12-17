"use client";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SyncIcon from "@mui/icons-material/Sync";
import { CSVLink } from "react-csv";

const columns = [
  { id: "fileName", label: "Initiative Name", align: "left" },
  { id: "location", label: "Location", align: "left" },
  { id: "createdBy", label: "Created By", align: "left" },
  { id: "dateOfCreation", label: "Commencement Date", align: "left" },
  { id: "docompletion", label: "Finish Date (approx)", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "action", label: "", align: "right" },
];

import ESG from "@/lib/esg-helper";

const ESGTable = ({ type, exportRef }) => {
  const [initiatives, setInitiatives] = useState([]);
  const [page, setPage] = useState(0);
  const [reRender, setReRender] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const files = await ESG.fetchFiles(type);
      setInitiatives(files.map((file, index) => ({ ...file, id: index + 1 })));
    };
    getData();
  }, [type, reRender]);

  const statusArray = [
    { status: "complete" },
    { status: "undergoing" },
    { status: "stopped" },
    { status: "delayed" },
    { status: "undergoing" },
    { status: "neverending" },
    { status: "complete" },
    { status: "delayed" },
    { status: "complete" },
    { status: "delayed" },
  ];

  let rows = initiatives.map((initiative) => ({
    id: initiative.id,
    fileName: _.startCase(initiative.name),
    path: initiative.path,
  }));

  rows = rows.map((initiative, index) => {
    return {
      ...initiative,
      status: statusArray[index]?.status,
    };
  });

  console.log(rows);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const csvData = rows.map((row) => ({
    "Initiative Name": row.fileName,
    Location: row.fileName,
    "Created by": row.fileName,
    "Date of creation": row.fileName,
    "Date of completion (approx)": row.fileName,
    Status: row.status,
  }));

  return (
    <Paper
      elevation={2}
      sx={{
        width: "100%",
        borderRadius: "10px",
      }}
    >
      <CSVLink data={csvData} filename={"initiatives.csv"} className="export-button" ref={exportRef}></CSVLink>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => {
                if (index === 6) {
                  return (
                    <>
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, fontWeight: "bold", fontSize: "16px" }}>
                        <Button
                          color="inherit"
                          size="small"
                          startIcon={<SyncIcon />}
                          style={{ color: "grey" }}
                          onClick={() => {
                            setReRender((prev) => !prev);
                          }}
                        >
                          Sync
                        </Button>
                      </TableCell>
                    </>
                  );
                }
                return (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, fontWeight: "bold", fontSize: "16px" }}>
                    {column.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                hover
                key={row.id}
                onClick={() => {
                  router.push(`/${row.path}`);
                }}
                sx={{ cursor: "pointer" }}
              >
                <TableCell align="left">{row.fileName}</TableCell>
                <TableCell align="left">{row.fileName}</TableCell>
                <TableCell align="left">{row.fileName}</TableCell>
                <TableCell align="left">{row.fileName}</TableCell>
                <TableCell align="left">{row.fileName}</TableCell>
                <TableCell align="left">
                  <Chip
                    label={row.status}
                    sx={{
                      color: "grey",
                      borderColor: "grey",
                      backgroundColor: "#ffffff",
                    }}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="select"
                    onClick={() => {
                      console.log(row.id);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ESGTable;
