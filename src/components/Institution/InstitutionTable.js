"use client";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SyncIcon from "@mui/icons-material/Sync";
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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

const InstitutionTable = () => {
  const [institutes, setInstitutes] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  const router = useRouter();

  useEffect(() => {
    const getSearchData = async () => {
      const { data, error } = await ESG.supabase.from("institutions").select();
      if (data.length === 0) {
        toast.error("No Institution found under this account.");
      }
      setInstitutes(data);
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
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        ></Box>
        <Box style={{ marginTop: "20px" }}>
          <button className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-full" onClick={router.push("/")}>
            Add
          </button>
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
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
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
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {institutes.map((i) => {
                return (
                  <TableRow
                    key={i.id}
                    hover
                    onClick={() => {
                      // router.push(/${row.path}?data=${JSON.stringify(row)});
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell align="left">{i.name}</TableCell>
                    <TableCell align="left">{i.city}</TableCell>
                    <TableCell align="left">{i.email}</TableCell>
                    <TableCell align="left">{i.phone_number}</TableCell>
                    <TableCell align="left">{i.address}</TableCell>
                    <TableCell align="left">{new Date(i.established_in).toLocaleDateString()}</TableCell>
                    <TableCell align="left">{i.website}</TableCell>
                    <TableCell align="left">{i.employee_size}</TableCell>
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
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default InstitutionTable;
