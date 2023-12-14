// "use client";

// import React, { useLayoutEffect, useState } from "react";
// import { EsgSDK } from "esg-sdk";
// import InitiativeCard, { AddInitiativeCard } from "../InitiativeCard";

// const ESG = EsgSDK.initialize();

// const GovernanceInitiative = ({}) => {
//   const [initiatives, setInitiatives] = useState([]);

//   useLayoutEffect(() => {
//     const getData = async () => {
//       const files = await ESG.fetchFiles("governance");
//       setInitiatives(files);
//     };
//     getData();
//   }, []);
//   return (
//     <>
//       <AddInitiativeCard dir='governance'/>
//       {initiatives.map((initiative) => (
//         <InitiativeCard
//           title={initiative.name}
//           key={initiative.sha}
//           dir="governance"
//         />
//       ))}
//     </>
//   );
// };

// export default GovernanceInitiative;

"use client";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { EsgSDK } from "esg-sdk";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const columns = [
  { id: "fileName", label: "File Names", minWidth: 250, align: "left" },
  { id: "action", label: "", minWidth: 250, align: "center" },
];

const ESG = EsgSDK.initialize();

const GovernanceInitiative = ({}) => {
  const [initiatives, setInitiatives] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const files = await ESG.fetchFiles("governance");
      console.log(files);
      setInitiatives(files.map((file, index) => ({ ...file, id: index + 1 })));
    };
    getData();
  }, []);

  const rows = initiatives.map((initiative) => ({
    id: initiative.id,
    fileName: _.startCase(initiative.name),
    path: initiative.path,
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          "@media (max-width: 600px)": {
            width: "90vw",
          },
          borderRadius: "10px",
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, fontWeight: "bold", fontSize: "16px" }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow
                  hover
                  key={row.path}
                  onClick={() => {
                    router.push(`/${row.path}`);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell align="left">{row.fileName}</TableCell>
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
    </>
  );
};

export default GovernanceInitiative;
