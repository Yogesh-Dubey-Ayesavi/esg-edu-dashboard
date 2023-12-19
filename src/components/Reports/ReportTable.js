"use client";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import GetAppIcon from "@mui/icons-material/GetApp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SyncIcon from "@mui/icons-material/Sync";
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const CSVLink = dynamic(() => import("react-csv").then((mod) => mod.CSVLink), { ssr: false });
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDebounce } from "@/hooks/useDebounce";
import ESG from "@/lib/esg-helper";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

const columns = [
  { id: "name", label: "Report Name", align: "left" },
  { id: "action", label: "", align: "right" },
];

const ReportTable = ({ handleClickOpen, selectedInstitution, reRender, setReRender, type }) => {
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  const setFiles = (files) => {
    setReports(
      files.map((item, index) => {
        return {
          id: index + 1,
          name: item.name,
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

  useEffect(() => {
    console.log(type);
    if (selectedInstitution) {
      const getData = async () => {
        try {
          const { data, error } = await ESG.supabase.from("reports").select().eq("institution_id", selectedInstitution);

          if (data && Array.isArray(data) && data.length > 0) {
            setFiles(data);
          } else {
            setReports([]);
          }
        } catch (e) {
          toast.error(e);
        }
      };
      getData();
    } else {
      setReports([]);
    }
  }, [debouncedSearch, reRender, selectedInstitution]);

  return reports.length != 0 ? (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
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
              {reports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow
                  hover
                  key={row.name}
                  onClick={() => {
                    // router.push(`/${row.path}?data=${JSON.stringify(row)}`);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell align="left">{row.name}</TableCell>
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
          count={reports.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  ) : (
    <Typography variant="h5" sx={{ marginTop: "3rem", fontWeight: "bold" }}>
      No reports found.
    </Typography>
  );
};

export default ReportTable;
