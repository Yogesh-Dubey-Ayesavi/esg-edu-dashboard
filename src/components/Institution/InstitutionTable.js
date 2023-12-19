"use client";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import GetAppIcon from "@mui/icons-material/GetApp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SyncIcon from "@mui/icons-material/Sync";
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const CSVLink = dynamic(() => import("react-csv").then((mod) => mod.CSVLink), { ssr: false });
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const columns = [
  { id: "name", label: "Name", align: "left" },
  { id: "city", label: "City", align: "left" },
  { id: "email", label: "Email", align: "left" },
  { id: "phone_number", label: "Phone No", align: "left" },
  { id: "address", label: "Address", align: "left" },
  { id: "established_in", label: "Date", align: "left" },
  { id: "website", label: "Website", align: "left" },
  { id: "employee_size", label: "Employees", align: "left" },
  { id: "action", label: "", align: "right" },
];

import { useDebounce } from "@/hooks/useDebounce";
import ESG from "@/lib/esg-helper";
import dynamic from "next/dynamic";
// import { Search } from "../Search";
// import Dropdown from "../dropDown";

const ESGTable = ({ handleClickOpen }) => {
  const [institutes, setInstitutes] = useState([]);
  const [page, setPage] = useState(0);
  const [reRender, setReRender] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  // const [filter, setFilter] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  const setFiles = (files) => {
    setInstitutes(
      files.map((item, index) => {
        return {
          id: index + 1,
          name: item.name,
          city: item.city,
          email: item.email,
          phone_number: item.phone_number,
          address: item.address,
          established_in: new Date(item.established_in).toLocaleDateString(),
          website: item.website,
          employee_size: item.employee_size,
        };
      })
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const csvData = institutes.map((item) => ({
    Name: item.name,
    City: item.city,
    Email: item.email,
    "Phone number": item.phone_number,
    Address: item.address,
    "Established in": new Date(item.established_in).toLocaleDateString(),
    Website: item.website,
    "Employee size": item.employee_size,
  }));

  useEffect(() => {
    const getSearchData = async () => {
      const files = await ESG.getMyInstitutionDetails();
      console.log(files);
      setFiles(files);
    };
    getSearchData();
  }, [debouncedSearch, reRender]);

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
          {/* <Search placeholder={"Search institute.."} search={search} setSearch={setSearch} /> */}
          {/* <Dropdown filter={filter} setFilter={setFilter} /> */}
        </Box>
        <Box style={{ marginTop: "20px" }}>
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
            <CSVLink data={csvData} filename={"institues.csv"} className="export-button">
              Export to CSV
            </CSVLink>
          </Button>
          {/* <Button
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
              handleClickOpen();
            }}
          >
            Add
          </Button> */}
        </Box>
      </Box>
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => {
                  if (index === 8) {
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
              {institutes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow
                  hover
                  key={row.name}
                  onClick={() => {
                    // router.push(`/${row.path}?data=${JSON.stringify(row)}`);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.city}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.phone_number}</TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">{row.established_in}</TableCell>
                  <TableCell align="left">{row.website}</TableCell>
                  <TableCell align="left">{row.employee_size}</TableCell>
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
          count={institutes.length}
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
