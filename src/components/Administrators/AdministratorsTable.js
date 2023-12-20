"use client";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import GetAppIcon from "@mui/icons-material/GetApp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SyncIcon from "@mui/icons-material/Sync";
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const CSVLinkDynamic = dynamic(() => import("react-csv").then((mod) => mod.CSVLink), { ssr: false });

const columns = [
  { id: "name", label: "Name", align: "left" },
  { id: "role", label: "Role", align: "left" },
  { id: "created_at", label: "Created at", align: "left" },
  { id: "action", label: "", align: "right" },
];

import { useDebounce } from "@/hooks/useDebounce";
import ESG from "@/lib/esg-helper";
import dynamic from "next/dynamic";
import FileUploadIcon from "@mui/icons-material/FileUpload";
// import { Search } from "../Search";
// import Dropdown from "../dropDown";

const AdministratorsTable = ({ handleClickOpen }) => {
  const [admins, setAdmins] = useState([]);
  const [page, setPage] = useState(0);
  const [reRender, setReRender] = useState(false);
  const [search, setSearch] = useState("");
  // const debouncedSearch = useDebounce(search, 200);
  // const [filter, setFilter] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const router = useRouter();

  const setFiles = (files) => {
    setAdmins(
      files.map((item, index) => {
        return {
          id: index + 1,
          avatar_url: item.avatar_url,
          name: item.name,
          role: item.role,
          created_at: new Date(item.created_at).toLocaleDateString(),
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

  const csvData = admins.map((item) => ({
    Name: item.name,
    Role: item.role,
    created_at: item.created_at,
  }));

  //   useEffect(() => {
  //     const getSearchData = async () => {
  //       const files = await ESG.getMyInstitutionDetails();
  //       console.log(files);
  //       setFiles(files);
  //     };
  //     getSearchData();
  //   }, [debouncedSearch, reRender]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const admins = await ESG.getAdmins();
      //   console.log(admins);
      setFiles(admins);
    };
    fetchAdmins();
  }, [reRender]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", marginTop: "10px" }}>
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
            <CSVLinkDynamic data={csvData} filename={"admins.csv"} className="export-button" style={{ color: "black" }} >
              Export to CSV
            </CSVLinkDynamic>
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
              handleClickOpen();
            }}
          >
            New Users
          </Button>
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
                  if (index === 4) {
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
              {admins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow
                  hover
                  key={row.name}
                  onClick={() => {
                    // router.push(`/${row.path}?data=${JSON.stringify(row)}`);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.role}</TableCell>
                  <TableCell align="left">{row.created_at}</TableCell>
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
          count={admins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default AdministratorsTable;
