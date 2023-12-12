"use client";

import { Search } from "@/components/Search";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, IconButton, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = () => {
  const theme = useTheme();
  const isSmOrDown = useMediaQuery(theme.breakpoints.down("sm"));

  const columns = [
    { field: "id", headerName: "Id", width: isSmOrDown ? 100 : 250, sortable: false },
    { field: "name", headerName: "Name", width: isSmOrDown ? 150 : 250, sortable: false },
    { field: "createdAt", headerName: "Created At", width: isSmOrDown ? 150 : 250, sortable: false },
    {
      field: "action",
      headerName: "Actions",
      width: isSmOrDown ? 150 : 250,
      renderCell: (params) => (
        <IconButton
          aria-label="select"
          onClick={() => {
            console.log(params.row.id);
          }}
        >
          <MoreVertIcon />
        </IconButton>
      ),
      sortable: false,
    },
  ];

  const rows = [
    { id: 1, name: "John Doe", createdAt: "2022-01-01" },
    { id: 2, name: "Jane Smith", createdAt: "2022-02-01" },
    { id: 3, name: "Bob Johnson", createdAt: "2022-03-01" },
    { id: 4, name: "Alice Brown", createdAt: "2022-04-01" },
    { id: 5, name: "Charlie White", createdAt: "2022-05-01" },
    { id: 6, name: "Eva Black", createdAt: "2022-06-01" },
    { id: 7, name: "David Green", createdAt: "2022-07-01" },
    { id: 8, name: "Sophie Red", createdAt: "2022-08-01" },
    { id: 9, name: "Michael Blue", createdAt: "2022-09-01" },
  ];

  return (
    <div style={{ height: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            "@media (max-width:600px)": {
              fontSize: "0.5rem",
            },
          }}
        >
          Administrators
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddOutlinedIcon />}
          style={{
            backgroundColor: "#6366F1",
            padding: "8px 20px",
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: "600",
          }}
        >
          Add
        </Button>
      </Box>

      <Search />

      <Box
        sx={{
          height: 400,
          width: "100%",
          "@media (max-width: 600px)": {
            width: "90vw",
          },
          borderRadius: "10px",
        }}
      >
        <DataGrid
          rows={rows}
          columns={[...columns]}
          disableColumnMenu={true}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sortable={false}
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
              border: 0,
            },
            ".MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold !important",
            },
            ".PrivateSwitchBase-input": {
              borderRadius: "5px",
            },
            borderRadius: "10px",
          }}
        />
      </Box>
    </div>
  );
};

export default DataTable;
