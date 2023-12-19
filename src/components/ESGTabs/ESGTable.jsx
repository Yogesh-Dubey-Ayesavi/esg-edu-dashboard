"use client";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import GetAppIcon from "@mui/icons-material/GetApp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SyncIcon from "@mui/icons-material/Sync";
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const CSVLink = dynamic(() => import("react-csv").then((mod) => mod.CSVLink), { ssr: false });

const columns = [
  { id: "fileName", label: "Initiative Name", align: "left" },
  { id: "location", label: "Location", align: "left" },
  { id: "createdBy", label: "Created By", align: "left" },
  { id: "dateOfCreation", label: "Commencement Date", align: "left" },
  { id: "docompletion", label: "Finish Date (approx)", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "action", label: "", align: "right" },
];

import { useDebounce } from "@/hooks/useDebounce";
import ESG from "@/lib/esg-helper";
import { Search } from "../Search";
import Dropdown from "../Dropdown";
import { Completed, Delayed, Neverending, Stopped, Undergoing } from "./chips";
import dynamic from "next/dynamic";

const ESGTable = ({ type }) => {
  const [initiatives, setInitiatives] = useState([]);
  const [page, setPage] = useState(0);
  const [reRender, setReRender] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const [filter, setFilter] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  const setFiles = (files) => {
    setInitiatives(
      files.map((initiative, index) => ({
        id: initiative.id,
        name: _.startCase(initiative.name),
        path: initiative.path,
        location: initiative.location,
        created_at: new Date(initiative.created_at).toLocaleDateString(),
        dateOfCompletion: new Date(initiative.dateOfCompletion).toLocaleDateString(),
        created_by: initiative.created_by,
        status: initiative.status,
      }))
    );
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     const files = await ESG.fetchFiles(type);
  //     // console.log(files);
  //     setFiles(files);
  //   };
  //   getData();
  // }, [type, reRender]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const csvData = initiatives.map((initiative) => ({
    Id: initiative.id,
    Name: _.startCase(initiative.name),
    Path: initiative.path,
    Location: initiative.location,
    "Created at": new Date(initiative.created_at).toLocaleDateString(),
    "Date of completion": new Date(initiative.dateOfCompletion).toLocaleDateString(),
    "Created by": initiative.created_by,
    Status: initiative.status,
  }));

  useEffect(() => {
    const getSearchData = async () => {
      const files = await ESG.searchFiles(type, {
        field_name: filter != "" ? filter : "name",
        key: debouncedSearch,
      });
      setFiles(files);
    };
    getSearchData();
  }, [debouncedSearch, filter, reRender]);

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
          <Dropdown filter={filter} setFilter={setFilter} />
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
          >
            <CSVLink data={csvData} filename={"initiatives.csv"} className="export-button">
              Export to CSV
            </CSVLink>
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
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => {
                  if (index === 6) {
                    return (
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
              {initiatives.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow
                  hover
                  key={row.id}
                  onClick={() => {
                    router.push(`/${row.path}?data=${JSON.stringify(row)}`);
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
                        // console.log(row.id);
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
          count={initiatives.length}
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
