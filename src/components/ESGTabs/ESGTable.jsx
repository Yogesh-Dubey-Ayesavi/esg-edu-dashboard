"use client";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SyncIcon from "@mui/icons-material/Sync";
import { CSVLink } from "react-csv";
import GetAppIcon from "@mui/icons-material/GetApp";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

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
import { Search } from "../Search";
import { useDebounce } from "@/hooks/useDebounce";
import Dropdown from "../dropDown";
import { Completed, Delayed, Neverending, Stopped, Undergoing } from "./chips";

const ESGTable = ({ type, exportRef }) => {
  const [initiatives, setInitiatives] = useState([]);
  const [page, setPage] = useState(0);
  const [reRender, setReRender] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const files = await ESG.fetchFiles(type);
      console.log(files);
      setInitiatives(files.map((file, index) => ({ ...file, id: index + 1 })));
    };
    getData();
  }, [type, reRender]);

  // const statusArray = [
  //   { status: "complete" },
  //   { status: "undergoing" },
  //   { status: "stopped" },
  //   { status: "delayed" },
  //   { status: "undergoing" },
  //   { status: "neverending" },
  //   { status: "complete" },
  //   { status: "delayed" },
  //   { status: "complete" },
  //   { status: "delayed" },
  // ];

  let rows = initiatives.map((initiative) => ({
    id: initiative.id,
    name: _.startCase(initiative.name),
    path: initiative.path,
    location: initiative.location,
    created_at: new Date(initiative.created_at).toLocaleDateString(),
    dateOfCompletion: new Date(initiative.dateOfCompletion).toLocaleDateString(),
    created_by: initiative.created_by,
    status: initiative.status,
  }));

  // rows = rows.map((initiative, index) => {
  //   return {
  //     ...initiative,
  //     status: statusArray[index]?.status,
  //   };
  // });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const csvData = initiatives.map((row) => ({
  //   "Initiative Name": row.fileName,
  //   Location: row.fileName,
  //   "Created by": row.fileName,
  //   "Date of creation": row.fileName,
  //   "Date of completion (approx)": row.fileName,
  //   Status: row.status,
  // }));

  const csvData = "";

  useEffect(() => {
    // Make your fetch call using debouncedSearch
    console.log("Fetching data for:", debouncedSearch);
  }, [debouncedSearch]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Box style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
          <Search placeholder={"Search file.."} search={search} setSearch={setSearch} />
          <Dropdown />
        </Box>
        <Box>
          <Button
            variant="text"
            startIcon={<GetAppIcon />}
            style={{
              color: "black",
              padding: "8px 20px",
              borderRadius: "11px",
              textTransform: "none",
              fontWeight: "600",
              marginRight: "10px",
            }}
            size="large"
            onClick={() => {
              if (exportRef.current) {
                exportRef.current.link.click();
              }
            }}
          >
            Export to CSV
          </Button>
          <Button
            variant="contained"
            startIcon={<AddOutlinedIcon />}
            style={{
              backgroundColor: "#6366F1",
              padding: "8px 20px",
              borderRadius: "11px",
              textTransform: "none",
              fontWeight: "600",
            }}
            size="large"
            onClick={() => {
              router.push(`/${type}`);
            }}
          >
            Add
          </Button>
        </Box>
      </Box>
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
                    // router.push(`/${row.path}`);
                    router.push(
                      {
                        pathname: `/${row.path}`,
                        query: { data: initiatives },
                      },
                      `/${row.path}`
                    );
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.location}</TableCell>
                  <TableCell align="left">{row.created_by}</TableCell>
                  <TableCell align="left">{row.created_at}</TableCell>
                  <TableCell align="left">{row.dateOfCompletion}</TableCell>
                  <TableCell align="left">
                    {row.status === "completed" && <Completed status={row.status} />}
                    {row.status === "delayed" && <Delayed status={row.status} />}
                    {row.status === "neverending" && <Neverending status={row.status} />}
                    {row.status === "stopped" && <Stopped status={row.status} />}
                    {row.status === "undergoing" && <Undergoing status={row.status} />}
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
    </Box>
  );
};

export default ESGTable;
