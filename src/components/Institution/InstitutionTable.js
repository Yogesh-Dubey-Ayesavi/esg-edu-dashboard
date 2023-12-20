"use client";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import GetAppIcon from "@mui/icons-material/GetApp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SyncIcon from "@mui/icons-material/Sync";
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

const InstitutionTable = ({ handleClickOpen }) => {
  const [institutes, setInstitutes] = useState([]);
  const [page, setPage] = useState(0);
  const [reRender, setReRender] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  // const [filter, setFilter] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const router = useRouter();

  const setFiles = (files) => {
    const { established_in } = files;
    setInstitutes({
      ...files,
      established_in: new Date(established_in).toLocaleDateString(),
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
              <TableRow
                hover
                onClick={() => {
                  // router.push(`/${row.path}?data=${JSON.stringify(row)}`);
                }}
                sx={{ cursor: "pointer" }}
              >
                <TableCell align="left">{institutes.name}</TableCell>
                <TableCell align="left">{institutes.city}</TableCell>
                <TableCell align="left">{institutes.email}</TableCell>
                <TableCell align="left">{institutes.phone_number}</TableCell>
                <TableCell align="left">{institutes.address}</TableCell>
                <TableCell align="left">{institutes.established_in}</TableCell>
                <TableCell align="left">{institutes.website}</TableCell>
                <TableCell align="left">{institutes.employee_size}</TableCell>
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
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={1}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </Box>
  );
};

export default InstitutionTable;
